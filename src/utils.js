export function groupForecastByDays(forecasts) {
  return forecasts.reduce((grouped, forecast) => {
    const date = forecast.dt_txt.split(" ")[0];

    if (!grouped[date]) {
      grouped[date] = [];
    }

    grouped[date].push(forecast);

    return grouped;
  }, {});
}

export function getMaxTemp(list) {
  const max = Math.max.apply(
    Math,
    list.map(function (item) {
      return item.main.temp_max;
    })
  );

  return Math.floor(max);
}

export function getMinTemp(list) {
  const min = Math.min.apply(
    Math,
    list.map(function (item) {
      return item.main.temp_max;
    })
  );

  return Math.floor(min);
}

export function getFormattedDate(dtTxt) {
  const date = new Date(dtTxt);
  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function getFormattedTime(dtTxt) {
  const date = new Date(dtTxt);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  return date.toLocaleTimeString("en-US", options);
}
