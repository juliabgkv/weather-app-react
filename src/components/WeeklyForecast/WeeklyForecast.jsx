import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import classes from "./WeeklyForecast.module.css";
import WeeklyForecastItem from "../WeeklyForecastItem/WeeklyForecastItem";

function WeeklyForecast({ forecast }) {
  const currDay = new Date().getDate();

  // filter without curent forecast
  const filteredForecast = forecast.list.filter((item) => {
    const date = new Date(item.dt_txt);

    if (currDay !== date.getDate()) {
      return item;
    }
  });

  // group by day
  const res = Object.groupBy(filteredForecast, (item) => {
    const date = new Date(item.dt_txt);
    return date.getDate();
  });

  let forecastShortcut;

  forecastShortcut = Object.keys(res).map((key) => {
    let icon;

    res[key].map((item) => {
      icon = require(`../../assets/icons/${item.weather[0].icon}.png`);
      const weatherCode = item.weather[0].id % 100;
      if (weatherCode !== 8) {
        icon = require(`../../assets/icons/${item.weather[0].icon}.png`);
      }
    });

    const max = Math.max.apply(
      Math,
      res[key].map(function (item) {
        return item.main.temp_max;
      })
    );

    const min = Math.min.apply(
      Math,
      res[key].map(function (item) {
        return item.main.temp_max;
      })
    );

    const date = new Date(res[key][0].dt_txt);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    const dateStr = date.toLocaleDateString("en-US", options);
    
    return {
      dateNum: date.getDate(),
      dateStr: dateStr,
      icon: icon,
      maxTemp: Math.floor(max),
      minTemp: Math.floor(min),
    };
  });

  return (
    <div className={classes["weekly-forecast"]}>
      <h3 className={classes.title}>Weekly forecast</h3>
      {forecastShortcut && (
        <Accordion allowZeroExpanded={true} className={classes.accordion}>
          {forecastShortcut.map((item) => (
            <AccordionItem key={item.dateNum}>
              <AccordionItemHeading>
                <AccordionItemButton className={classes["accordion__button"]}>
                  <div className={classes["left-side"]}>{item.dateStr}</div>
                  <div className={classes.center}>
                    <img src={item.icon} alt="Weather icon" />
                    <div>
                      {item.maxTemp} / {item.minTemp}&deg;C
                    </div>
                  </div>
                  <div className={classes["right-side"]}>
                    <div>weather description</div>
                    <button className={classes.arrow}></button>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className={classes["accordion-item-content"]}>
                  {res[item.dateNum].map((i) => {
                    const date = new Date(i.dt_txt);

                    const timeStr = date.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false
                    });
                    
                    return <WeeklyForecastItem key={i.dt} item={i} timeStr={timeStr} />;
                  })}
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default WeeklyForecast;
