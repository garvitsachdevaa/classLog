// render.js
// --------------------------------------------------
// Responsible for ALL DOM updates
// Reads data from `state` and logic functions
// Never mutates state
// --------------------------------------------------

/* ---------- Overall Attendance Card ---------- */

function renderOverallAttendance() {
  const attendance = calculateOverallAttendance(state.classes);
  const card = document.querySelector("#overallAttendance");
  if (!card) return;

  card.querySelector(".stat-value").textContent =
    attendance + "%";
  card.querySelector(".progress-fill").style.width =
    attendance + "%";
}

/* ---------- Academic Risk Card ---------- */

function renderOverallRisk() {
  const card = document.querySelector("#overallRisk");
  if (!card) return;

  const value = card.querySelector(".stat-value");

  // ✅ If no classes yet, show nothing
  if (state.classes.length === 0) {
    value.textContent = "—";
    value.style.color = "var(--text-secondary)";
    return;
  }

  const attendance = calculateOverallAttendance(state.classes);
  const risk = calculateOverallRisk(attendance, state.threshold);

  value.textContent = risk;

  value.style.color =
    risk === "Safe"
      ? "var(--success)"
      : risk === "Borderline"
      ? "orange"
      : "red";
}


/* ---------- Subject Cards ---------- */

function renderSubjectCards() {
  const container = document.querySelector("#subjectCards");
  if (!container) return;

  container.innerHTML = "";

  if (state.classes.length === 0) {
    container.innerHTML =
      `<p class="tagline">No subjects yet</p>`;
    return;
  }

  const stats = calculateSubjectAttendance(state.classes);
  const skippable =
    calculateSkippableClasses(stats, state.threshold);

  for (let subject in stats) {
    const data = stats[subject];
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

/* ---------- Recent Activity Table ---------- */

function renderClassTable() {
  const tbody = document.querySelector("#classTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (state.classes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; opacity:0.6">
          No classes logged yet
        </td>
      </tr>`;
    return;
  }

  // Reverse to show latest entries first
  [...state.classes].reverse().forEach((cls, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cls.date}</td>
      <td>${cls.subject}</td>
      <td>${cls.topic}</td>
      <td>
        <span class="badge ${cls.status}">
          ${cls.status[0].toUpperCase() + cls.status.slice(1)}
        </span>
      </td>
      <td>
        <button class="btn-delete"
          data-index="${state.classes.length - 1 - i}">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

/* ---------- Attendance Graph ---------- */

function renderAttendanceGraph() {
  const graph = document.querySelector("#attendanceGraph");
  if (!graph) return;

  // Remove old bars but keep threshold line
  graph
    .querySelectorAll(".graph-bar-container")
    .forEach(el => el.remove());

  const stats = calculateSubjectAttendance(state.classes);

  for (let subject in stats) {
    const percentage = stats[subject].percentage;

    const bar = document.createElement("div");
    bar.className = "graph-bar-container";

    bar.innerHTML = `
      <div class="graph-bar" style="height:${percentage}%">
        <span class="bar-value">${percentage}%</span>
      </div>
      <span class="bar-label">
        ${subject.slice(0, 3).toUpperCase()}
      </span>
    `;

    graph.appendChild(bar);
  }
}

/* ---------- Master Render ---------- */

function renderAll() {
  renderOverallAttendance();
  renderOverallRisk();
  renderSubjectCards();
  renderClassTable();
  renderAttendanceGraph();
}

// Initial render on page load
renderAll();
