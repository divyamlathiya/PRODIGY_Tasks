// OpenWeatherMap API key, used for making requests to the weather service
const apiKey = '20da423906ccf27bec8c2d81c8f4a2eb'; 

// Function to fetch weather information based on the city name entered by the user
function getWeatherByCity() {
    // Retrieve the city name entered by the user from the input field with id 'city'
    const city = document.getElementById('city').value;

    // If the user has not entered a city, show an alert message
    if (!city) {
        alert('Please enter a city name!'); 
        return; // Exit the function if no city is provided
    }

    // Construct the URL for the API request, including the city name and the API key.
    // The units=metric ensures the temperature is returned in Celsius.
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    // Make an API request to fetch the weather data for the entered city
    fetch(url)
        .then(response => response.json()) // Parse the response into a JavaScript object
        .then(data => {
            displayWeather(data); // Pass the weather data to the displayWeather function if successful
        })
        .catch(error => {
            // In case of an error (e.g., network issues, invalid API response), display an alert
            alert('Could not fetch weather data. Please try again.');
            console.error(error); // Log the error for debugging purposes
        });
}

// Function to display the fetched weather data on the webpage
function displayWeather(data) {
    // If the API returns a "City not found" error (status code 404), alert the user
    if (data.cod === "404") {
        alert('City not found!');
        return; // Exit the function if the city is not found
    }

    // Retrieve HTML elements where the weather data will be displayed
    const location = document.getElementById('location');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    // Update the HTML elements with the actual weather data
    location.textContent = `${data.name}, ${data.sys.country}`; // Display city name and country code
    temperature.textContent = `Temperature: ${data.main.temp}°C`; // Display temperature in Celsius
    conditions.textContent = `Conditions: ${data.weather[0].description}`; // Display weather conditions (e.g., sunny, cloudy)
    humidity.textContent = `Humidity: ${data.main.humidity}%`; // Display humidity percentage
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`; // Display wind speed in meters per second
}

// Function to fetch weather data based on the user's current location (using geolocation)
function getWeatherByLocation() {
    // Check if the user's browser supports the Geolocation API
    if (navigator.geolocation) {
        // If supported, get the user's current geographic position (latitude and longitude)
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude; // Latitude of the user's current location
            const lon = position.coords.longitude; // Longitude of the user's current location

            // Construct the URL for the weather API request, using the latitude and longitude of the user
            // The units=metric ensures the temperature is returned in Celsius.
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            // Make the API request to fetch the weather data for the user's location
            fetch(url)
                .then(response => response.json()) // Parse the response into a JavaScript object
                .then(data => {
                    displayWeather(data); // Pass the weather data to displayWeather if the request is successful
                })
                .catch(error => {
                    // Handle any errors during the API request (e.g., network issues)
                    alert('Could not fetch weather data. Please try again.');
                    console.error(error); // Log the error to the console for debugging purposes
                });
        }, error => {
            // Handle geolocation permission denial or errors in fetching location
            if (error.code === error.PERMISSION_DENIED) {
                alert('Geolocation permission denied.'); // Alert if the user denies permission
            } else {
                alert('Failed to get geolocation.'); // Alert if there's a different issue in fetching the geolocation
            }
        });
    } else {
        // If the user's browser does not support geolocation, display an alert
        alert('Geolocation is not supported by this browser.');
    }
}

// Automatically call the getWeatherByLocation function when the webpage loads
// This fetches the weather data based on the user's current location by default
window.onload = getWeatherByLocation;
