/**
 * BeatMaker - Main Application Entry Point
 * Application initialization orchestration
 * Dependencies: grid-ui.js (createGrid, createStepNumbers),
 *               transport-controls.js (setupControls),
 *               audio-engine.js (initAudio),
 *               undo-redo.js (initHistory)
 */
'use strict';

// Initialize
document.addEventListener('DOMContentLoaded', init);

function init() {
    createGrid();
    createStepNumbers();
    setupControls();
    initAudio();
    initHistory();
}
