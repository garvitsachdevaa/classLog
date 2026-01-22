// ================================
// render.js
// -------------------------------
// Responsible for:
// - Reading data from `state`
// - Calling pure logic functions
// - Updating the DOM
// - NEVER mutating state
// ================================


/* ================================
   NAVBAR META (Status + Last Sync)
   Rule:
   - Based ONLY on overall %
   ================================ */
function renderNavbarMeta() {
  const statusEl = document.getElementById("navStatus");
  const syncEl = document.getElementById("lastSync");
  if (!statusEl || !syncEl) return;

  if (state.classes.length === 0) {
    statusEl.textContent = "No Data";
    statusEl.style.color = "var(--text-secondary)";
  } else {
    const overall = calculateOverallAttendance(state.classes);

    if (overall < 80) {
      statusEl.textContent = "At Risk";
      statusEl.style.color = "var(--danger)";
    } else if (overall < 85) {
      statusEl.textContent = "Borderline";
      statusEl.style.color = "var(--warning)";
    } else {
      statusEl.textContent = "On Track";
      statusEl.style.color = "var(--success)";
    }
  }

  syncEl.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}


/* ================================
   HERO: Overall Attendance
   ================================ */
function renderOverallAttendance() {
  const card = document.getElementById("overallAttendance");
  if (!card) return;

  const valueEl = card.querySelector(".stat-value");
  const fillEl = card.querySelector(".progress-fill");

  const overall = calculateOverallAttendance(state.classes);

  valueEl.textContent = overall + "%";
  fillEl.style.width = overall + "%";
}


/* ================================
   HERO: Overall Status
   ================================ */
function renderOverallRisk() {
  const card = document.getElementById("overallRisk");
  if (!card) return;

  const valueEl = card.querySelector(".stat-value");

  if (state.classes.length === 0) {
    valueEl.textContent = "—";
    valueEl.style.color = "var(--text-secondary)";
    return;
  }

  const overall = calculateOverallAttendance(state.classes);

  if (overall < 80) {
    valueEl.textContent = "At Risk";
    valueEl.style.color = "var(--danger)";
  } else if (overall < 85) {
    valueEl.textContent = "Borderline";
    valueEl.style.color = "var(--warning)";
  } else {
    valueEl.textContent = "On Track";
    valueEl.style.color = "var(--success)";
  }
}


/* ================================
   SUBJECT CARDS
   ================================ */
function renderSubjectCards() {
  const container = document.getElementById("subjectCards");
  if (!container) return;

  container.innerHTML = "";

  const stats = calculateSubjectAttendance(state.classes);
  const risks = calculateSubjectRisk(stats, state.threshold);
  const skips = calculateSkippableClasses(stats, state.threshold);

  state.subjects.forEach(subject => {
    const percentage = stats[subject]?.percentage ?? 0;
    const risk = risks[subject] ?? "—";
    const skip = skips[subject] ?? 0;

    const card = document.createElement("div");
    card.className = "subject-card";

    card.innerHTML = `
      <h3>${subject}</h3>

      <div class="subject-stat">${percentage}%</div>

      <div class="mini-progress">
        <div class="mini-fill" style="width:${percentage}%"></div>
      </div>

      <p class="tagline">
        Status:
        <strong style="color:${
          risk === "Safe"
            ? "var(--success)"
            : risk === "Borderline"
            ? "var(--warning)"
            : risk === "Danger"
            ? "var(--danger)"
            : "var(--text-secondary)"
        }">
          ${risk}
        </strong>
      </p>

      <p class="tagline">
        Skip <strong>${skip}</strong> consecutive class(es)
      </p>

      <button class="btn-delete" data-subject="${subject}">
        Remove Subject
      </button>
    `;

    container.appendChild(card);
  });
}


/* ================================
   ATTENDANCE GRAPH (FIXED)
   ================================ */
function renderAttendanceGraph() {
  const graph = document.getElementById("attendanceGraph");
  if (!graph) return;

  // Remove old bars (keep threshold line)
  graph
    .querySelectorAll(".graph-bar-container")
    .forEach(el => el.remove());

  const stats = calculateSubjectAttendance(state.classes);

  state.subjects.forEach(subject => {
    const percentage = stats[subject]?.percentage ?? 0;

    const barContainer = document.createElement("div");
    barContainer.className = "graph-bar-container";

    barContainer.innerHTML = `
      <div class="graph-bar" style="height:${percentage}%">
        <span class="bar-value">${percentage}%</span>
      </div>
      <span class="bar-label">
        ${subject.slice(0, 3).toUpperCase()}
      </span>
    `;

    graph.appendChild(barContainer);
  });
}


/* ================================
   RECENT ACTIVITY TABLE
   ================================ */
function renderClassTable() {
  const tbody = document.getElementById("classTableBody");
  if (!tbody) return;

  tbody.innerHTML = "";

  if (state.classes.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; opacity:0.6">
          No classes logged yet
        </td>
      </tr>
    `;
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
        <button class="btn-delete"
          data-index="${state.classes.length - 1 - i}">
          Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}


/* ================================
   MASTER RENDER
   ================================ */
function renderAll() {
  renderNavbarMeta();
  renderOverallAttendance();
  renderOverallRisk();
  renderSubjectCards();
  renderAttendanceGraph(); // 🔴 THIS WAS MISSING BEFORE
  renderClassTable();
}

// Initial render
renderAll();
