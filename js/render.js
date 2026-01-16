// render.js
// This file connects logic with the UI (HTML)

// Function to update Overall Attendance card
function renderOverallAttendance() {

  // Ask logic.js to calculate attendance
  // We pass the data from state.js
  const attendance =
    calculateOverallAttendance(state.classes);

  // Select the overall attendance card
  const attendanceCard =
    document.querySelector("#overallAttendance");

  // Inside the card, select the number text
  const valueElement =
    attendanceCard.querySelector(".stat-value");

  // Inside the card, select the progress bar fill
  const progressFill =
    attendanceCard.querySelector(".progress-fill");

  // Update the text (replaces hardcoded 82%)
  valueElement.textContent = attendance + "%";

  // Update progress bar width
  progressFill.style.width = attendance + "%";
}

// Call the function ONCE when page loads
renderOverallAttendance();
