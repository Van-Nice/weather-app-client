export function updateTime(weatherData) {
    // Extract timezone and timestamp from weatherData
    const timezone = weatherData.timezone;
    const time = weatherData.current.dt;

    // Get first day of the week
    const firstDay = weatherData.daily[0].dt;
    const lastDay = weatherData.daily[weatherData.daily.length - 1].dt;

    const weekDateOptions = {
        month: 'numeric', 
        day: 'numeric',
        timeZone: timezone,
    }

    const firstDayDate = new Date(firstDay * 1000).toLocaleDateString('en-US', weekDateOptions);
    const lastDayDate = new Date(lastDay * 1000).toLocaleDateString('en-US', weekDateOptions);

    // Convert Unix timestamp to Date object
    const currentDateTime = new Date(time * 1000);


    // Date formatting options
    const dateOptions = {
        weekday: 'long', 
        month: 'long', 
        day: 'numeric',
        timeZone: timezone  // Set the timezone for formatting
    };
    // Format date
    const formattedDate = currentDateTime.toLocaleDateString('en-US', dateOptions);

    // Time formatting options
    const timeOptions = {
        hour: 'numeric',
        minute: '2-digit',
        timeZone: timezone  // Set the timezone for formatting
    };
    // Format time
    const formattedTime = currentDateTime.toLocaleTimeString('en-US', timeOptions);

    // Example: Update date and time in HTML
    document.getElementById('currentTime').textContent = formattedTime;
    document.getElementById('currentDate').textContent = formattedDate;
    document.getElementById('currentWeek').textContent = `${firstDayDate} - ${lastDayDate}`;
}