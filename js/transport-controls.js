/**
 * BeatMaker - Transport Controls
 * User controls for playback and BPM
 * Dependencies: state.js (bpm, isPlaying, currentStep, audioContext),
 *               audio-engine.js (scheduler, initAudio),
 *               grid-ui.js (highlightStep)
 */
'use strict';

function setupControls() {
    const playBtn = document.getElementById('playBtn');
    const bpmSlider = document.getElementById('bpmSlider');
    const bpmValue = document.getElementById('bpmValue');

    playBtn.onclick = togglePlay;

    bpmSlider.oninput = (e) => {
        bpm = parseInt(e.target.value);
        bpmValue.textContent = bpm;
        updateSliderBackground(bpmSlider, bpm, 60, 180);
    };

    // Initialize slider background
    updateSliderBackground(bpmSlider, bpm, 60, 180);
}

function updateSliderBackground(slider, value, min, max) {
    const percentage = ((value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, #6c5ce7 0%, #6c5ce7 ${percentage}%, #444 ${percentage}%, #444 100%)`;
}

function togglePlay() {
    if (isPlaying) {
        stop();
    } else {
        play();
    }
}

function play() {
    if (!audioContext) {
        initAudio();
    }
    isPlaying = true;
    currentStep = 0;
    nextNoteTime = audioContext.currentTime;
    scheduler();
    document.getElementById('playBtn').textContent = '⏹ Stop';
    document.getElementById('playBtn').classList.add('playing');
}

function stop() {
    isPlaying = false;
    clearTimeout(timerID);
    currentStep = 0;
    highlightStep(-1);
    document.getElementById('playBtn').textContent = '▶ Play';
    document.getElementById('playBtn').classList.remove('playing');
}
