import { updateWeather } from './weather.js';
import { getIp } from './getIp.js';
import { updateTime } from './timeDate.js';
import { updateCurrent } from './updateCurrent.js';
// https://weather-app-server-staging-e194f8aa2d04.herokuapp.com/
// This is unsecure fix at some point!!!
const API_BASE_URL = 'https://weather-app-server-staging-e194f8aa2d04.herokuapp.com';

async function startWeather(latitude, longitude) {
    try {
        const response = await fetch(`${API_BASE_URL}/start-weather-data?coords=${latitude},${longitude}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.error('An error occurred:', error); // This is getting called!!!
        throw error; // re-throw the error if you want it to propagate
    }
}

// Create get ip function
async function getIp() {
    try {
        const response = await fetch(`${API_BASE_URL}/get-ip`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('An error occurred:', error);
        throw error; // re-throw the error if you want it to propagate
    }
}

async function ipWeather(ip) {
    try {
        const response = await fetch(`${API_BASE_URL}/ip-weather-data?ip=${ip}`, {
            credentials: 'include'
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const weatherData = await response.json();
        return weatherData;
    } catch (error) {
        console.error('An error occurred:', error); // This error is getting thrown!!!
        throw error; // re-throw the error if you want it to propagate
    }
}

// Ask for location, if not get ip
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const weatherData = await startWeather(latitude, longitude); // Fixed this error
            console.log(weatherData);
            updateWeather(weatherData, 'Your Location');
            updateTime(weatherData);
        },
        async function(error) {
            // This function is called when an error occurs, such as when the user denies the location permission
            console.log("Geolocation permission denied.");
            try {
                const ip = await getIp();
                const weatherData = await ipWeather(ip);
                console.log(ip, weatherData);
                updateWeather(weatherData, 'Your Location');
                updateTime(weatherData);
            } catch (error) {
                console.error('Error:', error); // This error is getting thrown
            }
        }
    );
} else {
    console.log("Geolocation is not supported by this browser.");
    (async () => {
        try {
            const ip = await getIp();
            const weatherData = await ipWeather(ip);
            console.log(ip, weatherData);
            updateWeather(weatherData, 'Your Location');
            updateTime(weatherData);
        } catch (error) {
            console.error('Error:', error);
        }
    })();
}

// Get the form
const searchForm = document.getElementById('search-form');

// Get the search bar
const searchBar = document.getElementById('location-search');

// Create a dropdown for suggestions
const dropdown = document.createElement('div');
dropdown.setAttribute('id', 'dropdown');
searchBar.parentNode.appendChild(dropdown);

// Stop user from enter invalid address in search bar
searchBar.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
});

// Add event listener
searchBar.addEventListener('input', async function(event) {
    const userInput = event.target.value;

    if (userInput.length > 2) { // Trigger autocomplete after 2 char
        try {
            const response = await fetch(`${API_BASE_URL}/search-locations?input=${encodeURIComponent(userInput)}`, {
                credentials: 'include'
            });
            const data = await response.json();
            dropdown.innerHTML = ''; // Clear previous suggestions

            data.predictions.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = item.description;
                div.onclick = function() {
                    searchBar.value = item.description;
                    dropdown.innerHTML = ''; // Clear suggestions after selection

                    // Trigger form submission event manually
                    const event = new Event('submit');
                    searchForm.dispatchEvent(event);
                };
                dropdown.appendChild(div);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

searchForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    // Get the user input from the search bar
    const userSubmission = searchBar.value;
    console.log('Form was submitted')
    try {
        // Clear the search bar
        searchBar.value = '';

        // Send a request to the server with the user input
        const response = await fetch(`${API_BASE_URL}/weather-data?input=${encodeURIComponent(userSubmission)}`, {
            credentials: 'include'
        });
        const weatherData = await response.json();
        
        // Handle the response data here
        updateWeather(weatherData, userSubmission);
        updateTime(weatherData);
    } catch (error) {
        console.error('Error:', error);
    }

});
