import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import classes from "./WeeklyForecast.module.css";
import WeeklyForecastItem from "../WeeklyForecastItem/WeeklyForecastItem";
import {
  getFormattedDate,
  getFormattedTime,
  getHighestPriorityWeather,
  getMaxTemp,
  getMinTemp,
  getRepresentativeIcon,
  groupForecastByDays,
} from "../../utils";

function WeeklyForecast({ forecast }) {
  if (!forecast || !forecast.list || !forecast.list.length) {
    return null;
  }

  const dailyForecastList = groupForecastByDays(forecast.list);

  delete dailyForecastList[Object.keys(dailyForecastList)[0]]; // remove current day weather (as it`s been already shown)
  delete dailyForecastList[
    Object.keys(dailyForecastList)[Object.keys(dailyForecastList).length - 1]
  ]; // remove last day weather (as it`s not full)

  let forecastDaySummary;

  forecastDaySummary = Object.keys(dailyForecastList).map((key) => {
    const currForecastItem = dailyForecastList[key];

    const representativeWeather = getHighestPriorityWeather(currForecastItem);

    let iconCode = getRepresentativeIcon(representativeWeather.weather[0].icon);
    const icon = require(`../../assets/icons/${iconCode}.png`);

    const description = representativeWeather.weather[0].description;

    return {
      dateKey: currForecastItem[0].dt_txt.split(" ")[0],
      dateStr: getFormattedDate(currForecastItem[0].dt_txt),
      icon: icon,
      description: description,
      maxTemp: getMaxTemp(currForecastItem),
      minTemp: getMinTemp(currForecastItem),
    };
  });

  return (
    <div className={classes["weekly-forecast"]}>
      <h3 className={classes.title}>Daily forecast</h3>
      {forecastDaySummary && (
        <Accordion allowZeroExpanded={true} className={classes.accordion}>
          {forecastDaySummary.map(({ dateKey, dateStr, icon, description, maxTemp, minTemp }) => (
            <AccordionItem key={dateKey}>
              <AccordionItemHeading>
                <AccordionItemButton className={classes["accordion__button"]}>
                  <div className={classes["left-side"]}>{dateStr}</div>
                  <div className={classes.center}>
                    <img src={icon} alt="Weather icon" />
                    <div>
                      {maxTemp} / {minTemp}&deg;C
                    </div>
                  </div>
                  <div className={classes["right-side"]}>
                    <div>{description}</div>
                    <button className={classes.arrow}></button>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={classes["accordion-item-content"]}>
                {dailyForecastList[dateKey].map((i) => (
                  <WeeklyForecastItem
                    key={i.dt}
                    item={i}
                    timeStr={getFormattedTime(i.dt_txt)}
                  />
                ))}
              </AccordionItemPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}

export default WeeklyForecast;
