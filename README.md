<!DOCTYPE html>
<html>
<head>
    <title>SkyCast - Weather Forecast App</title>
</head>
<body>

    <h1>🌤️ SkyCast – Weather Forecast Web App</h1>

    <p>
        SkyCast is a responsive weather forecasting web application built using 
        <strong>HTML, CSS, and Vanilla JavaScript</strong>. 
        It integrates with a Weather REST API to provide real-time weather updates, 
        a 5-day forecast, geolocation-based detection, temperature unit conversion (°C/°F), 
        and favorite city management using localStorage.
    </p>

    <hr>

    <h2>🚀 Features</h2>
    <ul>
        <li>🌍 Search weather by city name</li>
        <li>📍 Current location weather detection</li>
        <li>🌡️ Toggle temperature (°C / °F)</li>
        <li>📅 5-Day weather forecast</li>
        <li>⭐ Save favorite cities</li>
        <li>🎨 Glassmorphism UI design</li>
        <li>📱 Fully responsive layout</li>
        <li>⏳ Loading and error handling</li>
    </ul>

    <hr>

    <h2>🛠️ Tech Stack</h2>
    <ul>
        <li><strong>HTML5</strong> – Structure</li>
        <li><strong>CSS3</strong> – Styling & Animations</li>
        <li><strong>JavaScript (ES6+)</strong> – Application Logic</li>
        <li><strong>Fetch API</strong> – API Integration</li>
        <li><strong>LocalStorage</strong> – Favorites Storage</li>
        <li><strong>Geolocation API</strong> – Location Detection</li>
    </ul>

    <hr>

    <h2>📂 Project Structure</h2>
    <pre>
SkyCast/
│
├── index.html
├── styles.css
├── script.js
└── README.md
    </pre>

    <hr>

    <h2>🔄 Application Flow</h2>
    <ol>
        <li>Application loads with a default city.</li>
        <li>User searches a city or uses current location.</li>
        <li>Weather API request is sent using fetch().</li>
        <li>JSON response is received and processed.</li>
        <li>UI updates dynamically without page reload.</li>
        <li>User can save city or toggle temperature unit.</li>
    </ol>

    <hr>

    <h2>👨‍💻 Author</h2>
    <p>
        <strong>Abhijeet Kumar</strong><br>
        B.Tech Student | Frontend Developer
    </p>

</body>
</html>
