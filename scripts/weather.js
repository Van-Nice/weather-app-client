import { kelvinToFahrenheit, kelvinToCelsius, capitalizeFirstLetterOfEachWord } from './unitConversions.js';
import { updateHourly } from './updateHourly.js';
import { updateWeekly } from './updateWeekly.js';
import { updateCurrent } from './updateCurrent.js';

const weatherCodeToImageMap = {
    // Thunderstorms - typically use both day and night images
    200: "../public/weather-both/thunder-storm-both.png",
    201: "../public/weather-both/thunder-storm-both.png",
    202: "../public/weather-both/thunder-storm-both.png",
    210: "../public/weather-both/thunder-storm-both.png",
    211: "../public/weather-both/thunder-storm-both.png",
    212: "../public/weather-both/thunder-storm-both.png",
    221: "../public/weather-both/thunder-storm-both.png",
    230: "../public/weather-both/thunder-storm-both.png",
    231: "../public/weather-both/thunder-storm-both.png",
    232: "../public/weather-both/thunder-storm-both.png",

    // Drizzle - typically use both day and night images
    300: "../public/weather-both/showers-both.png",
    301: "../public/weather-both/showers-both.png",
    302: "../public/weather-both/showers-both.png",
    310: "../public/weather-both/showers-both.png",
    311: "../public/weather-both/showers-both.png",
    312: "../public/weather-both/showers-both.png",
    313: "../public/weather-both/showers-both.png",
    314: "../public/weather-both/showers-both.png",
    321: "../public/weather-both/showers-both.png",

    // Rain - typically use both day and night images
    500: "../public/weather-both/rain-both.png",
    501: "../public/weather-both/rain-both.png",
    502: "../public/weather-both/rain-both.png",
    503: "../public/weather-both/rain-both.png",
    504: "../public/weather-both/rain-both.png",
    511: "../public/weather-both/freezing-rain-both.png",
    520: "../public/weather-both/showers-both.png",
    521: "../public/weather-both/showers-both.png",
    522: "../public/weather-both/showers-both.png",
    531: "../public/weather-both/showers-both.png",

    // Snow - typically use both day and night images
    600: "../public/weather-both/snow-both.png",
    601: "../public/weather-both/snow-both.png",
    602: "../public/weather-both/snow-both.png",
    611: "../public/weather-both/sleet-both.png",
    612: "../public/weather-both/sleet-both.png",
    613: "../public/weather-both/sleet-both.png",
    615: "../public/weather-both/rain-and-snow-both.png",
    616: "../public/weather-both/rain-and-snow-both.png",
    620: "../public/weather-both/snow-both.png",
    621: "../public/weather-both/snow-both.png",
    622: "../public/weather-both/snow-both.png",

    // Atmosphere - typically use both day and night images
    701: "../public/weather-both/fog-both.png",
    711: "../public/weather-both/smoke-both.png",
    721: "../public/weather-both/haze-both.png",
    731: "../public/weather-both/dust-both.png",
    741: "../public/weather-both/fog-both.png",
    751: "../public/weather-both/sand-both.png",
    761: "../public/weather-both/dust-both.png",
    762: "../public/weather-both/ash-both.png",
    771: "../public/weather-both/windy-both.png",

    // Clear - use night or day images
    800: ["../public/weather-day/sun-day.png", "../public/weather-night/clear-night.png"],

    // Clouds
    801: ["../public/weather-day/mostly-sunny-day.png", "../public/weather-night/mostly-clear-night.png"],
    802: ["../public/weather-day/partly-sunny-day.png", "../public/weather-night/partly-cloudy-night.png"],
    803: ["../public/weather-day/intermitten-clouds-day.png", "../public/weather-night/intermitten-clouds-night.png"],
    804: ["../public/weather-day/mostly-cloudy-day.png", "../public/weather-night/mostly-cloudy-night.png"]
  };

// TODO: create a boolean function for weather it's day, night or in between

export function updateWeather(weatherData, userInput) {
    
    // Current
    updateCurrent(weatherData, weatherCodeToImageMap, userInput);

    // Hourly
    updateHourly(weatherData, weatherCodeToImageMap);

    // Weekly
    updateWeekly(weatherData, weatherCodeToImageMap);
};