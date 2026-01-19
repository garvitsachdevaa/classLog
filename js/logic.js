// logic.js
// PURE logic only

function calculateOverallAttendance(classes) {
  if (classes.length === 0) return 0;

  const presentCount = classes.filter(cls => cls.status === "present").length;
  return Math.round((presentCount / classes.length) * 100);
}

function calculateOverallRisk(attendance, threshold) {
  if (attendance >= threshold) return "Safe";
  if (attendance >= threshold - 10) return "Borderline";
  return "Danger";
}

function calculateSubjectAttendance(classes) {
  const subjectStats = {};

  classes.forEach(cls => {
    if (!subjectStats[cls.subject]) {
      subjectStats[cls.subject] = {
        total: 0,
        present: 0,
        percentage: 0
      };
    }

    subjectStats[cls.subject].total += 1;
    if (cls.status === "present") {
      subjectStats[cls.subject].present += 1;
    }
  });

  for (let subject in subjectStats) {
    const data = subjectStats[subject];
    data.percentage = Math.round((data.present / data.total) * 100);
  }

  return subjectStats;
}

function calculateSkippableClasses(subjectStats, threshold) {
  const result = {};

  for (let subject in subjectStats) {
    const { total, present } = subjectStats[subject];

    if (total === 0) {
      result[subject] = 0;
      continue;
    }

    const maxSkips = Math.floor((present / (threshold / 100)) - total);
    result[subject] = Math.max(0, maxSkips);
  }

  return result;
}
