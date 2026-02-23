// BeatMaker Help Modal
(function() {
    'use strict';

    var helpContent = {
        start: `
            <h3>What is BeatMaker?</h3>
            <p>BeatMaker is a 16-step drum sequencer. Each row represents a different drum sound, and each column is a step in the pattern. When you press Play, it loops through all 16 steps from left to right, playing any sounds you have activated.</p>

            <h3>Quick Start (5 Steps)</h3>
            <ol>
                <li><strong>Add a kick drum</strong> &ndash; Click steps 1, 5, 9, and 13 on the Kick row. These are the four downbeats and give your beat a steady pulse.</li>
                <li><strong>Add a snare</strong> &ndash; Click steps 5 and 13 on the Snare row. Snare on beats 2 and 4 is the backbone of most drum patterns.</li>
                <li><strong>Add hi-hats</strong> &ndash; Click every other step on the Hi-Hat row (1, 3, 5, 7, 9, 11, 13, 15) for eighth-note hats, or fill in all 16 for sixteenth notes.</li>
                <li><strong>Press Play</strong> &ndash; Hit the Play button (or press Space) to hear your beat loop.</li>
                <li><strong>Adjust the tempo</strong> &ndash; Drag the BPM slider to speed up or slow down. Try 80-90 for hip-hop, 120-130 for house, 140-170 for drum &amp; bass.</li>
            </ol>

            <div class="help-tip">
                <strong>Tip:</strong> Load a preset from the dropdown, then study what is activated. Modifying existing patterns is a great way to learn.
            </div>
        `,

        sounds: `
            <p>BeatMaker has 8 drum sounds. Each has its own row and color on the grid.</p>

            <div class="help-drum-card" style="border-left-color: var(--track-0);">
                <strong>Kick</strong>
                <p>The deep, low thump that anchors your beat. Place it on downbeats (1, 5, 9, 13) for a solid foundation, or add extra hits for energy.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-1);">
                <strong>Snare</strong>
                <p>The sharp crack that drives the rhythm forward. The classic placement is beats 2 and 4 (steps 5 and 13). Moving it off the beat creates syncopation.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-2);">
                <strong>Hi-Hat (Closed)</strong>
                <p>A tight, short metallic tick that keeps time. Fill in every step for sixteenth notes, every other step for eighth notes, or every 4th step for quarter notes.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-3);">
                <strong>Open Hat</strong>
                <p>A longer, washy cymbal sound. Use it sparingly for accents, typically between closed hi-hat hits. Too many open hats can muddy your beat.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-4);">
                <strong>Clap</strong>
                <p>A layering sound that adds width. Try stacking it with the snare on beats 2 and 4, or use it alone for a different texture.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-5);">
                <strong>Tom</strong>
                <p>A melodic, pitched drum. Great for fills and transitions. Place a few toms at the end of your pattern to create a fill that leads back to beat 1.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-6);">
                <strong>Rim</strong>
                <p>A short, woody click sound. Works well as a subtle accent or as an alternative to the snare for lighter sections. Try placing it on off-beats.</p>
            </div>

            <div class="help-drum-card" style="border-left-color: var(--track-7);">
                <strong>Crash</strong>
                <p>A big, splashy cymbal hit. Use it on step 1 to mark the start of a phrase, or save it for transitions. Less is more with crash cymbals.</p>
            </div>
        `,

        beats: `
            <h3>Less Is More</h3>
            <p>The best beats leave space. A pattern where every cell is lit sounds like noise, not music. Start simple and only add hits where they serve the groove.</p>

            <h3>Build in Layers</h3>
            <ol>
                <li><strong>Kick first</strong> &ndash; Lay down the foundation. Get the low end right before adding anything else.</li>
                <li><strong>Snare second</strong> &ndash; Add the backbeat. This gives your beat its main feel.</li>
                <li><strong>Hi-hats third</strong> &ndash; Fill in the rhythm. Hats define the energy level and groove.</li>
                <li><strong>Accents last</strong> &ndash; Sprinkle in claps, toms, rims, and crashes to add flavor. These are seasoning, not the main dish.</li>
            </ol>

            <h3>Understanding the Grid</h3>
            <p>The 16 steps represent one bar of music divided into 16th notes. Every group of 4 steps equals one beat:</p>
            <ul>
                <li><strong>Steps 1-4:</strong> Beat 1</li>
                <li><strong>Steps 5-8:</strong> Beat 2</li>
                <li><strong>Steps 9-12:</strong> Beat 3</li>
                <li><strong>Steps 13-16:</strong> Beat 4</li>
            </ul>
            <p>Steps 1, 5, 9, 13 are <strong>downbeats</strong> (strong). Steps in between are <strong>off-beats</strong> (weaker). Placing sounds on off-beats creates syncopation and swing.</p>

            <h3>What Makes a Beat Groove</h3>
            <ul>
                <li><strong>Syncopation</strong> &ndash; Placing hits where the listener does not expect them. Try a kick on step 4 or 11 instead of only on the downbeats.</li>
                <li><strong>Contrast</strong> &ndash; Mix busy sections with sparse ones. If your hi-hats are busy, keep the kick simple.</li>
                <li><strong>Space</strong> &ndash; The gaps between hits are just as important as the hits themselves. Silence creates tension and makes the next hit feel stronger.</li>
            </ul>

            <div class="help-tip">
                <strong>Tip:</strong> Mute and unmute tracks while the beat plays to hear how each layer contributes. This helps you decide what to keep and what to remove.
            </div>
        `,

        genres: `
            <p>Here are starting points for popular genres. Load a preset to hear these patterns, then customize them to make them your own.</p>

            <div class="help-genre-card">
                <h4>Rock</h4>
                <div class="help-genre-meta">BPM: 100-140</div>
                <p>Steady kick on 1 and 3, snare on 2 and 4, hi-hats on every eighth note. Straightforward and driving. Add a crash on beat 1 for emphasis.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 1, 9 / Snare on 5, 13 / Hi-hat on all odd steps</div>
            </div>

            <div class="help-genre-card">
                <h4>Hip-Hop</h4>
                <div class="help-genre-meta">BPM: 75-95</div>
                <p>Slower tempo with a heavy kick and snappy snare. The kick often lands on off-beats for a laid-back feel. Hi-hats can alternate between closed and open.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 1, 4, 9, 11 / Snare on 5, 13 / Hi-hat on every step</div>
            </div>

            <div class="help-genre-card">
                <h4>House</h4>
                <div class="help-genre-meta">BPM: 120-130</div>
                <p>Four-on-the-floor kick pattern (every downbeat). Off-beat open hats are the signature sound. Claps replace the snare on 2 and 4.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 1, 5, 9, 13 / Clap on 5, 13 / Open hat on 3, 7, 11, 15</div>
            </div>

            <div class="help-genre-card">
                <h4>Drum &amp; Bass</h4>
                <div class="help-genre-meta">BPM: 160-180</div>
                <p>Fast tempo with breakbeat-style kick and snare patterns. The kick is syncopated and unpredictable. Hi-hats are often rapid-fire sixteenth notes.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 1, 4, 11 / Snare on 5, 13 / Hi-hat on every step</div>
            </div>

            <div class="help-genre-card">
                <h4>Trap</h4>
                <div class="help-genre-meta">BPM: 130-170 (half-time feel)</div>
                <p>Sparse, hard-hitting kick with snare on beat 3 (step 9). Hi-hats go from slow to rapid rolls. Lots of open space in the pattern.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 1, 1, 11 / Snare on 9 / Hi-hat rolls: slow then fast</div>
            </div>

            <div class="help-genre-card">
                <h4>Reggae</h4>
                <div class="help-genre-meta">BPM: 70-90</div>
                <p>Relaxed, off-beat feel. The "one drop" puts the kick and snare together on beat 3. Rim clicks on the off-beats give it that classic skank rhythm.</p>
                <div class="help-genre-recipe"><strong>Quick recipe:</strong> Kick on 9 / Snare on 9 / Rim on 3, 7, 11, 15 / Hi-hat on all odd steps</div>
            </div>
        `,

        controls: `
            <h3>Playback</h3>
            <ul>
                <li><strong>Play / Stop</strong> &ndash; Start or stop the beat. Keyboard shortcut: <kbd>Space</kbd></li>
                <li><strong>BPM Slider</strong> &ndash; Adjust tempo from 60 to 180 beats per minute.</li>
                <li><strong>Step Numbers</strong> &ndash; Click any step number (1-16) to jump playback to that position.</li>
            </ul>

            <h3>Grid</h3>
            <ul>
                <li><strong>Click a cell</strong> &ndash; Toggle that step on/off. Also previews the drum sound.</li>
                <li><strong>Colored cells</strong> &ndash; Each row has its own color so you can see the pattern at a glance.</li>
                <li><strong>Beat markers</strong> &ndash; Extra spacing every 4 steps helps you see the beat divisions.</li>
            </ul>

            <h3>Track Controls</h3>
            <ul>
                <li><strong>M (Mute)</strong> &ndash; Silence a track without deleting its pattern. Click again to unmute.</li>
                <li><strong>S (Solo)</strong> &ndash; Listen to only that track. Click again to unsolo. You can solo multiple tracks.</li>
                <li><strong>Volume Slider</strong> &ndash; Adjust the volume of each individual track.</li>
            </ul>

            <h3>Actions</h3>
            <ul>
                <li><strong>Preset</strong> &ndash; Load a pre-made beat pattern. Great for learning or starting a new idea.</li>
                <li><strong>Export Audio</strong> &ndash; Save your beat as a WAV, MP3, or OGG file.</li>
                <li><strong>Clear All</strong> &ndash; Remove all active steps from the grid.</li>
                <li><strong>Randomize</strong> &ndash; Generate a random pattern. Good for inspiration.</li>
            </ul>

            <h3>Keyboard Shortcuts</h3>
            <div class="help-shortcuts">
                <div class="help-shortcut-row">
                    <kbd>Space</kbd>
                    <span>Play / Stop</span>
                </div>
                <div class="help-shortcut-row">
                    <kbd>Ctrl</kbd> + <kbd>Z</kbd>
                    <span>Undo</span>
                </div>
                <div class="help-shortcut-row">
                    <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd>
                    <span>Redo</span>
                </div>
            </div>
        `
    };

    var tabOrder = ['start', 'sounds', 'beats', 'genres', 'controls'];
    var tabLabels = {
        start: 'Getting Started',
        sounds: 'Drum Sounds',
        beats: 'Making Beats',
        genres: 'Genre Tips',
        controls: 'Controls'
    };

    var currentTab = 'start';

    function openHelpModal() {
        var modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.add('show');
            switchHelpTab('start');
        }
    }

    function closeHelpModal() {
        var modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.remove('show');
        }
    }

    function switchHelpTab(key) {
        currentTab = key;

        // Update tab buttons
        var tabs = document.querySelectorAll('.help-tab');
        tabs.forEach(function(tab) {
            tab.classList.toggle('active', tab.dataset.tab === key);
        });

        // Update content
        var body = document.getElementById('helpBody');
        if (body && helpContent[key]) {
            body.innerHTML = helpContent[key];
        }
    }

    // Build modal HTML and inject it
    function initHelpModal() {
        var tabsHtml = tabOrder.map(function(key) {
            var active = key === 'start' ? ' active' : '';
            return '<button class="help-tab' + active + '" data-tab="' + key + '" onclick="switchHelpTab(\'' + key + '\')">' + tabLabels[key] + '</button>';
        }).join('');

        var modal = document.getElementById('helpModal');
        if (!modal) return;

        modal.innerHTML =
            '<div class="modal-content help-modal-content">' +
                '<div class="modal-header">' +
                    '<h2>Help</h2>' +
                    '<button class="modal-close" onclick="closeHelpModal()">&times;</button>' +
                '</div>' +
                '<div class="help-tabs">' + tabsHtml + '</div>' +
                '<div class="modal-body help-modal-body" id="helpBody"></div>' +
            '</div>';

        // Overlay click to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeHelpModal();
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            var modal = document.getElementById('helpModal');
            if (modal && modal.classList.contains('show')) {
                closeHelpModal();
            }
        }
    });

    // Expose globally
    window.openHelpModal = openHelpModal;
    window.closeHelpModal = closeHelpModal;
    window.switchHelpTab = switchHelpTab;

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHelpModal);
    } else {
        initHelpModal();
    }
})();
