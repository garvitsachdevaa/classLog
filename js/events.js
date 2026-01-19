// events.js
// User interactions

const addClassForm = document.querySelector("#addClassForm");

if (addClassForm) {
  addClassForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const date = document.querySelector("#classDate").value;
    const subject = document.querySelector("#classSubject").value;
    const topic = document.querySelector("#classTopic").value;
    const status = document.querySelector("#classStatus").value.toLowerCase();

    state.classes.push({
      date,
      subject,
      topic,
      status
    });

    renderOverallAttendance();
    renderOverallRisk();
    renderSubjectCards();
    renderClassTable();
    renderAttendanceGraph();

    addClassForm.reset();
  });
}

/* ================= DELETE HANDLER ================= */

document.addEventListener("click", function (event) {
  if (!event.target.classList.contains("btn-delete")) return;

  const index = Number(event.target.dataset.index);
  state.classes.splice(index, 1);

  renderOverallAttendance();
  renderOverallRisk();
  renderSubjectCards();
  renderClassTable();
  renderAttendanceGraph();
});
