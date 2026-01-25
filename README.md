# ClassLog 📚
**Academic Attendance Tracker - A Vanilla JavaScript DOM Application**

🌐 **[Live Demo](https://garvitsachdevaa.github.io/classLog/)** | Try it now!

---

## 📋 Problem Statement

University students often struggle to maintain the minimum attendance requirement (typically 80%) across multiple subjects. Missing this threshold can lead to:

- **Denial of exam eligibility**
- **Academic warnings or penalties** 
- **Loss of internal marks**
- **Difficulty tracking attendance manually across subjects**

ClassLog solves this by providing a centralized, interactive web application that allows students to:

✅ Log daily class attendance effortlessly  
✅ Monitor real-time attendance percentages per subject  
✅ Get instant risk assessments (Safe/Borderline/Danger zones)  
✅ Calculate how many classes can be safely skipped  
✅ Visualize attendance trends through interactive charts  

---

## ✨ Features Implemented

### **1. Dynamic Class Entry System**
- Form-based input with validation for date, subject, topic, and attendance status
- Real-time DOM updates upon submission
- Form reset after successful entry
- Event-driven workflow (form submission event handling)

### **2. Real-Time Analytics Dashboard**
- **Overall Attendance Card**: Displays aggregate attendance percentage with animated progress bar
- **Risk Assessment Card**: Color-coded status indicator (Safe ≥85%, Borderline 80-84%, Danger <80%)
- **Subject-wise Cards**: Individual attendance tracking with mini progress bars and risk levels
- **Skippable Classes Calculator**: Dynamically computes how many classes can be missed per subject

### **3. Interactive Data Visualization**
- **Bar Graph**: Subject-wise attendance visualization with 80% threshold line
- Bars dynamically scale based on attendance percentage
- Hover effects for better interactivity
- Y-axis labels and threshold marker

### **4. Recent Activity Table**
- Reverse chronological display of all logged classes
- Delete functionality for individual entries
- Badge-based status display (Present/Absent)
- Responsive table design with horizontal scroll on mobile

### **5. Subject Management**
- Add custom subjects dynamically via prompt dialog
- Delete subjects along with all associated class entries
- Subject dropdown automatically updates with new additions
- Event delegation for efficient delete operations

### **6. Persistent Data Storage**
- LocalStorage integration for data persistence across sessions
- Automatic save on every state mutation
- Graceful fallback to default state on first visit or data corruption
- "Last Sync" timestamp in navbar showing latest data update

### **7. Responsive UI**
- Mobile-first responsive design
- Flexbox and CSS Grid layouts
- Collapsible navigation on small screens
- Touch-friendly interface elements

---

## 🧠 DOM Concepts Used

### **1. DOM Element Creation & Manipulation**
```javascript
// Creating elements dynamically
const card = document.createElement("div");
card.className = "subject-card";
card.innerHTML = `<h3>${subject}</h3>...`;

// Appending to DOM
container.appendChild(card);
```

### **2. DOM Selection & Traversal**
- `document.getElementById()` - For unique element selection
- `document.querySelector()` / `querySelectorAll()` - For CSS selector-based selection
- `classList API` - For class manipulation (add, remove, contains)
- `dataset API` - For storing and retrieving custom data attributes

### **3. Event Handling**
- **Form Submit Event**: Prevents default behavior, extracts form data, updates state
- **Click Events**: Button interactions for adding subjects and deleting entries
- **Event Delegation**: Single listener on document for handling dynamically created delete buttons

```javascript
document.addEventListener("click", event => {
  if (event.target.classList.contains("btn-delete")) {
    // Handle deletion
  }
});
```

### **4. Dynamic Content Rendering**
- Clearing containers with `innerHTML = ""`
- Building UI elements based on application state
- Conditional rendering (e.g., "No data" message when classes array is empty)

### **5. Styling Manipulation**
- Inline style updates: `element.style.width = percentage + "%"`
- Dynamic color changes based on data: `element.style.color = riskColor`
- Progress bar animations via width manipulation

### **6. Form Handling**
- Reading input values via `element.value`
- Form validation through `required` attributes
- Programmatic form reset: `form.reset()`

### **7. Template Literals for HTML Generation**
- Multi-line HTML templates with dynamic data interpolation
- Cleaner, more maintainable code compared to string concatenation

---

## 🏗️ Project Architecture

### **Modular JavaScript Structure**
The project follows a separation of concerns architecture with four distinct modules:

#### **1. state.js - State Management**
- **Responsibility**: Application state and persistence
- **Key Functions**:
  - `loadState()` - Retrieves data from localStorage
  - `saveState()` - Persists current state to localStorage

- **State Structure**:
```javascript
{
  threshold: 80,
  subjects: ["WebDev", "DSA", "Maths"],
  classes: [
    { date, subject, topic, status }
  ]
}
```

#### **2. logic.js - Business Logic**
- **Responsibility**: Pure computation functions (no DOM manipulation)
- **Key Functions**:
  - `calculateOverallAttendance()` - Computes total attendance %
  - `calculateSubjectAttendance()` - Subject-wise statistics
  - `calculateSubjectRisk()` - Risk level determination
  - `calculateSkippableClasses()` - Max skippable classes calculation

#### **3. render.js - UI Rendering**
- **Responsibility**: Reading state and updating the DOM
- **Key Functions**:
  - `renderNavbarMeta()` - Updates navbar status indicators
  - `renderOverallAttendance()` - Hero card with overall stats
  - `renderOverallRisk()` - Risk assessment display
  - `renderSubjectCards()` - Subject cards with individual stats
  - `renderAttendanceGraph()` - Bar chart visualization
  - `renderClassTable()` - Recent activity table
  - `renderAll()` - Master render function

#### **4. events.js - Event Handlers**
- **Responsibility**: User interaction handling and state mutations
- **Event Handlers**:
  - Form submission for adding classes
  - Add Subject button click
  - Delete operations via event delegation

---

## 🚀 How to Run the Project

### **Prerequisites**
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server or build tools required

### **Steps**
1. **Download/Clone** the project repository
2. **Navigate** to the project folder
3. **Open** `index.html` in your web browser
   - Double-click the file, or
   - Right-click → Open With → Browser
4. **Start logging** your attendance immediately!

### **Alternative: Use Live Demo**
🌐 **[Access ClassLog Online](https://garvitsachdevaa.github.io/classLog/)** - No download required!

### **File Structure**
```
classLog/
├── index.html          # Main HTML structure
├── style.css           # Complete styling
├── js/
│   ├── state.js        # State management
│   ├── logic.js        # Business logic
│   ├── render.js       # DOM rendering
│   └── events.js       # Event handling
└── README.md
```

---

## 🔧 Technical Implementation Highlights

### **State Management Pattern**
- **Single Source of Truth**: Global state object
- **Unidirectional Data Flow**: Events → State Mutation → Render
- **Persistence**: Every mutation triggers `saveState()` to localStorage

### **Pure Function Approach**
All business logic functions are pure:
- No side effects
- Same input always produces same output
- Easier to test and debug

### **Event Delegation for Performance**
Instead of attaching listeners to every delete button:
```javascript
// ❌ Inefficient
buttons.forEach(btn => btn.addEventListener('click', handler));

// ✅ Efficient - Single listener
document.addEventListener('click', event => {
  if (event.target.matches('.btn-delete')) {
    // Handle deletion
  }
});
```

### **Responsive Design**
- CSS Grid for dashboard layout
- Flexbox for component alignment
- Media queries for mobile optimization
- Touch-friendly button sizes

---

## ⚠️ Known Limitations

- **Data stored locally only** - No cloud sync; clearing browser data will delete all records
- **No multi-user support** - Single user per browser instance
- **No data export** - Cannot export attendance reports to CSV/PDF
- **Fixed threshold** - 80% requirement is hardcoded (not user-configurable via UI)
- **No authentication** - Anyone with browser access can view/modify data
- **Graph limited to screen width** - Many subjects may cause overflow on small screens

---

## 📊 DOM Manipulation Depth Analysis

| **Feature** | **Implementation Status** |
|-------------|---------------------------|
| **Element Creation** | ✅ Extensive - Subject cards, graph bars, table rows, and badges all created dynamically |
| **Element Updates** | ✅ Comprehensive - Progress bars, status text, percentages, risk indicators updated on every state change |
| **Element Removal** | ✅ Implemented - Delete functionality for both classes and subjects, complete removal from DOM and state |
| **Event Handling** | ✅ Advanced - Form validation, event delegation, multiple event types |
| **Conditional Rendering** | ✅ Present - "No data" states, risk-based color coding, dynamic badge classes |
| **State-Driven UI** | ✅ Fully Reactive - All UI elements derive from centralized state, changes immediately reflect in DOM |

---

## 🎯 Why This Project Meets Requirements

| **Requirement** | **Implementation** |
|-----------------|-------------------|
| **Vanilla JavaScript** | ✅ Zero frameworks, pure DOM APIs |
| **Heavy DOM Manipulation** | ✅ Dynamic creation of cards, graphs, tables |
| **Event-Driven** | ✅ Form submissions, clicks, delegated events |
| **Application Logic** | ✅ Attendance calculations, risk assessment |
| **State Handling** | ✅ Centralized state with localStorage persistence |
| **Real-World Problem** | ✅ Solves actual student attendance tracking needs |
| **User Interaction** | ✅ Add, delete, view, analyze data |
| **Edge Cases** | ✅ Empty states, duplicate subjects, invalid data |
| **Clean UI/UX** | ✅ Modern design, clear feedback, responsive |
| **Code Quality** | ✅ Modular, commented, well-structured |

---

## 🎓 Learning Outcomes

This project demonstrates mastery of:

- ✅ **Core JavaScript fundamentals** (ES6+ features)
- ✅ **DOM manipulation techniques**
- ✅ **Event handling and delegation**
- ✅ **State management patterns**
- ✅ **LocalStorage API usage**
- ✅ **Modular code organization**
- ✅ **Responsive web design**
- ✅ **User experience considerations**
- ✅ **Code documentation practices**

---

**Made with ❤️ for students who want to stay on top of their attendance goals.**

🌐 **[Try ClassLog Now](https://garvitsachdevaa.github.io/classLog/)**