const apiUrl = process.env.REACT_APP_WEATHER_API_URL;
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

export async function fetchWeatherData(
  latitude,
  longitude,
  unit
) {
  const currentWeatherUrl = `${apiUrl}/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
  const forecastUrl = `${apiUrl}/forecast?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;

  const [currentWeatherResponse, forecastResponse] = await Promise.all([
    fetch(currentWeatherUrl),
    fetch(forecastUrl),
  ]);

  if (!currentWeatherResponse.ok || !forecastResponse.ok) {
    throw new Error("Failed to fetch weather or forecast data.");
  }

  const weatherData = await currentWeatherResponse.json();
  const forecastData = await forecastResponse.json();

  return { weatherData, forecastData };
}
