// events.js
// Handles user interactions (form submission)

// Select the form
const addClassForm = document.querySelector("#addClassForm");

// Safety check
if (addClassForm) {
  addClassForm.addEventListener("submit", function (event) {
    // Prevent page reload
    event.preventDefault();

    // Read values from form
    const date = document.querySelector("#classDate").value;
    const subject = document.querySelector("#classSubject").value;
    const topic = document.querySelector("#classTopic").value;
    const status = document.querySelector("#classStatus").value;

    // Normalize status to match logic ("present" / "absent")
    const normalizedStatus =
      status.toLowerCase();

    // Add new class to state
    state.classes.push({
      date: date,
      subject: subject,
      topic: topic,
      status: normalizedStatus
    });

    // Re-render UI
    renderOverallAttendance();
    renderOverallRisk();
    renderSubjectCards();

    // Reset form for next entry
    addClassForm.reset();
  });
}

//------------------


