import { kelvinToFahrenheit, kelvinToCelsius, capitalizeFirstLetterOfEachWord } from './unitConversions.js';

export function updateHourly(weatherData, weatherCodeToImageMap) {
  const hourly = weatherData.hourly;
  const daily = weatherData.daily;
  const current = weatherData.current;
  // Get the time of sunset and sun rise for both the current and next day
  const todayDaily = daily[0];
  const tomorrowDaily = daily[1];
  const firstSunrise = todayDaily.sunrise;
  const firstSunset = todayDaily.sunset;
  const secondSunrise = tomorrowDaily.sunrise;
  const secondSunset = tomorrowDaily.sunset;
  const timezone = weatherData.timezone;

  let riseSet = [secondSunset, secondSunrise, firstSunset, firstSunrise];

  let hourlyHTML = '';

  hourly.forEach((forecast, index) => {
      // Check to see if the current time is before for after first sunrise
      if (index === 0 && forecast.dt >= firstSunrise) {
        riseSet.pop();
      }

      // Convert temperatures
      const temperature = kelvinToFahrenheit(forecast.temp);
      const feelsLike = kelvinToFahrenheit(forecast.feels_like);

      // Get weather array
      const weatherArray = forecast.weather[0]

      // Get the weather description and code 
      const weatherCode = weatherArray.id;
      let image = weatherCodeToImageMap[weatherCode];
      if (typeof image !== "string" && (riseSet.length%2 === 0)) {
        image = image[1];
      } else if (typeof image !== "string" && (riseSet.length%2 !== 0)) {
        image = image[0];
      }

      const description = capitalizeFirstLetterOfEachWord(weatherArray.description);

      // Get other weather data
      const windSpeed = forecast.wind_speed;
      const windDegrees = forecast.wind_deg;
      const uvi = forecast.uvi;

      const hourOptions = {
        hour: 'numeric',
        timeZone: timezone,
      }

      // Append to hourlyHTML string
      hourlyHTML += `
      <div class="scroll-hour title-text">
        <h2 class="title-text">${new Date(forecast.dt * 1000).toLocaleTimeString('en-US', hourOptions)}</h2>
        <img src="${image}" alt="Weather icon">
        <p>${kelvinToFahrenheit(forecast.temp)}°F</p>
      </div>`;
      
      const currentSetRiseUnix = riseSet[riseSet.length - 1];
      const currentSetRiseHour = new Date(currentSetRiseUnix * 1000)
      const currentForecastHour = new Date(forecast.dt * 1000);

      const riseSetOptions = {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: timezone,
      }

      // Check for sunrise or sunset
      if (currentSetRiseHour.getUTCHours() === currentForecastHour.getUTCHours()) {
        // Insert if true
        hourlyHTML += `
          <div class="scroll-hour title-text-setrise">
            <h2 class="title-text">${new Date(currentSetRiseUnix * 1000).toLocaleTimeString('en-US', riseSetOptions)}</h2>
            <img src="${(riseSet.length%2 === 0) ? "../public/weather-day/sun-day.png" : "../public/weather-night/clear-night.png"}" alt="Weather icon">
            <p>${(riseSet.length%2 === 0) ? "Sunrise" : "Sunset"}</p>
          </div>
        `;
        riseSet.pop()
      }
  });

  // Update the DOM
  const hourlyForecastDiv = document.querySelector('.hourly-body');
  hourlyForecastDiv.innerHTML = hourlyHTML;
}