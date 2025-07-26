import { Center, Text3D, Float } from "@react-three/drei";
import type { CurrentWeatherData } from "../types/weather";
import WeatherIcon from "./WeatherIcon";
import { fonts } from "../constants/weatherIcons";

type CurrentWeatherProps = {
  weather: CurrentWeatherData;
};

function formatWeatherDescription(description: string) {
  const words = description.split(" ");
  if (words.length >= 3) {
    return `${words.slice(0, 2).join(" ")}\n${words.slice(2).join(" ")}`;
  }

  return description;
}

function CurrentWeather({ weather }: CurrentWeatherProps) {
  const utcTimestamp = weather.dt;
  const timezoneOffset = weather.timezone;
  const localTimestamp = (utcTimestamp + timezoneOffset) * 1000;
  const localDate = new Date(localTimestamp);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  };
  const formattedTime = localDate.toLocaleString("en-US", options);

  return (
    <group position={[0, 7, 0]}>
      <Center rotation={[0, 0, Math.PI / 90]}>
        <Text3D
          font={fonts[2]}
          size={1.0}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {weather.name}
          <meshStandardMaterial color="#1e1b4b" />
        </Text3D>
      </Center>
      <Center position={[0, -1.5, 0]}>
        <Text3D
          font={fonts[1]}
          size={0.5}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {formattedTime}
          <meshStandardMaterial color="#c7d2fe" />
        </Text3D>
      </Center>
      <group position={[-3.8, -5.4, 0]}>
        <Center>
          <Float
            speed={2}
            rotationIntensity={1}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
          >
            <WeatherIcon
              iconCode={weather.weather[0].icon}
              scale={1}
            />
          </Float>
        </Center>
        <Center
          position={[0, -4, 0]}
          rotation={[0, 0, Math.PI / 90]}
        >
          <Text3D
            font={fonts[2]}
            size={0.6}
            height={0.2}
            lineHeight={0.8}
            letterSpacing={0.025}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {`${formatWeatherDescription(weather.weather[0].description)}`}
            <meshStandardMaterial color="#f472b6" />
          </Text3D>
        </Center>
      </group>
      <Center position={[3.4, -6, 0]}>
        <Text3D
          font={fonts[2]}
          size={1.6}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
          rotation={[0, 0, -Math.PI / 90]}
        >
          {Math.round(weather.main.temp)}°C
          <meshStandardMaterial color="#fb923c" />
        </Text3D>
        <group position={[2.4, -1.6, 0]}>
          <Float
            speed={1}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
          >
            <WeatherIcon
              iconCode={"humidity"}
              scale={1}
            />
          </Float>
          <Text3D
            position={[0.6, -0.4, 0]}
            font={fonts[0]}
            size={0.6}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {weather.main.humidity}%
            <meshStandardMaterial color="#a5b4fc" />
          </Text3D>
        </group>
        <group position={[2, -3.4, 0]}>
          <Float
            speed={1.5}
            rotationIntensity={0.5}
            floatIntensity={1}
            floatingRange={[-0.1, 0.1]}
          >
            <WeatherIcon
              iconCode={"wind"}
              scale={1}
            />
          </Float>
          <Text3D
            position={[0.8, -0.4, 0]}
            font={fonts[0]}
            size={0.6}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={5}
          >
            {weather.wind.speed}m/s
            <meshStandardMaterial color="#a5b4fc" />
          </Text3D>
        </group>
      </Center>
    </group>
  );
}

export default CurrentWeather;
