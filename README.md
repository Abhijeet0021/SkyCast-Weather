<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SkyCast - Weather App</title>

<style>
    body {
        margin: 0;
        font-family: 'Segoe UI', Arial, sans-serif;
        background: linear-gradient(135deg, #1e3c72, #2a5298);
        color: #fff;
        display: flex;
        justify-content: center;
        padding: 40px 20px;
    }

    .container {
        max-width: 900px;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(15px);
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.4);
    }

    h1 {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 10px;
    }

    h2 {
        margin-top: 35px;
        border-left: 5px solid #ffd700;
        padding-left: 10px;
    }

    p {
        line-height: 1.6;
        font-size: 1rem;
    }

    ul {
        padding-left: 20px;
    }

    li {
        margin: 8px 0;
    }

    .badge {
        display: inline-block;
        background: #ffd700;
        color: #000;
        padding: 5px 12px;
        border-radius: 20px;
        font-size: 0.8rem;
        margin: 5px 5px 5px 0;
        font-weight: 600;
    }

    .tech-stack span {
        background: rgba(255,255,255,0.2);
        padding: 8px 15px;
        border-radius: 20px;
        margin: 5px;
        display: inline-block;
        font-size: 0.9rem;
    }

    .footer {
        text-align: center;
        margin-top: 40px;
        font-size: 0.9rem;
        opacity: 0.8;
    }

    hr {
        border: none;
        height: 1px;
        background: rgba(255,255,255,0.3);
        margin: 30px 0;
    }

    @media(max-width: 600px){
        .container {
            padding: 20px;
        }
        h1 {
            font-size: 1.8rem;
        }
    }
</style>
</head>

<body>

<div class="container">

    <h1>🌤️ SkyCast – Weather Forecast Web App</h1>

    <div style="text-align:center;">
        <span class="badge">JavaScript</span>
        <span class="badge">API Integration</span>
        <span class="badge">Responsive Design</span>
        <span class="badge">Glassmorphism UI</span>
    </div>

    <hr>

    <p>
        SkyCast is a responsive weather forecasting web application built using 
        <strong>HTML, CSS, and Vanilla JavaScript</strong>. It integrates with a 
        Weather REST API to provide real-time updates, a 5-day forecast, 
        geolocation-based detection, temperature unit conversion (°C/°F), 
        and favorite city management using localStorage.
    </p>

    <h2>🚀 Features</h2>
    <ul>
        <li>🌍 Search weather by city name</li>
        <li>📍 Current location weather detection</li>
        <li>🌡️ Temperature toggle (°C / °F)</li>
        <li>📅 5-Day weather forecast</li>
        <li>⭐ Save favorite cities</li>
        <li>🎨 Modern glassmorphism UI</li>
        <li>📱 Fully responsive layout</li>
        <li>⏳ Loading & error state handling</li>
    </ul>

    <h2>🛠️ Tech Stack</h2>
    <div class="tech-stack">
        <span>HTML5</span>
        <span>CSS3</span>
        <span>JavaScript (ES6+)</span>
        <span>Fetch API</span>
        <span>LocalStorage</span>
        <span>Geolocation API</span>
    </div>

    <h2>🔄 Application Flow</h2>
    <ol>
        <li>Application loads with a default city.</li>
        <li>User searches a city or uses current location.</li>
        <li>Weather API request is sent using fetch().</li>
        <li>JSON response is processed dynamically.</li>
        <li>UI updates without page reload.</li>
        <li>User can toggle units or save cities.</li>
    </ol>

    <hr>

    <div class="footer">
        👨‍💻 Developed by <strong>Abhijeet Kumar</strong> <br>
        B.Tech Student | Frontend Developer
    </div>

</div>

</body>
</html>
