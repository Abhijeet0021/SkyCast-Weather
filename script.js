// --- CONFIGURATION ---
// REPLACE THE STRING BELOW WITH YOUR ACTUAL OPENWEATHERMAP API KEY
const API_KEY = 'bf4558c082a528638457e7b9802adc81';

// --- State Management ---
const state = {
    unit: 'metric', // 'metric' (C) or 'imperial' (F)
    forecastData: [],
    isLoading: false,
    currentCity: 'London',
    savedCities: [],
    cityOffset: 0,
    baseTemp: null,   // Store raw Celsius value
    baseWind: null    // Store raw m/s value
};

// --- DOM Elements ---
const elements = {
    searchForm: document.getElementById('searchForm'),
    cityInput: document.getElementById('cityInput'),
    locationBtn: document.getElementById('locationBtn'),
    cityName: document.getElementById('cityName'),
    dateDisplay: document.getElementById('dateDisplay'),
    weatherIcon: document.getElementById('weatherIcon'),
    tempValue: document.getElementById('tempValue'),
    unitDisplay: document.getElementById('unitDisplay'),
    weatherDesc: document.getElementById('weatherDesc'),
    humidityVal: document.getElementById('humidityVal'),
    windVal: document.getElementById('windVal'),
    pressureVal: document.getElementById('pressureVal'),
    sunVal: document.getElementById('sunVal'),
    forecastContainer: document.getElementById('forecastContainer'),
    savedContainer: document.getElementById('savedContainer'),
    unitToggle: document.getElementById('unitToggle'),
    favBtn: document.getElementById('favBtn'),
    loader: document.getElementById('loader'),
    errorBox: document.getElementById('errorBox'),
    errorMsg: document.getElementById('errorMsg'),
    closeError: document.getElementById('closeError'),
    body: document.body
};

// --- Event Listeners ---
elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = elements.cityInput.value.trim();
    if (city) fetchWeatherByCity(city);
});

elements.locationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        showLoading(true);
        navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
    } else {
        showError("Geolocation is not supported by your browser.");
    }
});

elements.unitToggle.addEventListener('click', () => {
    // Toggle state
    state.unit = state.unit === 'metric' ? 'imperial' : 'metric';
    
    // Update Main UI
    updateUI(true); 
    
    // Update Forecast UI
    renderForecast();
});

elements.favBtn.addEventListener('click', () => {
    if (!state.currentCity) return;
    toggleSavedCity(state.currentCity);
});

elements.closeError.addEventListener('click', () => {
    elements.errorBox.style.display = 'none';
});

// --- Initialization ---
window.addEventListener('load', () => {
    loadSavedCities();
    elements.dateDisplay.textContent = getCurrentDate(0); 
});

// --- Core Logic: Favorites ---

function loadSavedCities() {
    const stored = localStorage.getItem('weatherSavedCities');
    if (stored) {
        state.savedCities = JSON.parse(stored);
        renderSavedCities();
    }
}

function toggleSavedCity(cityName) {
    const index = state.savedCities.indexOf(cityName);
    if (index > -1) {
        state.savedCities.splice(index, 1);
    } else {
        state.savedCities.push(cityName);
    }
    localStorage.setItem('weatherSavedCities', JSON.stringify(state.savedCities));
    renderSavedCities();
    updateFavBtnState();
}

function renderSavedCities() {
    elements.savedContainer.innerHTML = '';
    
    if (state.savedCities.length === 0) {
        elements.savedContainer.innerHTML = '<span style="font-size: 0.8rem; color: var(--text-secondary);">No saved cities.</span>';
        return;
    }

    state.savedCities.forEach(city => {
        const chip = document.createElement('div');
        chip.className = 'saved-chip';
        chip.innerHTML = `<i class="ph ph-map-pin"></i> ${city}`;
        
        chip.addEventListener('click', () => {
            fetchWeatherByCity(city);
        });

        elements.savedContainer.appendChild(chip);
    });
}

function updateFavBtnState() {
    if (state.savedCities.includes(state.currentCity)) {
        elements.favBtn.classList.add('active');
        elements.favBtn.querySelector('i').classList.replace('ph-star', 'ph-star-fill');
    } else {
        elements.favBtn.classList.remove('active');
        elements.favBtn.querySelector('i').classList.replace('ph-star-fill', 'ph-star');
    }
}

// --- Core Logic: Weather ---

function successLocation(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherByCoords(latitude, longitude);
}

function errorLocation(err) {
    showLoading(false);
    let msg = "Unable to retrieve location.";
    if(err.code === 1) msg = "Location access denied. Please enable permissions.";
    showError(msg);
}

// 1. Fetch Coordinates
async function fetchWeatherByCity(city) {
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        showError("Please configure your API Key in script.js");
        return;
    }

    showLoading(true);
    try {
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`;
        
        const response = await fetch(geoUrl);
        const data = await response.json();

        if (!data || data.length === 0) {
            throw new Error('City not found.');
        }

        const { lat, lon, name, country } = data[0];
        fetchWeatherByCoords(lat, lon);

    } catch (error) {
        showError(error.message);
        showLoading(false);
    }
}

// 2. Fetch Weather Data
async function fetchWeatherByCoords(lat, lon) {
    if (API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY') {
        showError("Please configure your API Key in script.js");
        return;
    }

    try {
        // IMPORTANT: Always fetch in metric (Celsius/m/s) to have a base value
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

        const response = await fetch(weatherUrl);
        const data = await response.json();

        if (data.cod !== "200") {
            throw new Error(data.message || "Failed to fetch weather data");
        }

        // Store timezone offset
        state.cityOffset = data.city.timezone;

        const current = data.list[0];
        
        // STORE BASE VALUES (Metric) - This is crucial for unit switching
        state.baseTemp = current.main.temp;
        state.baseWind = current.wind.speed;

        state.forecastData = filterDailyForecast(data.list);

        const weatherInfo = {
            city: data.city.name,
            country: data.city.country,
            temp: state.baseTemp, // Pass raw metric
            humidity: current.main.humidity,
            pressure: current.main.pressure,
            wind: state.baseWind,
            code: current.weather[0].id,
            desc: current.weather[0].description,
            isDay: isDay(data.city.sunrise, data.city.sunset, state.cityOffset),
            sunrise: data.city.sunrise,
            sunset: data.city.sunset
        };

        updateUI(false, weatherInfo);
        renderForecast();
        
    } catch (error) {
        showError(error.message);
    } finally {
        showLoading(false);
    }
}

function filterDailyForecast(list) {
    return list.filter((item, index) => index % 8 === 4);
}

// --- UI Rendering ---

function updateUI(onlyValues = false, data = null) {
    if (!onlyValues && data) {
        state.currentCity = data.city;
        
        elements.cityName.textContent = `${data.city}, ${data.country}`;
        elements.weatherDesc.textContent = data.desc;
        elements.humidityVal.textContent = `${data.humidity}%`;
        elements.pressureVal.textContent = `${data.pressure} hPa`;
        
        // Format times using the city's timezone offset
        elements.sunVal.textContent = `${formatTime(data.sunrise, state.cityOffset)} / ${formatTime(data.sunset, state.cityOffset)}`;
        elements.dateDisplay.textContent = getCurrentDate(state.cityOffset);

        const iconInfo = getIconDescription(data.code);
        elements.weatherIcon.className = iconInfo.icon;
        
        updateBackground(data.code, data.isDay);
        updateFavBtnState();
    }

    // ALWAYS UPDATE NUMERIC VALUES IF BASE DATA EXISTS
    if (state.baseTemp !== null && state.baseWind !== null) {
        let displayTemp = state.baseTemp;
        let displayWind = state.baseWind;
        let tempUnit = '°C';
        let windUnit = 'm/s';

        // If unit is imperial, convert
        if (state.unit === 'imperial') {
            displayTemp = (state.baseTemp * 9/5) + 32;
            displayWind = state.baseWind * 2.237; // m/s to mph
            tempUnit = '°F';
            windUnit = 'mph';
        }

        elements.tempValue.textContent = Math.round(displayTemp);
        elements.windVal.textContent = `${Math.round(displayWind)} ${windUnit}`;
        elements.unitDisplay.textContent = tempUnit;
    }
}

function renderForecast() {
    elements.forecastContainer.innerHTML = '';

    if (!state.forecastData.length) return;

    state.forecastData.forEach(day => {
        // These come from API in metric, so convert if necessary
        let max = day.main.temp_max;
        let min = day.main.temp_min;

        if (state.unit === 'imperial') {
            max = (max * 9/5) + 32;
            min = (min * 9/5) + 32;
        }

        const code = day.weather[0].id;
        
        const dateObj = new Date(day.dt * 1000 + (state.cityOffset * 1000));
        const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' });
        const dayNum = dateObj.getUTCDate(); 
        
        const iconInfo = getIconDescription(code);

        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <span class="f-day">${dayName}</span>
            <span class="f-date">${dayNum}</span>
            <i class="ph ${iconInfo.icon} f-icon"></i>
            <div class="f-temps">
                <span>${Math.round(max)}°</span>
                <span class="f-min">${Math.round(min)}°</span>
            </div>
        `;
        elements.forecastContainer.appendChild(card);
    });
}

// --- Helper Functions ---

function showLoading(show) {
    elements.loader.style.display = show ? 'flex' : 'none';
}

function showError(msg) {
    elements.errorMsg.textContent = msg;
    elements.errorBox.style.display = 'flex';
}

function getCurrentDate(offsetSeconds) {
    const now = new Date(Date.now() + offsetSeconds * 1000);
    
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
    };
    return now.toLocaleDateString('en-US', options);
}

function formatTime(timestamp, offsetSeconds) {
    const date = new Date(timestamp * 1000 + offsetSeconds * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const h12 = hours % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
}

function isDay(sunriseTs, sunsetTs, offsetSeconds) {
    const nowCityTime = Math.floor((Date.now() + offsetSeconds * 1000) / 1000);
    return nowCityTime > sunriseTs && nowCityTime < sunsetTs;
}

function updateBackground(code, isDay) {
    let bgUrl = '';

    if (!isDay) {
        bgUrl = 'https://images.unsplash.com/photo-1483347752413-3c6228756b8f?auto=format&fit=crop&w=1080&q=80';
    } else if (code >= 200 && code < 600) { 
        bgUrl = 'https://images.unsplash.com/photo-1594034865965-0324607c2b20?auto=format&fit=crop&w=1080&q=80';
    } else if (code >= 600 && code < 700) { 
        bgUrl = 'https://images.unsplash.com/photo-1491002052546-bf38f186af56?auto=format&fit=crop&w=1080&q=80';
    } else if (code >= 700 && code < 800) { 
        bgUrl = 'https://images.unsplash.com/photo-1483347752413-3c6228756b8f?auto=format&fit=crop&w=1080&q=80';
    } else if (code === 800) { 
        bgUrl = 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1080&q=80';
    } else { 
        bgUrl = 'https://images.unsplash.com/photo-1579054095436-83cd923908cb?auto=format&fit=crop&w=1080&q=80';
    }

    elements.body.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)),
        url('${bgUrl}')
    `;
}

function getIconDescription(code) {
    if (code >= 200 && code < 300) return { icon: 'ph-cloud-lightning' }; 
    if (code >= 300 && code < 400) return { icon: 'ph-cloud-drizzle' }; 
    if (code >= 500 && code < 600) return { icon: 'ph-cloud-rain' }; 
    if (code >= 600 && code < 700) return { icon: 'ph-snowflake' }; 
    if (code >= 700 && code < 800) return { icon: 'ph-cloud-fog' }; 
    if (code === 800) return { icon: 'ph-sun' }; 
    if (code > 800) return { icon: 'ph-cloud' }; 
    return { icon: 'ph-question' };
}