const apiKey = '1f91d0067f744287bf6a28b51ac553e4';

function getWeatherByCity() {
    const city = document.getElementById('city').value;
    if (city) {
        fetchWeatherData(`http://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`);
    }
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weather = data.data[0];
            document.getElementById('location').innerText = `Location: ${weather.city_name}, ${weather.country_code}`;
            document.getElementById('description').innerText = `Weather: ${weather.weather.description}`;
            document.getElementById('temperature').innerText = `Temperature: ${weather.temp}°C`;
            document.getElementById('humidity').innerText = `Humidity: ${weather.rh}%`;
            document.getElementById('wind').innerText = `Wind Speed: ${weather.wind_spd} m/s`;

            // Set weather icon
            const iconElement = document.getElementById('weather-icon');
            const weatherCode = weather.weather.code;

            switch (true) {
                case weatherCode >= 200 && weatherCode < 300:
                    iconElement.className = 'wi wi-thunderstorm';
                    updateBackground('thunderstorm-bg');
                    break;
                case weatherCode >= 300 && weatherCode < 600:
                    iconElement.className = 'wi wi-rain';
                    updateBackground('rainy-bg');
                    break;
                case weatherCode >= 600 && weatherCode < 700:
                    iconElement.className = 'wi wi-snow';
                    updateBackground('snowy-bg');
                    break;
                case weatherCode >= 700 && weatherCode < 800:
                    iconElement.className = 'wi wi-fog';
                    updateBackground('foggy-bg');
                    break;
                case weatherCode === 800:
                    iconElement.className = 'wi wi-day-sunny';
                    updateBackground('sunny-bg');
                    break;
                case weatherCode > 800:
                    iconElement.className = 'wi wi-cloudy';
                    updateBackground('cloudy-bg');
                    break;
                default:
                    iconElement.className = 'wi wi-na';
                    updateBackground('');
            }

            document.getElementById('weather-info').classList.remove('hidden');
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function updateBackground(weatherClass) {
    const body = document.body;
    body.className = ''; // Reset to default
    if (weatherClass) {
        body.classList.add(weatherClass);
    }
}

function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherData(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}`);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Get weather data based on user's location on page load
window.onload = getWeatherByLocation;
