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


// ------------------------

function renderOverallRisk() {

  // Step 1: get attendance %
  const attendance =
    calculateOverallAttendance(state.classes);

  // Step 2: get risk status using logic
  const risk =
    calculateOverallRisk(attendance, state.threshold);

  // Step 3: select risk card
  const riskCard =
    document.querySelector("#overallRisk");

  // Step 4: select the text element
  const valueElement =
    riskCard.querySelector(".stat-value");

  // Step 5: update text
  valueElement.textContent = risk;

  // Step 6: reset color classes
  valueElement.className = "stat-value";

  // Step 7: apply color based on risk
  if (risk === "Safe") {
    valueElement.classList.add("status-safe");
  } else if (risk === "Borderline") {
    valueElement.style.color = "orange";
  } else {
    valueElement.style.color = "red";
  }
}


renderOverallAttendance();
renderOverallRisk();


//---------------------------


