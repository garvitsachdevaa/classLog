# ClassLog 📚

**Academic Attendance Tracker**

A simple, elegant web application to help students track their class attendance and maintain the required attendance percentage for academic success.

## ✨ Features

### 📊 **Attendance Tracking**
- Log daily class attendance with date, subject, topic, and status
- Real-time attendance percentage calculations
- Overall and subject-specific attendance metrics

### 🎯 **Smart Analytics**
- **Risk Assessment**: Monitor attendance status with color-coded risk levels
  - 🟢 **Safe**: ≥85% attendance
  - 🟡 **Borderline**: 80-84% attendance  
  - 🔴 **Danger**: <80% attendance
- **Skippable Classes**: Calculate how many classes you can safely skip while maintaining the 80% threshold

### 📈 **Visual Dashboard**
- Interactive attendance trends graph
- Subject-wise progress cards with mini progress bars
- Recent activity table with all class entries
- Real-time status updates in the navigation bar

### 🔧 **Customization**
- Add new subjects dynamically
- Persistent data storage using localStorage
- Clean, responsive design that works on all devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required - runs entirely in the browser!

### Installation
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start logging your classes immediately!

```bash
# Clone the repository
git clone <repository-url>
cd classLog

# Open in browser
open index.html  # macOS
# or
start index.html  # Windows
# or just double-click the index.html file
```

## 📱 How to Use

### Adding a Class Entry
1. **Select Date**: Choose the class date using the date picker
2. **Choose Subject**: Select from existing subjects (WebDev, DSA, Maths) or add new ones
3. **Enter Topic**: Describe what was covered in the class
4. **Mark Status**: Select "Present" or "Absent"
5. **Submit**: Click "Add Entry" to save

### Managing Subjects
- Click the "Add Subject" button to create new subjects
- Subject cards show attendance percentage and risk status
- Visual progress bars provide quick attendance overview

### Understanding the Dashboard
- **Overall Attendance**: Your total attendance percentage across all subjects
- **Academic Risk**: Color-coded status based on the 80% threshold
- **Attendance Trends**: Bar graph showing subject-wise performance
- **Recent Activity**: Detailed table of all logged classes with delete options

## 🏗️ Project Structure

```
classLog/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── js/
│   ├── state.js        # Application state management & localStorage
│   ├── logic.js        # Business logic & calculations
│   ├── render.js       # DOM manipulation & UI updates
│   └── events.js       # User interaction handlers
└── README.md           # This file
```

### Architecture Overview
- **🏛️ State Management**: Centralized state with localStorage persistence
- **🧮 Pure Functions**: Separated business logic for calculations
- **🎨 Rendering**: Dedicated rendering functions for UI updates
- **⚡ Event Handling**: Clean separation of user interactions

## 🎨 Features in Detail

### Attendance Calculation
- Calculates both overall and subject-specific attendance percentages
- Uses a default 80% threshold requirement (customizable)
- Provides real-time updates as you log new classes

### Risk Assessment System
```javascript
// Risk levels based on attendance percentage
Safe: ≥85%        // Green status
Borderline: 80-84% // Yellow status  
Danger: <80%      // Red status
```

### Data Persistence
- All data is automatically saved to your browser's localStorage
- No account creation or server dependency required
- Data persists across browser sessions

## 🔮 Future Enhancements

- [ ] Export attendance data to CSV/PDF
- [ ] Set custom attendance thresholds per subject
- [ ] Attendance goal tracking and notifications
- [ ] Dark mode toggle
- [ ] Mobile app version
- [ ] Cloud sync capabilities

## 🛠️ Development

The application uses vanilla JavaScript with no external dependencies. Key technical features:

- **ES6+ JavaScript**: Modern syntax and features
- **CSS Grid & Flexbox**: Responsive, mobile-first design
- **LocalStorage API**: Client-side data persistence
- **Modular Architecture**: Separated concerns for maintainability

### Running Locally
Simply open `index.html` in any modern browser. No build process or server required!

## 📊 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

**Made with ❤️ for students who want to stay on top of their attendance goals.**