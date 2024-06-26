import classes from "./CurrentWeather.module.css";

function CurrentWeather({ data }) {
  const icon = require(`../../assets/icons/${data.weather[0].icon}.png`);

  const date = new Date(data.dt * 1000);
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: false,
  };
  const dateStr = date.toLocaleDateString("en-US", options);

  return (
    <div className={classes["current-weather"]}>
      <div className={classes.city}>{data.city}</div>
      <div className={classes.date}>{dateStr}</div>
      <div className={classes["current-weather-container"]}>
        <div className={classes["left-side"]}>
          <div>
            <div className={classes["main-info"]}>
              <img
                src={icon}
                alt={data.weather[0].description}
                className={classes["weather-icon"]}
              />
              <div className={classes["main-info__aside"]}>
                <div className={classes.temp}>
                  {Math.floor(data.main?.temp)}&deg;C
                </div>
                <div className={classes.description}>
                  {data.weather[0].description}
                </div>
                <div className={classes["feels-temp"]}>
                  feels like: {Math.floor(data.main.feels_like)}&deg;C
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes["right-side"]}>
          <div>Clouds: {data.clouds.all}%</div>
          <div>Preassure: {data.main.pressure} hPa</div>
          <div>Humidity: {data.main.humidity} &#37;</div>
          <div>Wind: {data.wind.speed} m/s</div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
