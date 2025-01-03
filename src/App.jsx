import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import classes from "./App.module.css";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Weather from "./components/Weather";

const UNITS = "metric";
const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const theme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(theme);
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchWeather(latitude, longitude, city = null) {
    setIsLoading(true);

    try {
      const currentWeatherFetch = fetch(
        `${apiUrl}/weather?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${apiKey}`
      );
      const forecastFetch = fetch(
        `${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${apiKey}`
      );

      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        currentWeatherFetch,
        forecastFetch,
      ]);

      if (!currentWeatherResponse.ok || !forecastResponse.ok) {
        throw new Error("Failed to fetch weather or forecast data.");
      }

      const weatherData = await currentWeatherResponse.json();
      const forecastData = await forecastResponse.json();

      setCurrWeather({
        city: city ? city : `${weatherData.name}, ${weatherData.sys.country}`,
        ...weatherData,
      });
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError({ message: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  function handleOnSubmitSearch(searchData) {
    const { latitude, longitude } = searchData.coordinates;
    fetchWeather(latitude, longitude, searchData.label);
  }

  let todaysForecast = null;

  if (forecast) {
    const currDate = new Date();

    todaysForecast = forecast.list.filter((forecast) => {
      const date = new Date(forecast.dt_txt);

      return currDate.getDate() === date.getDate();
    });
  }

  function handleToggleTheme() {
    setIsDarkTheme((prevState) => !prevState);
  }

  function handleSetCurrentLocation() {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert(
        "Geolocation is not supported by your browser. Please enable location access or use a modern browser."
      );
    }
  }

  return (
    <div className={classes.app} data-theme={isDarkTheme ? "dark" : "light"}>
      <div className={classes.container}>
        <header className={classes.header}>
          <h1 className={classes.logo}>
            Weather<span>Snap</span>
          </h1>
          <ThemeToggle isDark={isDarkTheme} onToggleTheme={handleToggleTheme} />
        </header>
        <div className={classes["search-bar-container"]}>
        <Search onSubmitSearchForm={handleOnSubmitSearch} />
          <button
            className={classes["location-btn"]}
            onClick={handleSetCurrentLocation}
            title="Current Location"
          ></button>
        </div>
        {isLoading && <LoadingSpinner />}
        {currWeather && !isLoading && (
          <Weather
            currWeather={currWeather}
            todaysForecast={todaysForecast}
            forecast={forecast}
          />
        )}
        {!isLoading && error && (
          <p className={classes["error-message"]}>{error.message}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
