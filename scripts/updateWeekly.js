import { kelvinToFahrenheit, kelvinToCelsius, capitalizeFirstLetterOfEachWord } from './unitConversions.js';

export function updateWeekly(weatherData, weatherCodeToImageMap) {
    const daily = weatherData.daily;

    let weeklyHTML = '';
    const timezone = weatherData.timezone;
    // Date formatting options
    const dateOptions = {
        month: 'numeric', 
        day: 'numeric',
        timeZone: timezone
    };

    for (let i = 0; i < daily.length; i++) {
        // Get the the day object
        let currentDay = daily[i];

        let date = new Date(currentDay.dt * 1000);

        let day = date.toLocaleDateString('en-US', {weekday: 'long', timezone})
        let dayMonth = date.toLocaleDateString('en-US', dateOptions);
        let weatherCode = currentDay.weather[0].id;
        let image = weatherCodeToImageMap[weatherCode];

        if (typeof image !== "string") {
          image = image[0];
        }

        let high = kelvinToFahrenheit(currentDay.temp.max);
        let low = kelvinToFahrenheit(currentDay.temp.min);
        let description = capitalizeFirstLetterOfEachWord(currentDay.weather[0].description);
        let sunrise = new Date(currentDay.sunrise * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', timeZone: timezone});
        let sunset = new Date(currentDay.sunset * 1000).toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit', timeZone: timezone});
        let moonPhase = currentDay.moon_phase;
        let dayTemp = kelvinToFahrenheit(currentDay.temp.day);
        let nightTemp = kelvinToFahrenheit(currentDay.temp.night);
        let eveTemp = kelvinToFahrenheit(currentDay.temp.eve);
        let mornTemp = kelvinToFahrenheit(currentDay.temp.morn);

        weeklyHTML += `
            <div class="day glass-effect">
              <div class="day-date-col">
                <div class="day-date">
                  <p>${(i===0) ? 'Today' : day}</p>
                  <p>${dayMonth}</p>
                </div>
                <div class="day-high-low">
                  <p>H: ${high}</p>
                  <p>L: ${low}</p>
                </div>
              </div>
              <div class="day-description">
                <img src=${image} alt="Weather icon">
                  ${description}
              </div>
              <div class="day-night">
                <p>Day Avg: ${dayTemp}</p>
                <p>Night Avg: ${nightTemp}</p>
              </div>
              <div class="day-sun-set-rise">
                <div class="sunrise">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sunrise sunrise-color shadow" viewBox="0 0 16 16">
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                  </svg>
                  ${sunrise}
                </div>
                <div class="sunset">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sunset sunset-color shadow" viewBox="0 0 16 16">
                    <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM8 7a3 3 0 0 1 2.599 4.5H5.4A3 3 0 0 1 8 7m3.71 4.5a4 4 0 1 0-7.418 0H.499a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                  </svg>
                  ${sunset}
                </div>
              </div>

            </div>
        `;
    }
    const weeklyForecastDiv = document.querySelector('.weekly-body');
    weeklyForecastDiv.innerHTML = weeklyHTML;
}
