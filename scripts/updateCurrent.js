import { kelvinToFahrenheit, kelvinToCelsius, capitalizeFirstLetterOfEachWord } from './unitConversions.js';

export function updateCurrent(weatherData, weatherCodeToImageMap, userInput) {
    const current = weatherData.current;
    const temperature = kelvinToFahrenheit(current.temp);
    const description = capitalizeFirstLetterOfEachWord(current.weather[0].description);
    const time = current.dt;
    const sunrise = current.sunrise;
    const sunset = current.sunset;
    const id = current.weather[0].id;
    let image = weatherCodeToImageMap[id];
    if (typeof image !== 'string' && time > sunrise && time < sunset) {
        image = image[0];
    } else {
        image = image[1];
    }
    const location = userInput.split(',');

    // Get the town from userInput 
    // There's two possible scenarios for the userInput
    // 1. A string from a verified google address
    // 2. Your location
    // For your location set userInput to false
    let currentHTML = `
        <div class="current-left body-text">
          <div class="current-place">${location[0]}</div>
          <div class="current-temp">${temperature}&deg</div>
          <div class="current-description">${description}</div>
        </div>
    `;

    const currentForecastDiv = document.querySelector('.current-body');
    currentForecastDiv.innerHTML = currentHTML
}