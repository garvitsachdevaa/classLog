// state.js
// --------------------------------------------------
// This file holds the GLOBAL APPLICATION STATE
// It is the single source of truth for the app.
//
// Responsibilities:
// 1. Load persisted class data from localStorage
// 2. Save class data whenever it changes
// 3. Expose the global `state` object
// --------------------------------------------------

// Key used to store data in browser localStorage
const STORAGE_KEY = "classlog_state";

/**
 * Loads saved classes from localStorage
 * @returns {Array} array of class objects
 */
function loadClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    // In case stored data is corrupted
    return [];
  }
}

/**
 * Saves current classes to localStorage
 * Called after every add/delete operation
 */
function saveClasses() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state.classes)
  );
}

// Global application state
const state = {
  // Attendance threshold (can be changed later via UI)
  threshold: 80,

  // Array of class objects
  // Each object: { date, subject, topic, status }
  classes: loadClasses()
};
