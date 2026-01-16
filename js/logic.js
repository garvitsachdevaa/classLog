// logic.js
// This file contains PURE logic (math / decisions)
// No HTML, no document, no UI stuff

// Function to calculate overall attendance percentage
function calculateOverallAttendance(classes) {

  // Safety check:
  // If there are no classes, attendance is 0%
  if (classes.length === 0) {
    return 0;
  }

  // Count how many classes are marked "present"
  const presentCount = classes.filter(function (cls) {
    // Keep only classes where status is "present"
    return cls.status === "present";
  }).length;

  // Calculate percentage
  const attendancePercentage =
    (presentCount / classes.length) * 100;

  // Round the number and return it
  return Math.round(attendancePercentage);
}


//---------------


// Decide overall academic risk based on attendance percentage
function calculateOverallRisk(attendance, threshold) {

  // If attendance meets or exceeds threshold
  if (attendance >= threshold) {
    return "Safe";
  }

  // If attendance is close to threshold
  if (attendance >= threshold - 10) {
    return "Borderline";
  }

  // If attendance is well below threshold
  return "Danger";
}


//-----------------

// Calculate attendance data for each subject
function calculateSubjectAttendance(classes) {
  const subjectStats = {};

  // Loop through every class
  classes.forEach(function (cls) {

    // If subject not seen before, initialize it
    if (!subjectStats[cls.subject]) {
      subjectStats[cls.subject] = {
        total: 0,
        present: 0,
        percentage: 0
      };
    }

    // Increase total class count
    subjectStats[cls.subject].total += 1;

    // If present, increase present count
    if (cls.status === "present") {
      subjectStats[cls.subject].present += 1;
    }
  });

  // Calculate percentage for each subject
  for (let subject in subjectStats) {
    const data = subjectStats[subject];
    data.percentage = Math.round(
      (data.present / data.total) * 100
    );
  }

  return subjectStats;
}
