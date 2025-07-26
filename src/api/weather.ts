import {
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_BASE_URL,
  OPEN_WEATHER_UNITS,
  OPEN_WEATHER_LANG,
} from "../constants/api";
import type { CurrentWeatherData, ForecastData } from "../types/weather";

export const fetchCurrentWeather = async (city: string): Promise<CurrentWeatherData> => {
  if (!OPEN_WEATHER_API_KEY) {
    throw new Error("OpenWeatherMap API key is not set. Please check your .env file.");
  }

  const url = `${OPEN_WEATHER_BASE_URL}/weather?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${OPEN_WEATHER_UNITS}&lang=${OPEN_WEATHER_LANG}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Current weather data for city '${city}' not found.`);
    }
    throw new Error(
      `Failed to fetch current weather data: ${response.statusText} (Status: ${response.status})`
    );
  }

  const data: CurrentWeatherData = await response.json();
  return data;
};

export const fetchWeatherForecast = async (city: string): Promise<ForecastData> => {
  if (!OPEN_WEATHER_API_KEY) {
    throw new Error("OpenWeatherMap API key is not set. Please check your .env file.");
  }

  const url = `${OPEN_WEATHER_BASE_URL}/forecast?q=${city}&appid=${OPEN_WEATHER_API_KEY}&units=${OPEN_WEATHER_UNITS}&lang=${OPEN_WEATHER_LANG}`;

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Weather forecast for city '${city}' not found.`);
    }
    throw new Error(
      `Failed to fetch weather forecast data: ${response.statusText} (Status: ${response.status})`
    );
  }

  const data: ForecastData = await response.json();
  const filteredList = data.list
    .filter((forecast) => {
      return forecast.dt > Math.floor(Date.now() / 1000);
    })
    .slice(0, 7);

  const newData = {
    ...data,
    list: filteredList,
  };

  return newData;
};
