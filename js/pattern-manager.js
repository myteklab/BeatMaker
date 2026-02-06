/**
 * BeatMaker - Pattern Management
 * Pattern creation, clearing, and randomization
 * Dependencies: config.js (TRACKS, STEPS), state.js (pattern), grid-ui.js (updateGrid)
 */
'use strict';

function clearPattern() {
    if (confirm('Clear all beats?')) {
        pattern = Array(TRACKS).fill().map(() => Array(STEPS).fill(0));
        updateGrid();
        if (typeof saveToHistory === 'function') {
            saveToHistory();
        }
    }
}

function randomPattern() {
    for (let track = 0; track < TRACKS; track++) {
        for (let step = 0; step < STEPS; step++) {
            // Different probability for different drums
            let probability = 0.2;
            if (track === 0) probability = 0.3; // Kick more common
            if (track === 2) probability = 0.4; // Hi-hat more common
            pattern[track][step] = Math.random() < probability ? 1 : 0;
        }
    }
    updateGrid();
    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }
}
