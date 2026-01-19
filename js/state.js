// state.js
// Single source of truth + persistence

const STORAGE_KEY = "classlog_state";

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.classes));
}

const state = {
  threshold: 80,
  classes: loadState()
};
