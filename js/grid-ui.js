/**
 * BeatMaker - Grid & UI Management
 * Grid creation, cell manipulation, and visual updates
 * Dependencies: config.js (STEPS, TRACKS, TRACK_NAMES), state.js (pattern)
 */
'use strict';

function createStepNumbers() {
    const container = document.getElementById('stepNumbers');
    for (let i = 0; i < STEPS; i++) {
        const num = document.createElement('div');
        num.className = 'step-number' + (i % 4 === 0 ? ' measure-start' : '');
        num.textContent = i + 1;
        num.style.cursor = 'pointer';
        num.title = 'Click to jump to this step';
        num.onclick = () => jumpToStep(i);
        container.appendChild(num);
    }
}

function createGrid() {
    const wrapper = document.getElementById('gridWrapper');
    if (!wrapper) return;

    wrapper.innerHTML = '';

    // Create main grid area
    const gridMain = document.createElement('div');
    gridMain.className = 'grid-main';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';

    // Create controls column
    const controlsColumn = document.createElement('div');
    controlsColumn.className = 'controls-column';

    for (let track = 0; track < TRACKS; track++) {
        // Create grid row
        const row = document.createElement('div');
        row.className = 'grid-row';

        const label = document.createElement('div');
        label.className = 'track-label';
        label.textContent = TRACK_NAMES[track];
        row.appendChild(label);

        const cellsContainer = document.createElement('div');
        cellsContainer.className = 'track-cells';

        for (let step = 0; step < STEPS; step++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.track = track;
            cell.dataset.step = step;
            cell.onclick = () => toggleCell(track, step);
            cellsContainer.appendChild(cell);
        }

        row.appendChild(cellsContainer);
        gridContainer.appendChild(row);

        // Create track controls (separate column)
        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'track-controls';

        // Mute button
        const muteBtn = document.createElement('button');
        muteBtn.className = 'track-btn mute-btn';
        muteBtn.textContent = 'M';
        muteBtn.title = 'Mute';
        muteBtn.dataset.track = track;
        muteBtn.onclick = () => toggleMute(track);
        controlsContainer.appendChild(muteBtn);

        // Solo button
        const soloBtn = document.createElement('button');
        soloBtn.className = 'track-btn solo-btn';
        soloBtn.textContent = 'S';
        soloBtn.title = 'Solo';
        soloBtn.dataset.track = track;
        soloBtn.onclick = () => toggleSolo(track);
        controlsContainer.appendChild(soloBtn);

        // Volume slider
        const volumeSlider = document.createElement('input');
        volumeSlider.type = 'range';
        volumeSlider.className = 'volume-slider';
        volumeSlider.min = '0';
        volumeSlider.max = '100';
        volumeSlider.value = '100';
        volumeSlider.title = 'Volume';
        volumeSlider.dataset.track = track;
        volumeSlider.oninput = (e) => updateVolume(track, e.target.value / 100);
        controlsContainer.appendChild(volumeSlider);

        controlsColumn.appendChild(controlsContainer);
    }

    gridMain.appendChild(gridContainer);
    wrapper.appendChild(gridMain);
    wrapper.appendChild(controlsColumn);
}

function toggleMute(track) {
    trackMutes[track] = trackMutes[track] ? 0 : 1;
    const btn = document.querySelector(`.mute-btn[data-track="${track}"]`);
    if (btn) {
        btn.classList.toggle('active', trackMutes[track]);
    }
    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }
}

function toggleSolo(track) {
    trackSolos[track] = trackSolos[track] ? 0 : 1;
    const btn = document.querySelector(`.solo-btn[data-track="${track}"]`);
    if (btn) {
        btn.classList.toggle('active', trackSolos[track]);
    }
    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }
}

function updateVolume(track, volume) {
    trackVolumes[track] = volume;
    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }
}

function toggleCell(track, step) {
    pattern[track][step] = pattern[track][step] ? 0 : 1;
    updateGrid();

    // Preview the sound when turning a beat ON
    if (pattern[track][step]) {
        if (!audioContext) {
            initAudio();
        }
        playDrum(track, audioContext.currentTime, trackVolumes[track]);
    }

    if (typeof saveToHistory === 'function') {
        saveToHistory();
    }
}

function jumpToStep(step) {
    if (!audioContext) {
        initAudio();
    }

    if (isPlaying) {
        // If playing, jump to that step
        currentStep = step;
        nextNoteTime = audioContext.currentTime;
        highlightStep(step);
    } else {
        // If not playing, preview that column by playing all active beats
        highlightStep(step);

        // Check if any track is soloed
        const hasSolo = trackSolos.some(solo => solo);

        // Play all active beats in this column
        for (let track = 0; track < TRACKS; track++) {
            if (pattern[track][step]) {
                // Skip if muted
                if (trackMutes[track]) continue;

                // Skip if another track is soloed and this isn't
                if (hasSolo && !trackSolos[track]) continue;

                playDrum(track, audioContext.currentTime, trackVolumes[track]);
            }
        }

        // Clear highlight after a short delay
        setTimeout(() => {
            if (!isPlaying) {
                highlightStep(-1);
            }
        }, 200);
    }
}

function updateGrid() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        const track = parseInt(cell.dataset.track);
        const step = parseInt(cell.dataset.step);
        cell.classList.toggle('active', pattern[track][step]);
    });
}

function highlightStep(step) {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('current-step');
        const cellStep = parseInt(cell.dataset.step);
        if (cellStep === step) {
            cell.classList.add('current-step');
        }
    });
}
