import { Search } from "lucide-react";
import { Center, Text3D, Html } from "@react-three/drei";
import { useState, useEffect, useCallback } from "react";
import { fetchCurrentWeather, fetchWeatherForecast } from "../api/weather";
import type { CurrentWeatherData, ForecastData } from "../types/weather";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import { OrbitControls } from "@react-three/drei";
import { fonts } from "../constants/weatherIcons";

function WeatherDisplay() {
  const [city, setCity] = useState<string>("");
  const [searchCity, setSearchCity] = useState<string>("Tokyo");
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const current = await fetchCurrentWeather(searchCity);
      setCurrentWeather(current);

      const forecastData = await fetchWeatherForecast(searchCity);
      setForecast(forecastData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
        console.error("Failed to fetch weather data:", error);
      } else {
        setError("An unknown error occurred.");
        console.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [searchCity]);

  useEffect(() => {
    if (searchCity) {
      loadWeatherData();
    }
  }, [searchCity, loadWeatherData]);

  const handleSearch = () => {
    if (city.trim()) {
      setSearchCity(city.trim());
    } else {
      setError("Please enter a city name.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <ambientLight
        intensity={0.8}
        color={"#fff"}
      />
      <directionalLight
        position={[1, 1, 1]}
        intensity={0.8}
        color={"#fff"}
      />
      <OrbitControls />
      <color
        args={["ghostwhite"]}
        attach="background"
      />
      <Html
        position={[0, 10, 0]}
        center
        transform
      >
        <div className="flex gap-x-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter city name"
            className="w-60 flex-grow text-xl px-6 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            className="p-4 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300 cursor-pointer"
          >
            <Search size={24} />
          </button>
        </div>
      </Html>
      {loading && !error && (
        <Center position={[0, 0, 0]}>
          <Text3D
            font={fonts[1]}
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            Loading weather data...
            <meshStandardMaterial color="#1e1b4b" />
          </Text3D>
        </Center>
      )}
      {error && (
        <Center position={[0, 0, 0]}>
          <Text3D
            font={fonts[1]}
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {error}
            <meshStandardMaterial color="#1e1b4b" />
          </Text3D>
        </Center>
      )}
      {!loading && !error && !currentWeather && !forecast && (
        <Center position={[0, 0, 0]}>
          <Text3D
            font={fonts[1]}
            size={0.8}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            No weather data available for this city.
            <meshStandardMaterial color="#1e1b4b" />
          </Text3D>
        </Center>
      )}
      {currentWeather && !loading && !error && <CurrentWeather weather={currentWeather} />}
      {forecast && !loading && !error && <ForecastWeather forecast={forecast} />}
    </>
  );
}

export default WeatherDisplay;
