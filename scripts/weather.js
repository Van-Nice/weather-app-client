import { kelvinToFahrenheit, kelvinToCelsius, capitalizeFirstLetterOfEachWord } from './unitConversions.js';
import { updateHourly } from './updateHourly.js';
import { updateWeekly } from './updateWeekly.js';
import { updateCurrent } from './updateCurrent.js';

const weatherCodeToImageMap = {
    // Thunderstorms - typically use both day and night images
    200: "/client/public/weather-both/thunder-storm-both.png",
    201: "/client/public/weather-both/thunder-storm-both.png",
    202: "/client/public/weather-both/thunder-storm-both.png",
    210: "/client/public/weather-both/thunder-storm-both.png",
    211: "/client/public/weather-both/thunder-storm-both.png",
    212: "/client/public/weather-both/thunder-storm-both.png",
    221: "/client/public/weather-both/thunder-storm-both.png",
    230: "/client/public/weather-both/thunder-storm-both.png",
    231: "/client/public/weather-both/thunder-storm-both.png",
    232: "/client/public/weather-both/thunder-storm-both.png",
  
    // Drizzle - typically use both day and night images
    300: "/client/public/weather-both/showers-both.png",
    301: "/client/public/weather-both/showers-both.png",
    302: "/client/public/weather-both/showers-both.png",
    310: "/client/public/weather-both/showers-both.png",
    311: "/client/public/weather-both/showers-both.png",
    312: "/client/public/weather-both/showers-both.png",
    313: "/client/public/weather-both/showers-both.png",
    314: "/client/public/weather-both/showers-both.png",
    321: "/client/public/weather-both/showers-both.png",
  
    // Rain - typically use both day and night images
    500: "/client/public/weather-both/rain-both.png",
    501: "/client/public/weather-both/rain-both.png",
    502: "/client/public/weather-both/rain-both.png",
    503: "/client/public/weather-both/rain-both.png",
    504: "/client/public/weather-both/rain-both.png",
    511: "/client/public/weather-both/freezing-rain-both.png",
    520: "/client/public/weather-both/showers-both.png",
    521: "/client/public/weather-both/showers-both.png",
    522: "/client/public/weather-both/showers-both.png",
    531: "/client/public/weather-both/showers-both.png",
  
    // Snow - typically use both day and night images
    600: "/client/public/weather-both/snow-both.png",
    601: "/client/public/weather-both/snow-both.png",
    602: "/client/public/weather-both/snow-both.png",
    611: "/client/public/weather-both/sleet-both.png",
    612: "/client/public/weather-both/sleet-both.png",
    613: "/client/public/weather-both/sleet-both.png",
    615: "/client/public/weather-both/rain-and-snow-both.png",
    616: "/client/public/weather-both/rain-and-snow-both.png",
    620: "/client/public/weather-both/snow-both.png",
    621: "/client/public/weather-both/snow-both.png",
    622: "/client/public/weather-both/snow-both.png",
  
    // Atmosphere - typically use both day and night images
    701: "/client/public/weather-both/fog-both.png",
    711: "/client/public/weather-both/smoke-both.png",
    721: "/client/public/weather-both/haze-both.png",
    731: "/client/public/weather-both/dust-both.png",
    741: "/client/public/weather-both/fog-both.png",
    751: "/client/public/weather-both/sand-both.png",
    761: "/client/public/weather-both/dust-both.png",
    762: "/client/public/weather-both/ash-both.png",
    771: "/client/public/weather-both/windy-both.png",

    // Clear - use night or day images
    800: ["/client/public/weather-day/sun-day.png", "/client/public/weather-night/clear-night.png"],

    // Clouds
    801: ["/client/public/weather-day/mostly-sunny-day.png", "/client/public/weather-night/mostly-clear-night.png"],
    802: ["/client/public/weather-day/partly-sunny-day.png", "/client/public/weather-night/partly-cloudy-night.png"],
    803: ["/client/public/weather-day/intermitten-clouds-day.png", "/client/public/weather-night/intermitten-clouds-night.png"],
    804: ["/client/public/weather-day/mostly-cloudy-day.png", "/client/public/weather-night/mostly-cloudy-night.png"],
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