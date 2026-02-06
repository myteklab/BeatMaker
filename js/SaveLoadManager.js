/**
 * BeatMaker - Serialization Module
 * Provides serializeProjectData and loadProjectData for platform integration
 * Dependencies: state.js, config.js, grid-ui.js
 */
'use strict';

/**
 * Serialize current beat data to JSON
 * Converts all booleans to 0/1 for compact file size
 */
window.serializeProjectData = function() {
    // Normalize pattern: convert boolean values to 0/1
    const normalizedPattern = pattern.map(track =>
        track.map(beat => beat ? 1 : 0)
    );

    // Normalize trackMutes: convert boolean to 0/1
    const normalizedMutes = trackMutes.map(mute => mute ? 1 : 0);

    // Normalize trackSolos: convert boolean to 0/1
    const normalizedSolos = trackSolos.map(solo => solo ? 1 : 0);

    return {
        version: '1.0',
        bpm: bpm,
        pattern: normalizedPattern,
        trackVolumes: trackVolumes,
        trackMutes: normalizedMutes,
        trackSolos: normalizedSolos
    };
};

/**
 * Load beat data from JSON
 * Normalizes boolean values to 0/1 for consistency
 */
window.loadProjectData = function(beatData) {
    if (!beatData) return;

    // Load BPM
    if (beatData.bpm) {
        bpm = beatData.bpm;
        const bpmSlider = document.getElementById('bpmSlider');
        const bpmValue = document.getElementById('bpmValue');
        if (bpmSlider && bpmValue) {
            bpmSlider.value = bpm;
            bpmValue.textContent = bpm;
            if (typeof updateSliderBackground === 'function') {
                updateSliderBackground(bpmSlider, bpm, 60, 180);
            }
        }
    }

    // Load pattern - normalize to 0/1
    if (beatData.pattern && Array.isArray(beatData.pattern)) {
        pattern = beatData.pattern.map(track =>
            track.map(beat => beat ? 1 : 0)
        );
    }

    // Load track volumes
    if (beatData.trackVolumes && Array.isArray(beatData.trackVolumes)) {
        trackVolumes = [...beatData.trackVolumes];
        // Update volume sliders if they exist
        beatData.trackVolumes.forEach((volume, i) => {
            const slider = document.querySelector(`#gridWrapper .volume-slider[data-track="${i}"]`);
            if (slider) {
                slider.value = volume * 100;
                if (typeof updateSliderBackground === 'function') {
                    updateSliderBackground(slider, volume * 100, 0, 100);
                }
            }
        });
    }

    // Load track mutes - normalize to 0/1
    if (beatData.trackMutes && Array.isArray(beatData.trackMutes)) {
        trackMutes = beatData.trackMutes.map(mute => mute ? 1 : 0);
    }

    // Load track solos - normalize to 0/1
    if (beatData.trackSolos && Array.isArray(beatData.trackSolos)) {
        trackSolos = beatData.trackSolos.map(solo => solo ? 1 : 0);
    }

    // Update grid to reflect loaded data
    if (typeof updateGrid === 'function') {
        updateGrid();
    }
};
