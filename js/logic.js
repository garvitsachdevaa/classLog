// logic.js
// --------------------------------------------------
// PURE BUSINESS LOGIC ONLY
// No DOM access, no UI code, no side effects
// These functions are deterministic and testable
// --------------------------------------------------

/**
 * Calculates overall attendance percentage
 */
function calculateOverallAttendance(classes) {
  if (classes.length === 0) return 0;

  const presentCount = classes.filter(
    cls => cls.status === "present"
  ).length;

  return Math.round((presentCount / classes.length) * 100);
}

/**
 * Determines academic risk level
 */
function calculateOverallRisk(attendance, threshold) {
  if (attendance >= threshold) return "Safe";
  if (attendance >= threshold - 10) return "Borderline";
  return "Danger";
}

/**
 * Groups classes by subject and calculates attendance per subject
 */
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

    stats[cls.subject].total += 1;
    if (cls.status === "present") {
      stats[cls.subject].present += 1;
    }
  });

  // Compute percentage for each subject
  for (let subject in stats) {
    const data = stats[subject];
    data.percentage = Math.round(
      (data.present / data.total) * 100
    );
  }

  return stats;
}

/**
 * Calculates how many future classes can be skipped
 * while maintaining the attendance threshold
 */
function calculateSkippableClasses(subjectStats, threshold) {
  const result = {};

  for (let subject in subjectStats) {
    const { total, present } = subjectStats[subject];

    const maxSkips =
      Math.floor((present / (threshold / 100)) - total);

    result[subject] = Math.max(0, maxSkips);
  }

  return result;
}
