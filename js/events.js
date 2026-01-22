// events.js
// --------------------------------------------------
// USER INTERACTIONS
//
// Responsibilities:
// - Mutate state
// - Persist state
// - Trigger re-render
// --------------------------------------------------

const form = document.querySelector("#addClassForm");
const addSubjectBtn = document.querySelector(".btn-ghost");

/* ---------- Add Class ---------- */

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const date = classDate.value;
    const subject = classSubject.value;
    const topic = classTopic.value;
    const status = classStatus.value.toLowerCase();

    state.classes.push({
      date,
      subject,
      topic,
      status
    });

    saveState();
    renderAll();
    form.reset();
  });
}

/* ---------- Add Subject ---------- */

if (addSubjectBtn) {
  addSubjectBtn.addEventListener("click", () => {
    const input = prompt("Enter new subject name:");
    if (!input) return;

    const subject = input.trim();
    if (!subject) return;

    if (state.subjects.includes(subject)) {
      alert("Subject already exists");
      return;
    }

    state.subjects.push(subject);
    saveState();
    renderAll();
  });
}

/* ---------- Delete Class OR Subject (Event Delegation) ---------- */

document.addEventListener("click", event => {

  // Delete class entry
  if (
    event.target.classList.contains("btn-delete") &&
    event.target.dataset.index
  ) {
    const index = Number(event.target.dataset.index);
    state.classes.splice(index, 1);
    saveState();
    renderAll();
    return;
  }

  // Delete subject and all its classes
  if (
    event.target.classList.contains("btn-delete") &&
    event.target.dataset.subject
  ) {
    const subject = event.target.dataset.subject;

    state.subjects = state.subjects.filter(
      s => s !== subject
    );

    state.classes = state.classes.filter(
      cls => cls.subject !== subject
    );

    saveState();
    renderAll();
  }
});
