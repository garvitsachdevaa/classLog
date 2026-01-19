// logic.js
// --------------------------------------------------
// Pure business logic (NO DOM, NO state mutation)
// --------------------------------------------------

function calculateOverallAttendance(classes) {
  if (classes.length === 0) return 0;
  const present = classes.filter(c => c.status === "present").length;
  return Math.round((present / classes.length) * 100);
}

function calculateOverallRisk(attendance, threshold) {
  if (attendance >= threshold) return "Safe";
  if (attendance >= threshold - 10) return "Borderline";
  return "Danger";
}

function calculateSubjectAttendance(classes) {
  const stats = {};

  classes.forEach(cls => {
    if (!stats[cls.subject]) {
      stats[cls.subject] = { total: 0, present: 0, percentage: 0 };
    }
    stats[cls.subject].total++;
    if (cls.status === "present") stats[cls.subject].present++;
  });

  for (let subject in stats) {
    const d = stats[subject];
    d.percentage = Math.round((d.present / d.total) * 100);
  }

  return stats;
}

function calculateSkippableClasses(subjectStats, threshold) {
  const result = {};

  for (let s in subjectStats) {
    const { total, present } = subjectStats[s];
    const maxSkips = Math.floor((present / (threshold / 100)) - total);
    result[s] = Math.max(0, maxSkips);
  }

  return result;
}
