// render.js
// This file connects logic with the UI (HTML)

/* ================= OVERALL ATTENDANCE ================= */

function renderOverallAttendance() {
  const attendance = calculateOverallAttendance(state.classes);

  const attendanceCard = document.querySelector("#overallAttendance");
  if (!attendanceCard) return;

  const valueElement = attendanceCard.querySelector(".stat-value");
  const progressFill = attendanceCard.querySelector(".progress-fill");

  valueElement.textContent = attendance + "%";
  progressFill.style.width = attendance + "%";
}


/* ================= OVERALL RISK ================= */

function renderOverallRisk() {
  const attendance = calculateOverallAttendance(state.classes);
  const risk = calculateOverallRisk(attendance, state.threshold);

  const riskCard = document.querySelector("#overallRisk");
  if (!riskCard) return;

  const valueElement = riskCard.querySelector(".stat-value");
  valueElement.textContent = risk;

  // Apply color directly (no missing CSS classes)
  if (risk === "Safe") {
    valueElement.style.color = "var(--success)";
  } else if (risk === "Borderline") {
    valueElement.style.color = "orange";
  } else {
    valueElement.style.color = "red";
  }
}


/* ================= SUBJECT CARDS ================= */

function renderSubjectCards() {
  const subjectStats = calculateSubjectAttendance(state.classes);
  const skippable = calculateSkippableClasses(subjectStats, state.threshold);

  const container = document.querySelector("#subjectCards");
  if (!container) return;

  // Remove hardcoded cards
  container.innerHTML = "";

  for (let subject in subjectStats) {
    const data = subjectStats[subject];
    const skipCount = skippable[subject];

    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
      <h3>${subject}</h3>

      <div class="subject-stat">${data.percentage}%</div>

      <div class="mini-progress">
        <div class="mini-fill" style="width: ${data.percentage}%"></div>
      </div>

      <p class="tagline">
        You can skip <strong>${skipCount}</strong> class(es)
      </p>
    `;

    container.appendChild(card);
  }
}


/* ================= INITIAL RENDER ================= */

renderOverallAttendance();
renderOverallRisk();
renderSubjectCards();
