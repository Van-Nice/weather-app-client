# Wilson's Weather App - Front End

Wilson's Weather is a web application designed to provide real-time weather updates based on user location or manual search input. It leverages geolocation for auto-detecting the user's position or allows users to search for a specific location to get weather details. Check it out here: https://wilsons-weather.com

## Features

- **Current Weather**: Displays the current weather conditions for the user's location or searched location.
- **Hourly Weather Forecast**: Shows an hourly weather forecast allowing users to plan their day around the weather.
- **Weekly Weather Forecast**: Provides a look at the weather for the upcoming week.
- **Location Search**: Users can type in a location to see the weather there. An autocomplete feature suggests locations as the user types.

## Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **API**: Custom backend hosted on Heroku (Node.js)
- **Styling**: Uses `styles.css` for custom styles and Font Awesome for icons.

## API Endpoints

- `/start-weather-data?coords=[latitude],[longitude]`: Fetches weather data for the provided geographic coordinates.
- `/ip-weather-data`: Fetches weather data based on the IP address of the user.
- `/search-locations?input=[userInput]`: Provides autocomplete suggestions for location searches.
- `/weather-data?input=[location]`: Fetches weather data for a manually inputted location.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourgithubusername/weather-app.git
   ```
2. Navigate to the project directory:
   ```bash
   cd weather-app
   ```
3. Install dependencies (if any):
   ```bash
   npm install
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
