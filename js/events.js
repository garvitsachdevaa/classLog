// events.js
// --------------------------------------------------
// Handles ALL user interactions
// Mutates state, saves persistence, triggers re-render
// --------------------------------------------------

const form = document.querySelector("#addClassForm");

/* ---------- Add Class ---------- */

if (form) {
  form.addEventListener("submit", event => {
    event.preventDefault();

    const date = classDate.value;
    const subject = classSubject.value;
    const topic = classTopic.value;
    const status = classStatus.value.toLowerCase();

    // Mutate state
    state.classes.push({
      date,
      subject,
      topic,
      status
    });

    // Persist + re-render
    saveClasses();
    renderAll();

    form.reset();
  });
}

/* ---------- Delete Class (Event Delegation) ---------- */

document.addEventListener("click", event => {
  if (!event.target.classList.contains("btn-delete")) return;

  const index = Number(event.target.dataset.index);

  state.classes.splice(index, 1);
  saveClasses();
  renderAll();
});

/* ---------- Editable Threshold ---------- */

document.addEventListener("change", event => {
  if (event.target.id !== "thresholdInput") return;

  state.threshold = Number(event.target.value);
  renderAll();
});
