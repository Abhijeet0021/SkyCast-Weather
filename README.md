🌤️ SkyCast – Weather Forecast Web App
SkyCast is a responsive weather forecasting web application built using HTML, CSS, and Vanilla JavaScript.It integrates with a Weather REST API to provide real-time weather updates, a 5-day forecast, geolocation-based detection, temperature unit conversion (°C/°F), and favorite city management using localStorage.

  🚀 Features
🌍 Search weather by city name
📍 Detect weather using current location (Geolocation API)
🌡️ Toggle temperature units (°C / °F)
📅 5-Day forecast display
⭐ Save favorite cities (stored in localStorage)
🎨 Glassmorphism UI with smooth animations
⏳ Loading and error state handling
📱 Fully responsive design

🛠️ Tech Stack
* HTML5 – Structure
* CSS3 – Styling & Animations
* JavaScript (ES6+) – Application Logic
* Fetch API – API Integration
* LocalStorage – Persistent Favorites
* Geolocation API – Location Detection

📂 Project Structure
SkyCast/
│
├── index.html      # Main UI structure
├── styles.css      # Styling & animations
├── script.js       # Core application logic
└── README.md       # Project documentation

🔄 Application Flow
1 Application loads with a default city.
2 User searches a city or uses current location.
3 App sends request to Weather API using fetch().
4 API returns JSON data.
5 JavaScript processes data and updates the DOM dynamically.
6 User can toggle units or save city without page reload.

📸 Screenshots
<img width="554" height="638" alt="Screenshot 2026-03-02 at 8 55 14 PM" src="https://github.com/user-attachments/assets/d3e723ae-283a-4101-b39c-8ff9eba7e4f8" />

🎯 Future Improvements
1 Add hourly forecast
2 Add weather maps integration
3 Dark/Light mode toggle
4 Backend integration for user accounts

