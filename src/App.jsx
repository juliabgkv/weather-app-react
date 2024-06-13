import { useEffect, useState } from "react";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import TodaysForecast from "./components/TodaysForecast/TodaysForecast";
import WeeklyForecast from "./components/WeeklyForecast/WeeklyForecast";
import Footer from "./components/Footer/Footer";
import classes from  "./App.module.css";

const UNITS = "metric";
const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const theme = JSON.parse(localStorage.getItem("isDarkTheme")) || false;

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(theme);
  const [currWeather, setCurrWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  function fetchWeather(latitude, longitude) {
    const currentWeatherFetch = fetch(`${apiUrl}/weather?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${apiKey}`);
    const forecastFetch = fetch(`${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&units=${UNITS}&appid=${apiKey}`);

    return Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherData = await response[0].json();
        const forecastData = await response[1].json();

        return { 
          weather: weatherData, 
          forecast: forecastData
        };
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
            .then(data => {
              setCurrWeather({ city: `${data.weather.name}, ${data.weather.sys.country}`, ...data.weather });
              setForecast(data.forecast);
            })
            .catch(error => console.log(error));
        });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }, [isDarkTheme]);

  function handleOnSubmitSearch(searchData) {
    const { latitude, longitude } = searchData.coordinates;

    fetchWeather(latitude, longitude)
      .then(data => {
        setCurrWeather({ city: searchData.label, ...data.weather });
        setForecast(data.forecast);
      })
      .catch(error => console.log(error));
  }

  let todaysForecast = null;

  if (forecast) {
    const currDate = new Date();
    
    todaysForecast = forecast.list.filter(forecast => {
      const date = new Date(forecast.dt_txt);

      if (currDate.getDate() === date.getDate()) {
        return forecast;
      } else { return; }
    });
  }

  function handleToggleTheme() {
    setIsDarkTheme(prevState => !prevState);
  }

  return (
    <div className={classes.app} data-theme={isDarkTheme ? "dark" : "light"}>
      <div className={classes.container}>
        <header className={classes.header}>
          <h1 className={classes.logo}>Weather<span>Snap</span></h1>
          <ThemeToggle
            isDark={isDarkTheme}
            onToggleTheme={handleToggleTheme}
          />
        </header>
        <Search onSubmitSearchForm={handleOnSubmitSearch} />
        {currWeather && <CurrentWeather
          data={currWeather}
        />}
        {todaysForecast && <TodaysForecast
          todaysForecast={todaysForecast}
        />}
        {forecast && <WeeklyForecast
          forecast={forecast}
        />}
      </div>
      <Footer />
    </div>
  );
}

export default App;