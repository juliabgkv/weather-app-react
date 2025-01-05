# Weather App 🌤️

A modern weather application that provides real-time weather updates for any city or location worldwide.

## Features

1. Display current weather information:

- Temperature (Celsius/Fahrenheit).
- Humidity, wind speed, preassure and cloud coverage.

2. **Responsive design** for desktops and mobile devices.
3. Weather forecast (4 days).
4. Live city search with real-time data fetching.
5. Simple, intuitive user interface.
6. Light and dark mode available.
7. Find current location button.
8. Users can switch between Celsius and Fahrenheit

## Demo

Check out the live version of the app here:
https://weather-app-react-snowy-five.vercel.app/

## Screenshot

![App Screenshot](https://raw.githubusercontent.com/juliabgkv/weather-app-react/refs/heads/main/src/assets/screenshots/WeatherSnap_Screenshot.png)

## Technologies Used

- **ReactJS**.
- **CSS Modules**.
- [GeoDB Cities API](http://geodb-cities-api.wirefreethought.com/) - online places database for city search functionality.
- [OpenWeatherMap API](https://openweathermap.org/) - real-time weather data fetching.

## Installation

Install my-project with npm

```bash
    git clone https://github.com/juliabgkv/weather-app-react.git
    cd weather-app-react
```

Install dependencies:

```bash
    npm install
```

Create a .env file in the root directory with your API keys:

```bash
    REACT_APP_GEO_API_URL=https://wft-geo-db.p.rapidapi.com/v1/geo
    REACT_APP_GEO_API_KEY=your_geo_api_key_here
    REACT_APP_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
    REACT_APP_WEATHER_API_KEY=your_weather_api_key_here
```

Start the development server:

```bash
    npm start
```
