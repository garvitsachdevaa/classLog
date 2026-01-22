// logic.js
// --------------------------------------------------
// PURE BUSINESS LOGIC
// --------------------------------------------------

function calculateOverallAttendance(classes) {
  if (classes.length === 0) return 0;

  const presentCount = classes.filter(
    cls => cls.status === "present"
  ).length;

  return Math.round((presentCount / classes.length) * 100);
}

function calculateSubjectAttendance(classes) {
  const stats = {};

  classes.forEach(cls => {
    if (!stats[cls.subject]) {
      stats[cls.subject] = {
        total: 0,
        present: 0,
        percentage: 0
      };
    }

    stats[cls.subject].total++;
    if (cls.status === "present") {
      stats[cls.subject].present++;
    }
  });

  Object.keys(stats).forEach(subject => {
    const s = stats[subject];
    s.percentage = Math.round((s.present / s.total) * 100);
  });

  return stats;
}

/**
 * Risk rules:
 * Safe: >= 85%
 * Borderline: 80–84%
 * Danger: < 80%
 */
function calculateSubjectRisk(subjectStats, threshold) {
  const risks = {};

  Object.keys(subjectStats).forEach(subject => {
    const pct = subjectStats[subject].percentage;

    if (pct >= 85) risks[subject] = "Safe";
    else if (pct >= threshold) risks[subject] = "Borderline";
    else risks[subject] = "Danger";
  });

  return risks;
}

function calculateSkippableClasses(subjectStats, threshold) {
  const result = {};

  Object.keys(subjectStats).forEach(subject => {
    const { total, present } = subjectStats[subject];

    const maxSkips =
      Math.floor((present / (threshold / 100)) - total);

    result[subject] = Math.max(0, maxSkips);
  });

  return result;
}
