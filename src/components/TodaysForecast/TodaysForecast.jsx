import { getFormattedTime } from "../../utils";
import classes from "./TodaysForecast.module.css";

function TodaysForecast({ todaysForecast }) {
  return (
    <div className={classes["todays-forecast"]}>
      <h3 className={classes.title}>Horly forecast</h3>
      <div className={classes["cards-container"]}>
        {todaysForecast.map((item) => {
          const icon = require(`../../assets/icons/${item.weather[0].icon}.png`);

          return (
            <div key={item.dt} className={classes.card}>
              <div className={classes.time}>
                {getFormattedTime(item.dt_txt)}
              </div>
              <img src={icon} alt={item.weather[0].description} />
              <div className={classes.temp}>
                {Math.floor(item.main.temp)} &deg;C
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TodaysForecast;
