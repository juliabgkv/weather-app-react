import CurrentWeather from "./CurrentWeather/CurrentWeather";
import TodaysForecast from "./TodaysForecast/TodaysForecast";
import WeeklyForecast from "./WeeklyForecast/WeeklyForecast";

function Weather({ currWeather, todaysForecast, forecast }) {
  return (
    <div>
      {currWeather && <CurrentWeather data={currWeather} />}
      {todaysForecast && <TodaysForecast todaysForecast={todaysForecast} />}
      {forecast && <WeeklyForecast forecast={forecast} />}
    </div>
  );
}

export default Weather;
