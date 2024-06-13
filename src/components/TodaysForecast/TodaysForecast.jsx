import classes from "./TodaysForecast.module.css";

function TodaysForecast({ todaysForecast }) {
  return (
    <div className={classes["todays-forecast"]}>
      <h3 className={classes.title}>Horly forecast</h3>
      <div className={classes["cards-container"]}>
        {todaysForecast.map((item) => {
          const date = new Date(item.dt_txt);

          const timeStr = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
          });

          const icon = require(`../../assets/icons/${item.weather[0].icon}.png`);

          return (
            <div key={item.dt} className={classes.card}>
              <div className={classes.time}>{timeStr}</div>
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
