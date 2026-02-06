/**
 * BeatMaker - State Management
 * Contains all global state variables
 * Dependencies: None
 */
'use strict';

// State
let pattern = Array(TRACKS).fill().map(() => Array(STEPS).fill(0));
let trackVolumes = Array(TRACKS).fill(1.0); // Default volume 1.0 (100%)
let trackMutes = Array(TRACKS).fill(0); // Mute state for each track (0 = unmuted, 1 = muted)
let trackSolos = Array(TRACKS).fill(0); // Solo state for each track (0 = not solo, 1 = solo)
let isPlaying = false;
let currentStep = 0;
let bpm = 90;
let audioContext;
let nextNoteTime = 0.0;
let scheduleAheadTime = 0.3; // Increased to 0.3s to schedule multiple notes ahead (even at 60 BPM)
let timerID;
