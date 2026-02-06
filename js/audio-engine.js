/**
 * BeatMaker - Audio Engine
 * Web Audio API initialization, scheduler, and timing
 * Dependencies: config.js (STEPS, TRACKS), state.js (audioContext, nextNoteTime, etc.),
 *               grid-ui.js (highlightStep), drum-synthesizers.js (all drum functions)
 */
'use strict';

// Audio Engine with Web Audio API
function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function scheduler() {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleNote(currentStep, nextNoteTime);
        nextNote();
    }
    if (isPlaying) {
        timerID = setTimeout(scheduler, 25);
    }
}

function nextNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += 0.25 * secondsPerBeat; // 16th notes
    currentStep++;
    if (currentStep >= STEPS) {
        currentStep = 0;
    }
}

function scheduleNote(step, time) {
    // Update visual on the main thread
    setTimeout(() => {
        if (isPlaying) {
            highlightStep(step);
        }
    }, (time - audioContext.currentTime) * 1000);

    // Check if any track is soloed
    const hasSolo = trackSolos.some(solo => solo);

    // Play sounds for active cells
    for (let track = 0; track < TRACKS; track++) {
        if (pattern[track][step]) {
            // Skip if muted
            if (trackMutes[track]) continue;

            // Skip if another track is soloed and this isn't
            if (hasSolo && !trackSolos[track]) continue;

            playDrum(track, time, trackVolumes[track]);
        }
    }
}

function playDrum(track, time, volume = 1.0) {
    switch(track) {
        case 0: playKick(time, volume); break;
        case 1: playSnare(time, volume); break;
        case 2: playHiHat(time, 0.05, volume); break;
        case 3: playHiHat(time, 0.15, volume); break;
        case 4: playClap(time, volume); break;
        case 5: playTom(time, volume); break;
        case 6: playRim(time, volume); break;
        case 7: playCrash(time, volume); break;
    }
}
