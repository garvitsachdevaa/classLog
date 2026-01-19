// render.js
// UI rendering only

/* ================= OVERALL ATTENDANCE ================= */

function renderOverallAttendance() {
  const attendance = calculateOverallAttendance(state.classes);

  const card = document.querySelector("#overallAttendance");
  if (!card) return;

  card.querySelector(".stat-value").textContent = attendance + "%";
  card.querySelector(".progress-fill").style.width = attendance + "%";
}

/* ================= OVERALL RISK ================= */

function renderOverallRisk() {
  const attendance = calculateOverallAttendance(state.classes);
  const risk = calculateOverallRisk(attendance, state.threshold);

  const card = document.querySelector("#overallRisk");
  if (!card) return;

  const value = card.querySelector(".stat-value");
  value.textContent = risk;

  if (risk === "Safe") value.style.color = "var(--success)";
  else if (risk === "Borderline") value.style.color = "orange";
  else value.style.color = "red";
}

/* ================= SUBJECT CARDS ================= */

function renderSubjectCards() {
  const container = document.querySelector("#subjectCards");
  if (!container) return;

  container.innerHTML = "";

  const subjectStats = calculateSubjectAttendance(state.classes);
  const skippable = calculateSkippableClasses(subjectStats, state.threshold);

  for (let subject in subjectStats) {
    const data = subjectStats[subject];

    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
      <h3>${subject}</h3>
      <div class="subject-stat">${data.percentage}%</div>
      <div class="mini-progress">
        <div class="mini-fill" style="width:${data.percentage}%"></div>
      </div>
      <p class="tagline">
        You can skip <strong>${skippable[subject]}</strong> class(es)
      </p>
    `;

    container.appendChild(card);
  }
}

/* ================= RECENT ACTIVITY TABLE ================= */

function renderClassTable() {
  const tbody = document.querySelector("#classTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  const classes = [...state.classes].reverse();

  classes.forEach((cls, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cls.date}</td>
      <td>${cls.subject}</td>
      <td>${cls.topic}</td>
      <td>
        <span class="badge ${cls.status}">
          ${cls.status.charAt(0).toUpperCase() + cls.status.slice(1)}
        </span>
      </td>
      <td>
        <button class="btn-delete" data-index="${state.classes.length - 1 - i}">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

/* ================= INITIAL RENDER ================= */

renderOverallAttendance();
renderOverallRisk();
renderSubjectCards();
renderClassTable();
renderAttendanceGraph();


/* ================= ATTENDANCE GRAPH ================= */

function renderAttendanceGraph() {
  const graph = document.querySelector("#attendanceGraph");
  if (!graph) return;

  // Remove existing bars (keep threshold line)
  graph.querySelectorAll(".graph-bar-container").forEach(el => el.remove());

  const subjectStats = calculateSubjectAttendance(state.classes);

  for (let subject in subjectStats) {
    const percentage = subjectStats[subject].percentage;

    const container = document.createElement("div");
    container.className = "graph-bar-container";

    container.innerHTML = `
      <div class="graph-bar" style="height: ${percentage}%">
        <span class="bar-value">${percentage}%</span>
      </div>
      <span class="bar-label">
        ${subject.slice(0, 3).toUpperCase()}
      </span>
    `;

    graph.appendChild(container);
  }
}
