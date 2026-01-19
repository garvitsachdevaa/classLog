// state.js
// --------------------------------------------------
// Global application state + persistence layer
// --------------------------------------------------

const STORAGE_KEY = "classlog_state_v2";

/**
 * Load full app state from localStorage
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
 * Persist full app state
 */
function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Global state object
const state = loadState();
