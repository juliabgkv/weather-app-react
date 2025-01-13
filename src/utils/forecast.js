export function getTodaysForecast(forecastList) {
  const currDate = new Date();

  return forecastList.filter((forecast) => {
    const date = new Date(forecast.dt_txt);
    return currDate.getDate() === date.getDate();
  });
}
