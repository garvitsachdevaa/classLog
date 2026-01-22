// state.js
// --------------------------------------------------
// GLOBAL APPLICATION STATE + PERSISTENCE
//
// This file is responsible for:
// - Holding the single source of truth (state)
// - Loading state from localStorage on startup
// - Saving state back to localStorage on changes
// --------------------------------------------------

const STORAGE_KEY = "classlog_state_v2";

/**
 * Load entire app state from localStorage.
 * Falls back to defaults if nothing is saved or data is corrupted.
 */
function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return {
      threshold: 80,
      subjects: ["WebDev", "DSA", "Maths"],
      classes: []
    };
  }

  try {
    return JSON.parse(saved);
  } catch {
    return {
      threshold: 80,
      subjects: ["WebDev", "DSA", "Maths"],
      classes: []
    };
  }
}

/**
 * Persist current state to localStorage.
 * Called after every state mutation.
 */
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Global state object (single source of truth)
const state = loadState();
