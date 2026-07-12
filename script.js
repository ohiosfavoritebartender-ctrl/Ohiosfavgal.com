// OpenWeatherMap API Key
const API_KEY = 'b6fd43b68440af8bf7d8627e6871c21c'; // Free tier API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

let savedCities = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadSavedCities();
    setupEventListeners();
    // Load default city on start
    fetchWeather('London');
});

// Setup event listeners
function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const geoBtn = document.getElementById('geoBtn');

    searchBtn.addEventListener('click', () => {
        const city = searchInput.value.trim();
        if (city) {
            fetchWeather(city);
            searchInput.value = '';
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const city = searchInput.value.trim();
            if (city) {
                fetchWeather(city);
                searchInput.value = '';
            }
        }
    });

    geoBtn.addEventListener('click', getGeolocation);
}

// Get user's geolocation
function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (error) => {
                showError('Unable to get your location. Please search manually.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        showLoading();
        const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('Weather data not found');
        const data = await response.json();
        displayWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
        addToSavedCities(data.name);
    } catch (error) {
        showError(error.message);
    }
}

// Fetch weather by city name
async function fetchWeather(city) {
    try {
        showLoading();
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error(`City "${city}" not found`);
        const data = await response.json();
        displayWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
        addToSavedCities(data.name);
    } catch (error) {
        showError(error.message);
    }
}

// Fetch 5-day forecast
async function fetchForecast(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('Forecast data not found');
        const data = await response.json();
        displayForecast(data.list);
    } catch (error) {
        console.error('Forecast error:', error);
    }
}

// Display current weather
function displayWeather(data) {
    const {
        name,
        main: { temp, feels_like, humidity, pressure },
        weather: [{ main, description, icon }],
        wind: { speed },
        visibility,
        sys: { country },
        clouds: { all: cloudiness }
    } = data;

    const cityName = `${name}, ${country}`;
    const date = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    document.getElementById('cityName').textContent = cityName;
    document.getElementById('date').textContent = date;
    document.getElementById('temperature').textContent = `${Math.round(temp)}°C`;
    document.getElementById('description').textContent = description;
    document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${icon}@4x.png`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${speed} m/s`;
    document.getElementById('visibility').textContent = `${(visibility / 1000).toFixed(1)} km`;
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    document.getElementById('feelsLike').textContent = `${Math.round(feels_like)}°C`;
    document.getElementById('uvIndex').textContent = `${cloudiness}%`;

    hideLoading();
}

// Display 5-day forecast
function displayForecast(list) {
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';

    // Get forecast for every 8th item (every 24 hours)
    const dailyForecasts = [];
    for (let i = 0; i < list.length; i += 8) {
        dailyForecasts.push(list[i]);
    }

    dailyForecasts.forEach(forecast => {
        const {
            dt,
            main: { temp_max, temp_min },
            weather: [{ icon, description }]
        } = forecast;

        const date = new Date(dt * 1000).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });

        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card';
        forecastCard.innerHTML = `
            <div class="date">${date}</div>
            <img class="forecast-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon">
            <div class="temp-range">${Math.round(temp_max)}° / ${Math.round(temp_min)}°</div>
            <div class="description">${description}</div>
        `;
        forecastContainer.appendChild(forecastCard);
    });

    document.getElementById('forecastSection').style.display = 'block';
}

// Add city to saved list
function addToSavedCities(city) {
    if (!savedCities.includes(city)) {
        savedCities.push(city);
        saveCities();
        updateSavedCitiesList();
    }
}

// Remove city from saved list
function removeFromSavedCities(city) {
    savedCities = savedCities.filter(c => c !== city);
    saveCities();
    updateSavedCitiesList();
}

// Update saved cities display
function updateSavedCitiesList() {
    const citiesList = document.getElementById('citiesList');
    citiesList.innerHTML = '';

    if (savedCities.length === 0) {
        document.getElementById('savedCities').style.display = 'none';
        return;
    }

    document.getElementById('savedCities').style.display = 'block';

    savedCities.forEach(city => {
        const cityCard = document.createElement('div');
        cityCard.className = 'city-card';
        cityCard.innerHTML = `
            <div class="city-name">${city}</div>
            <button class="remove-btn" onclick="removeFromSavedCities('${city}')">×</button>
        `;
        cityCard.addEventListener('click', (e) => {
            if (e.target.closest('.remove-btn')) return;
            fetchWeather(city);
        });
        citiesList.appendChild(cityCard);
    });
}

// Local storage functions
function saveCities() {
    localStorage.setItem('savedCities', JSON.stringify(savedCities));
}

function loadSavedCities() {
    const saved = localStorage.getItem('savedCities');
    if (saved) {
        savedCities = JSON.parse(saved);
        updateSavedCitiesList();
    }
}

// UI helper functions
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('weatherContent').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'block';
    document.getElementById('errorMessage').style.display = 'none';
}

function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('weatherContent').style.display = 'none';
    const errorElement = document.getElementById('errorMessage');
    errorElement.textContent = `Error: ${message}`;
    errorElement.style.display = 'block';
}