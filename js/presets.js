/**
 * BeatMaker - Preset Patterns
 * Pre-built beat patterns for different music genres
 * Dependencies: state.js (pattern), grid-ui.js (updateGrid)
 */
'use strict';

const PRESETS = {
    'Basic Rock': {
        bpm: 120,
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0], // Kick - Four on the floor
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare - 2 and 4
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], // Hi-Hat - 8th notes
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Open Hat
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Clap
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Rim
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Hip-Hop': {
        bpm: 95,
        pattern: [
            [1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], // Kick - Hip-hop pattern
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare - Backbeat
            [1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1], // Hi-Hat - Complex pattern
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Open Hat
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0], // Clap - Extra accent
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], // Rim - Percussion
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'House': {
        bpm: 128,
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0], // Kick - Four on floor
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], // Hi-Hat - Closed
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], // Open Hat - Off-beat
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Clap - With snare
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Rim
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Drum & Bass': {
        bpm: 174,
        pattern: [
            [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0], // Kick - D&B pattern
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare - Syncopated
            [1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1], // Hi-Hat - Fast
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Open Hat
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Clap
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0], // Rim - Percussion
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Jazz Swing': {
        bpm: 140,
        pattern: [
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], // Kick - Sparse
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare
            [1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,0], // Hi-Hat - Swing pattern
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1], // Open Hat - Accents
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Clap
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0], // Rim - Jazz rim clicks
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Disco': {
        bpm: 118,
        pattern: [
            [1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0], // Kick - Four on floor
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // Hi-Hat - 16th notes
            [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1], // Open Hat - Accents
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Clap - With snare
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Rim
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Trap': {
        bpm: 140,
        pattern: [
            [1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0], // Kick - Trap pattern
            [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // Snare
            [1,0,1,1,0,1,1,0,1,0,1,1,0,1,1,0], // Hi-Hat - Trap hi-hats
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Open Hat
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1], // Clap - Accent
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0], // Rim - Percussion
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    },
    'Reggae': {
        bpm: 80,
        pattern: [
            [1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], // Kick - One drop
            [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0], // Snare - On the 3
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Hi-Hat
            [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1], // Open Hat - Skank pattern
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Clap
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // Tom
            [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0], // Rim - Cross-stick
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]  // Crash
        ]
    }
};

function loadPreset(presetName) {
    if (!PRESETS[presetName]) {
        showToast('Preset not found', 'error');
        return;
    }

    const preset = PRESETS[presetName];

    // Load pattern
    pattern = preset.pattern.map(track => [...track]);

    // Update grid
    updateGrid();

    // Load BPM
    if (preset.bpm) {
        bpm = preset.bpm;
        const bpmSlider = document.getElementById('bpmSlider');
        const bpmValue = document.getElementById('bpmValue');
        if (bpmSlider && bpmValue) {
            bpmSlider.value = bpm;
            bpmValue.textContent = bpm;
            updateSliderBackground(bpmSlider, bpm, 60, 180);
        }
    }

    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }

    showToast(`Loaded: ${presetName}`);
}

function getPresetNames() {
    return Object.keys(PRESETS);
}
