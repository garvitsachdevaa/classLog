// events.js
// --------------------------------------------------
// Handles ALL user interactions
// Mutates state → saves → re-renders
// --------------------------------------------------

const form = document.querySelector("#addClassForm");
const addSubjectBtn = document.querySelector(".btn-ghost");

/* ---------- Add Class ---------- */

if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();

    const date = classDate.value;
    const subject = classSubject.value;
    const topic = classTopic.value;
    const status = classStatus.value.toLowerCase();

    state.classes.push({ date, subject, topic, status });
    saveState();
    renderAll();
    form.reset();
  });
}

/* ---------- Add Subject ---------- */

if (addSubjectBtn) {
  addSubjectBtn.addEventListener("click", () => {
    const name = prompt("Enter new subject name:");
    if (!name) return;

    const subject = name.trim();
    if (state.subjects.includes(subject)) {
      alert("Subject already exists");
      return;
    }

    state.subjects.push(subject);
    saveState();
    renderAll();
  });
}

/* ---------- Delete Class OR Subject (delegation) ---------- */

document.addEventListener("click", e => {

  // Delete class
  if (e.target.classList.contains("btn-delete") && e.target.dataset.index) {
    const index = Number(e.target.dataset.index);
    state.classes.splice(index, 1);
    saveState();
    renderAll();
    return;
  }

  // Delete subject
  if (e.target.classList.contains("btn-delete") && e.target.dataset.subject) {
    const subject = e.target.dataset.subject;

    // Remove subject
    state.subjects = state.subjects.filter(s => s !== subject);

    // Remove all classes under that subject
    state.classes = state.classes.filter(c => c.subject !== subject);

    saveState();
    renderAll();
  }
});
