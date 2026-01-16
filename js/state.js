// state.js
// This file stores ALL the data of the application.
// We create ONE global object called `state`
const state = {

  // Attendance threshold (80% rule)
  // Later, we may allow changing this
  threshold: 80,

  // Array that stores every class logged
  // Each object = one class
  classes: [
    // TEMPORARY sample data
    // Later, classes will come from the form

    { subject: "WebDev", status: "present" },
    { subject: "WebDev", status: "present" },
    { subject: "WebDev", status: "absent" },

    { subject: "DSA", status: "present" },
    { subject: "DSA", status: "absent" },

    { subject: "Maths", status: "present" },
    { subject: "Maths", status: "present" },
    { subject: "Maths", status: "present" }
  ]
};
