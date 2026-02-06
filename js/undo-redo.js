/**
 * BeatMaker - Undo/Redo System
 * Track pattern history and allow undo/redo operations
 * Dependencies: state.js (pattern, bpm, trackVolumes, trackMutes, trackSolos), grid-ui.js (updateGrid)
 */
'use strict';

// History state
const historyStack = [];
let historyIndex = -1;
const MAX_HISTORY = 50; // Limit history to prevent memory issues

// Initialize with current state
function initHistory() {
    saveToHistory();
}

// Deep clone the current state
function cloneState() {
    return {
        pattern: pattern.map(track => [...track]),
        bpm: bpm,
        trackVolumes: [...trackVolumes],
        trackMutes: [...trackMutes],
        trackSolos: [...trackSolos]
    };
}

// Save current state to history
function saveToHistory() {
    // Remove any states after current index (when user makes change after undo)
    if (historyIndex < historyStack.length - 1) {
        historyStack.splice(historyIndex + 1);
    }

    // Add current state
    historyStack.push(cloneState());

    // Limit history size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
    } else {
        historyIndex++;
    }

    updateUndoRedoButtons();

    // Mark project as modified
    if (typeof markProjectDirty === 'function') {
        markProjectDirty();
    }
}

// Restore state from history
function restoreState(state) {
    pattern = state.pattern.map(track => [...track]);
    bpm = state.bpm;
    trackVolumes = [...state.trackVolumes];
    trackMutes = [...state.trackMutes];
    trackSolos = [...state.trackSolos];

    // Update UI
    updateGrid();

    // Update BPM display
    const bpmSlider = document.getElementById('bpmSlider');
    const bpmValue = document.getElementById('bpmValue');
    if (bpmSlider && bpmValue) {
        bpmSlider.value = bpm;
        bpmValue.textContent = bpm;
        updateSliderBackground(bpmSlider, bpm, 60, 180);
    }

    // Update volume sliders
    trackVolumes.forEach((volume, track) => {
        const slider = document.querySelector(`.volume-slider[data-track="${track}"]`);
        if (slider) {
            slider.value = volume * 100;
        }
    });

    // Update mute/solo buttons
    trackMutes.forEach((muted, track) => {
        const btn = document.querySelector(`.mute-btn[data-track="${track}"]`);
        if (btn) {
            btn.classList.toggle('active', muted);
        }
    });

    trackSolos.forEach((soloed, track) => {
        const btn = document.querySelector(`.solo-btn[data-track="${track}"]`);
        if (btn) {
            btn.classList.toggle('active', soloed);
        }
    });
}

// Undo action
function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        restoreState(historyStack[historyIndex]);
        updateUndoRedoButtons();
    }
}

// Redo action
function redo() {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        restoreState(historyStack[historyIndex]);
        updateUndoRedoButtons();
    }
}

// Update undo/redo button states
function updateUndoRedoButtons() {
    const undoBtn = document.getElementById('undoBtn');
    const redoBtn = document.getElementById('redoBtn');

    if (undoBtn) {
        undoBtn.disabled = historyIndex <= 0;
    }

    if (redoBtn) {
        redoBtn.disabled = historyIndex >= historyStack.length - 1;
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Z or Cmd+Z for undo
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
    }

    // Ctrl+Shift+Z or Cmd+Shift+Z for redo (or Ctrl+Y)
    if (((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')) {
        e.preventDefault();
        redo();
    }
});
