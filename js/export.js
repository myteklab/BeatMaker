/**
 * BeatMaker - Export Module
 * Export beats to different formats (WAV, MP3) and save to MyTekOS files
 * Dependencies: state.js, config.js, drum-synthesizers.js
 */
'use strict';

// Modal state
let exportLoopCount = 2; // Default 2 loops
let isExporting = false; // Prevent concurrent exports

// Open export modal
function openExportModal() {
    const modal = document.getElementById('exportModal');
    const filenameInput = document.getElementById('exportFilename');

    // Set default filename
    filenameInput.value = `MyBeat_${Date.now()}`;

    // Show duration estimate
    updateDurationDisplay();

    // Show modal
    modal.style.display = 'flex';
}

// Close export modal
function closeExportModal() {
    const modal = document.getElementById('exportModal');
    modal.style.display = 'none';
}

// Set loop count and update active button
function setLoopCount(count) {
    exportLoopCount = count;

    // Update active button
    const buttons = document.querySelectorAll('.loop-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === `${count}x`) {
            btn.classList.add('active');
        }
    });

    // Update duration display
    updateDurationDisplay();
}

// Update duration display
function updateDurationDisplay() {
    const duration = calculateBeatDuration();
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const durationText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

    const durationDisplay = document.getElementById('durationDisplay');
    if (durationDisplay) {
        durationDisplay.textContent = `Duration: ${durationText}`;
    }
}

// Confirm and execute export
async function confirmExport() {
    // Prevent concurrent exports
    if (isExporting) {
        showToast('Export already in progress...', 'info');
        return;
    }

    // Set exporting flag IMMEDIATELY to prevent double-clicks
    isExporting = true;

    // Disable the export button immediately
    const exportButtons = document.querySelectorAll('.modal-footer .btn');
    exportButtons.forEach(btn => btn.disabled = true);

    const filename = document.getElementById('exportFilename').value.trim();
    const format = document.getElementById('exportFormat').value;

    if (!filename) {
        showToast('Please enter a filename', 'error');
        // Re-enable if validation fails
        isExporting = false;
        exportButtons.forEach(btn => btn.disabled = false);
        return;
    }

    // Close modal
    closeExportModal();

    // Show rendering message
    showToast('Rendering audio...', 'info');

    try {
        const duration = calculateBeatDuration();
        const audioBlob = await renderBeatToAudio(duration, format);
        await saveBeatToMyTekOS(audioBlob, format, filename);
    } catch (error) {
        console.error('Export error:', error);
        showToast('Export failed', 'error');
    } finally {
        // Reset flag and re-enable buttons
        isExporting = false;
        exportButtons.forEach(btn => btn.disabled = false);
    }
}

// Entry point - opens modal instead of direct export
function exportBeat() {
    openExportModal();
}

// Calculate total duration of the beat in seconds
function calculateBeatDuration() {
    const secondsPerBeat = 60.0 / bpm;
    const totalBeats = STEPS * exportLoopCount; // Use selected loop count
    return totalBeats * 0.25 * secondsPerBeat; // 16th notes
}

// Render beat to audio using OfflineAudioContext
async function renderBeatToAudio(duration, format = 'wav') {
    const sampleRate = 44100;
    const offlineContext = new OfflineAudioContext(2, sampleRate * duration, sampleRate);

    const secondsPerBeat = 60.0 / bpm;
    const stepDuration = 0.25 * secondsPerBeat; // 16th notes

    let currentTime = 0;
    const loops = exportLoopCount; // Use selected loop count

    for (let loop = 0; loop < loops; loop++) {
        for (let step = 0; step < STEPS; step++) {
            // Check if any track is soloed
            const hasSolo = trackSolos.some(solo => solo);

            for (let track = 0; track < TRACKS; track++) {
                if (pattern[track][step]) {
                    // Skip if muted
                    if (trackMutes[track]) continue;

                    // Skip if another track is soloed and this isn't
                    if (hasSolo && !trackSolos[track]) continue;

                    const volume = trackVolumes[track];
                    playDrumOffline(offlineContext, track, currentTime, volume);
                }
            }

            currentTime += stepDuration;
        }
    }

    const renderedBuffer = await offlineContext.startRendering();

    // For OGG, use MediaRecorder API instead of WAV conversion
    if (format === 'ogg') {
        return await audioBufferToOgg(renderedBuffer);
    }

    return audioBufferToWav(renderedBuffer);
}

// Play drum sound in offline context
function playDrumOffline(context, track, time, volume = 1.0) {
    switch(track) {
        case 0: playKickOffline(context, time, volume); break;
        case 1: playSnareOffline(context, time, volume); break;
        case 2: playHiHatOffline(context, time, 0.05, volume); break;
        case 3: playHiHatOffline(context, time, 0.15, volume); break;
        case 4: playClapOffline(context, time, volume); break;
        case 5: playTomOffline(context, time, volume); break;
        case 6: playRimOffline(context, time, volume); break;
        case 7: playCrashOffline(context, time, volume); break;
    }
}

// Offline versions of drum synthesizers (same as originals but use passed context)
function playKickOffline(context, time, volume = 1.0) {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);

    gain.gain.setValueAtTime(1 * volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    osc.connect(gain);
    gain.connect(context.destination);

    osc.start(time);
    osc.stop(time + 0.5);
}

function playSnareOffline(context, time, volume = 1.0) {
    const noise = context.createBufferSource();
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.2, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    noise.buffer = noiseBuffer;

    const noiseFilter = context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(1 * volume, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(context.destination);

    noise.start(time);
}

function playHiHatOffline(context, time, duration, volume = 1.0) {
    const noise = context.createBufferSource();
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.1, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    noise.buffer = noiseBuffer;

    const filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 7000;

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.3 * volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    noise.start(time);
}

function playClapOffline(context, time, volume = 1.0) {
    for (let i = 0; i < 3; i++) {
        const noise = context.createBufferSource();
        const noiseBuffer = context.createBuffer(1, context.sampleRate * 0.05, context.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let j = 0; j < noiseBuffer.length; j++) {
            output[j] = Math.random() * 2 - 1;
        }
        noise.buffer = noiseBuffer;

        const filter = context.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1500;

        const gain = context.createGain();
        gain.gain.setValueAtTime(0.5 * volume, time + i * 0.01);
        gain.gain.exponentialRampToValueAtTime(0.01, time + i * 0.01 + 0.05);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(context.destination);

        noise.start(time + i * 0.01);
    }
}

function playTomOffline(context, time, volume = 1.0) {
    const osc = context.createOscillator();
    const gain = context.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.3);

    gain.gain.setValueAtTime(0.7 * volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.3);

    osc.connect(gain);
    gain.connect(context.destination);

    osc.start(time);
    osc.stop(time + 0.3);
}

function playRimOffline(context, time, volume = 1.0) {
    const osc1 = context.createOscillator();
    const osc2 = context.createOscillator();
    const gain = context.createGain();

    osc1.type = 'square';
    osc1.frequency.value = 800;

    osc2.type = 'square';
    osc2.frequency.value = 540;

    gain.gain.setValueAtTime(0.3 * volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 0.03);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(context.destination);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.03);
    osc2.stop(time + 0.03);
}

function playCrashOffline(context, time, volume = 1.0) {
    const noise = context.createBufferSource();
    const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    noise.buffer = noiseBuffer;

    const filter = context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 5000;

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.5 * volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + 2);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(context.destination);

    noise.start(time);
}

// Convert AudioBuffer to WAV blob
function audioBufferToWav(buffer) {
    const length = buffer.length * buffer.numberOfChannels * 2;
    const arrayBuffer = new ArrayBuffer(44 + length);
    const view = new DataView(arrayBuffer);
    const channels = [];
    let offset = 0;
    let pos = 0;

    // Write WAV header
    const setUint16 = (data) => {
        view.setUint16(pos, data, true);
        pos += 2;
    };
    const setUint32 = (data) => {
        view.setUint32(pos, data, true);
        pos += 4;
    };

    // "RIFF" chunk descriptor
    setUint32(0x46464952); // "RIFF"
    setUint32(36 + length); // file length - 8
    setUint32(0x45564157); // "WAVE"

    // "fmt " sub-chunk
    setUint32(0x20746d66); // "fmt "
    setUint32(16); // sub-chunk size
    setUint16(1); // PCM
    setUint16(buffer.numberOfChannels);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * buffer.numberOfChannels * 2); // byte rate
    setUint16(buffer.numberOfChannels * 2); // block align
    setUint16(16); // bits per sample

    // "data" sub-chunk
    setUint32(0x61746164); // "data"
    setUint32(length);

    // Write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++) {
        channels.push(buffer.getChannelData(i));
    }

    while (pos < arrayBuffer.byteLength) {
        for (let i = 0; i < buffer.numberOfChannels; i++) {
            let sample = Math.max(-1, Math.min(1, channels[i][offset]));
            sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
            view.setInt16(pos, sample, true);
            pos += 2;
        }
        offset++;
    }

    return new Blob([arrayBuffer], { type: 'audio/wav' });
}

// Convert AudioBuffer to OGG blob using MediaRecorder API
async function audioBufferToOgg(audioBuffer) {
    return new Promise((resolve, reject) => {
        // Create a new AudioContext for playback
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;

        // Create MediaStreamDestination to capture the audio
        const dest = audioContext.createMediaStreamDestination();
        source.connect(dest);

        // Check if OGG is supported, fallback to webm opus
        let mimeType = 'audio/ogg; codecs=opus';
        if (!MediaRecorder.isTypeSupported(mimeType)) {
            mimeType = 'audio/webm; codecs=opus';
        }

        const mediaRecorder = new MediaRecorder(dest.stream, { mimeType: mimeType });
        const chunks = [];

        mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                chunks.push(e.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            audioContext.close();
            resolve(blob);
        };

        mediaRecorder.onerror = (error) => {
            audioContext.close();
            reject(error);
        };

        // Start recording
        mediaRecorder.start();
        source.start(0);

        // Stop recording after buffer duration
        setTimeout(() => {
            mediaRecorder.stop();
            source.stop();
        }, audioBuffer.duration * 1000 + 100); // Add 100ms buffer
    });
}

// Convert WAV blob to MP3 blob using lamejs
function wavToMp3(wavBlob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function() {
            try {
                const wav = lamejs.WavHeader.readHeader(new DataView(reader.result));
                const samples = new Int16Array(reader.result, wav.dataOffset, wav.dataLen / 2);

                const mp3encoder = new lamejs.Mp3Encoder(wav.channels, wav.sampleRate, 128);
                const mp3Data = [];

                const sampleBlockSize = 1152;

                if (wav.channels === 1) {
                    // Mono
                    for (let i = 0; i < samples.length; i += sampleBlockSize) {
                        const sampleChunk = samples.subarray(i, i + sampleBlockSize);
                        const mp3buf = mp3encoder.encodeBuffer(sampleChunk);
                        if (mp3buf.length > 0) {
                            mp3Data.push(mp3buf);
                        }
                    }
                } else {
                    // Stereo - separate left and right channels
                    const left = [];
                    const right = [];
                    for (let i = 0; i < samples.length; i += 2) {
                        left.push(samples[i]);
                        right.push(samples[i + 1]);
                    }

                    const leftSamples = new Int16Array(left);
                    const rightSamples = new Int16Array(right);

                    for (let i = 0; i < leftSamples.length; i += sampleBlockSize) {
                        const leftChunk = leftSamples.subarray(i, i + sampleBlockSize);
                        const rightChunk = rightSamples.subarray(i, i + sampleBlockSize);
                        const mp3buf = mp3encoder.encodeBuffer(leftChunk, rightChunk);
                        if (mp3buf.length > 0) {
                            mp3Data.push(mp3buf);
                        }
                    }
                }

                const mp3buf = mp3encoder.flush();
                if (mp3buf.length > 0) {
                    mp3Data.push(mp3buf);
                }

                const mp3Blob = new Blob(mp3Data, { type: 'audio/mp3' });
                resolve(mp3Blob);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = () => reject(new Error('Failed to read WAV file'));
        reader.readAsArrayBuffer(wavBlob);
    });
}

// Download beat audio as a file via browser
async function saveBeatToMyTekOS(audioBlob, format, filename) {
    // Remove extension from filename if present
    let baseName = filename.replace(/\.(wav|mp3|ogg)$/i, '');
    let finalBlob = audioBlob;

    try {
        // Handle format conversion (only MP3 needs conversion, OGG is already rendered)
        if (format === 'mp3') {
            showToast('Converting to MP3...', 'info');
            finalBlob = await wavToMp3(audioBlob);
        }

        // Trigger browser download
        const url = URL.createObjectURL(finalBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = baseName + '.' + format;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast(`Beat exported as ${format.toUpperCase()}!`, 'success');
    } catch (error) {
        console.error('Export error:', error);
        showToast('Export failed: ' + error.message, 'error');
    }
}
