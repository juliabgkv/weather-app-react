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
  getMaxTemp,
  getMinTemp,
  groupByDay,
} from "../../utils";

function WeeklyForecast({ forecast }) {
  const dailyForecastList = groupByDay(forecast.list);

  delete dailyForecastList[Object.keys(dailyForecastList)[0]]; // remove current day weather (as it`s been already shown)
  delete dailyForecastList[
    Object.keys(dailyForecastList)[Object.keys(dailyForecastList).length - 1]
  ]; // remove last day weather (as it`s not full)

  let forecastDaySummary;

  forecastDaySummary = Object.keys(dailyForecastList).map((key) => {
    const middleOfTheDay = dailyForecastList[key].find(item => {
      return (new Date(item.dt_txt).getHours() === 15);
    });

    const icon = require(`../../assets/icons/${middleOfTheDay.weather[0].icon}.png`);
    const description = middleOfTheDay.weather[0].description;

    return {
      dateNum: new Date(dailyForecastList[key][0].dt_txt).getDate(),
      dateStr: getFormattedDate(dailyForecastList[key][0].dt_txt),
      icon: icon,
      description: description,
      maxTemp: getMaxTemp(dailyForecastList[key]),
      minTemp: getMinTemp(dailyForecastList[key]),
    };
  });

  return (
    <div className={classes["weekly-forecast"]}>
      <h3 className={classes.title}>Daily forecast</h3>
      {forecastDaySummary && (
        <Accordion allowZeroExpanded={true} className={classes.accordion}>
          {forecastDaySummary.map((item) => (
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
                    <div>{item.description}</div>
                    <button className={classes.arrow}></button>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel className={classes["accordion-item-content"]}>
                {dailyForecastList[item.dateNum].map((i) => (
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
