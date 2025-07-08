import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Search from "./components/Search/Search";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import Weather from "./components/Weather";
import UnitToggler from "./components/UnitToggler/UnitToggler";
import { useUnit } from "./store/UnitContext";
import { fetchWeatherData } from "./api/weather";
import { getTodaysForecast } from "./utils/forecast";
import classes from "./App.module.css";

const theme = JSON.parse(localStorage.getItem("isDarkTheme")) ?? false;

function App() {
  const { unit } = useUnit();
  const [isDarkTheme, setIsDarkTheme] = useState(theme);
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchWeather(latitude, longitude, cityName = null) {
    setIsLoading(true);
    setError(null);

    try {
      const { weatherData, forecastData } = await fetchWeatherData(
        latitude,
        longitude,
        unit
      );

      setCity(cityName || `${weatherData.name}, ${weatherData.sys.country}`);
      setCurrWeather({
        city: cityName || `${weatherData.name}, ${weatherData.sys.country}`,
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
    getCurrLocation((position) => {
      const { latitude, longitude } = position.coords;
      fetchWeather(latitude, longitude);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    if (city && currWeather) {
      const { coord } = currWeather;
      fetchWeather(coord.lat, coord.lon, city);
    }
  }, [city, unit]);

  function getCurrLocation(successCallback, errorCallback) {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        (pos) => {
          console.log("Position retrieved:", pos);
          successCallback(pos);
        },
        (err) => {
          console.error("Error getting location:", err);
          errorCallback && errorCallback(err);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      errorCallback && errorCallback({ message: "Geolocation not supported" });
    }
  }

  function handleOnSubmitSearch(searchData) {
    const { coordinates, label } = searchData;
    setCity(label);
    fetchWeather(coordinates.latitude, coordinates.longitude, label);
  }

  function handleToggleTheme() {
    setIsDarkTheme((prevState) => !prevState);
  }

  function handleSetCurrentLocation() {
    getCurrLocation(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        alert(
          "Unable to fetch your location. Please ensure location services are enabled."
        );
      }
    );
  }

  let todaysForecast = null;

  if (forecast) {
    todaysForecast = getTodaysForecast(forecast.list);
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
            aria-label="Use Current Location"
          ></button>
        </div>
        <UnitToggler />
        {!isLoading && currWeather && (
          <Weather
            currWeather={currWeather}
            todaysForecast={todaysForecast}
            forecast={forecast}
          />
        )}
        {isLoading && <LoadingSpinner />}
        {!isLoading && error && (
          <p className={classes["error-message"]}>{error.message}</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
