// render.js
// --------------------------------------------------
// Responsible for ALL UI rendering
// Reads from state, never mutates it
// --------------------------------------------------

function renderOverallAttendance() {
  const val = calculateOverallAttendance(state.classes);
  const card = document.querySelector("#overallAttendance");
  if (!card) return;

  card.querySelector(".stat-value").textContent = val + "%";
  card.querySelector(".progress-fill").style.width = val + "%";
}

function renderOverallRisk() {
  const card = document.querySelector("#overallRisk");
  if (!card) return;

  const value = card.querySelector(".stat-value");

  if (state.classes.length === 0) {
    value.textContent = "—";
    value.style.color = "var(--text-secondary)";
    return;
  }

  const attendance = calculateOverallAttendance(state.classes);
  const risk = calculateOverallRisk(attendance, state.threshold);

  value.textContent = risk;
  value.style.color =
    risk === "Safe" ? "var(--success)" :
    risk === "Borderline" ? "orange" :
    "red";
}

/* ---------- Subject Cards (with Remove button) ---------- */

function renderSubjectCards() {
  const container = document.querySelector("#subjectCards");
  if (!container) return;

  container.innerHTML = "";

  if (state.subjects.length === 0) {
    container.innerHTML = `<p class="tagline">No subjects added</p>`;
    return;
  }

  const stats = calculateSubjectAttendance(state.classes);
  const skippable = calculateSkippableClasses(stats, state.threshold);

  state.subjects.forEach(subject => {
    const data = stats[subject] || { percentage: 0 };
    const skip = skippable[subject] || 0;

    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
      <h3>${subject}</h3>
      <div class="subject-stat">${data.percentage}%</div>
      <div class="mini-progress">
        <div class="mini-fill" style="width:${data.percentage}%"></div>
      </div>
      <p class="tagline">You can skip <strong>${skip}</strong> class(es)</p>
      <button class="btn-delete" data-subject="${subject}">
        Remove Subject
      </button>
    `;

    container.appendChild(card);
  });
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
        <button class="btn-delete" data-index="${state.classes.length - 1 - i}">
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

  graph.querySelectorAll(".graph-bar-container").forEach(e => e.remove());

  const stats = calculateSubjectAttendance(state.classes);

  state.subjects.forEach(subject => {
    const percentage = stats[subject]?.percentage ?? 0;

    const bar = document.createElement("div");
    bar.className = "graph-bar-container";

    bar.innerHTML = `
      <div class="graph-bar" style="height:${percentage}%">
        <span class="bar-value">${percentage}%</span>
      </div>
      <span class="bar-label">${subject.slice(0,3).toUpperCase()}</span>
    `;

    graph.appendChild(bar);
  });
}

/* ---------- Master Render ---------- */

function renderAll() {
  renderOverallAttendance();
  renderOverallRisk();
  renderSubjectCards();
  renderClassTable();
  renderAttendanceGraph();
}

renderAll();
