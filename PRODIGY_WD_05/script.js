const apiKey = '20da423906ccf27bec8c2d81c8f4a2eb'; // OpenWeatherMap API key

// Get weather by city
function getWeatherByCity() {
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name!'); // Alert if city input is empty
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert('City not found!'); // Alert if city is not found
                return;
            }
            displayWeather(data); // Display weather data if request is successful
        })
        .catch(error => {
            alert('Could not fetch weather data. Please try again.'); // Handle any errors during fetch
            console.error('Error fetching weather data:', error);
        });
}

// Display weather information
function displayWeather(data) {
    // Check if weather data is available
    if (!data || !data.main || !data.weather || !data.wind) {
        alert('Error displaying weather data.'); 
        return;
    }

    // Update UI with fetched weather data
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const icon = document.getElementById('weather-icon');

    location.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    conditions.textContent = `Conditions: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    // Optional: Show an icon representing the weather condition
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    icon.src = iconUrl; // Set weather icon based on response
    icon.alt = data.weather[0].description; // Add alt text for accessibility
}

// Get weather based on user's location (via geolocation API)
function getWeatherByLocation() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show a loading indicator

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data); // Display weather for user's location
                    loader.style.display = 'none'; // Hide loading indicator
                })
                .catch(error => {
                    loader.style.display = 'none'; // Hide loading indicator
                    alert('Could not fetch weather data. Please try again.');
                    console.error('Error fetching weather data:', error);
                });
        }, error => {
            loader.style.display = 'none'; // Hide loading indicator
            // Handle the case when the user denies geolocation
            if (error.code === error.PERMISSION_DENIED) {
                alert('Geolocation permission denied.');
            } else {
                alert('Failed to get geolocation.');
            }
        });
    } else {
        loader.style.display = 'none'; // Hide loading indicator
        alert('Geolocation is not supported by this browser.');
    }
}

// Get weather on page load by location
window.onload = function () {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // Show loading indicator when page loads
    getWeatherByLocation();
}

// Add event listener to allow searching by city name
document.getElementById('search-btn').addEventListener('click', function() {
    const cityInput = document.getElementById('city').value;
    if (cityInput) {
        getWeatherByCity(); // Get weather by city name when search button is clicked
    }
});
