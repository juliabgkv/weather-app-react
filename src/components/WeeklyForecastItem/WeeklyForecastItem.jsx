import pressureIcon from "../../assets/barometer.png";
import temperatureIcon from "../../assets/thermometer.png";
import cloudIcon from "../../assets/cloud.png";
import windyIcon from "../../assets/windy.png";
import humidityIcon from "../../assets/humidity.png";
import classes from "./WeeklyForecastItem.module.css";
import { useUnit } from "../../store/UnitContext";

function WeeklyForecastItem({ item, timeStr }) {
  const { unit } = useUnit();

  const icon = require(`../../assets/icons/${item.weather[0].icon}.png`);

  return (
    <div className={classes["weekly-forecast-item"]}>
      <div className={classes.time}>{timeStr}</div>
      <div className={classes.description}>
        <div className={classes["weather-icon-container"]}>
          <img src={icon} alt={item.weather[0].description} />
        </div>
        {item.weather[0].description}
      </div>
      <div className={classes["details-container"]}>
        <div>
          <img
            src={temperatureIcon}
            alt="Thermometer"
            className={classes["icon"]}
          />
          {Math.floor(item.main.temp_max)} {unit === "metric" ? "°C" : "°F"}
        </div>
        <div>
          <img src={windyIcon} alt="Windy" className={classes["icon"]} />
          {item.wind.speed} {unit === "metric" ? "m/s" : "mph"}
        </div>
        <div>
          <img src={humidityIcon} alt="Humidity" className={classes["icon"]} />
          {item.main.humidity} %
        </div>
        <div>
          <img src={pressureIcon} alt="Pressure" className={classes["icon"]} />
          {item.main.pressure} hPa
        </div>
        <div>
          <img src={cloudIcon} alt="Cloud" className={classes["icon"]} />
          {item.clouds.all} %
        </div>
      </div>
    </div>
  );
}

export default WeeklyForecastItem;
