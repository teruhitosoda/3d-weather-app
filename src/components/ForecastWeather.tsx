import * as THREE from "three";
import { useMemo } from "react";
import { Center, Text3D, Float } from "@react-three/drei";
import { WeatherIcon } from "./WeatherIcon";
import type { ForecastData } from "../types/weather";
import { fonts } from "../constants/weatherIcons";

type ForecastWeatherProps = {
  forecast: ForecastData;
};

function ForecastWeather({ forecast }: ForecastWeatherProps) {
  const itemsWithRotation = useMemo(() => {
    return forecast.list.map((item) => ({
      ...item,
      randomRotationZ: THREE.MathUtils.randFloat(-0.25, 0.25),
    }));
  }, [forecast.list]);

  const offset = ((forecast.list.length - 1) * 4.5) / 2;

  return (
    <group position={[0, -5, 0]}>
      {itemsWithRotation.map((item, index) => {
        const localTimestamp = (item.dt + forecast.city.timezone) * 1000;
        const localDate = new Date(localTimestamp);
        const options: Intl.DateTimeFormatOptions = {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        };
        const formattedTime = localDate.toLocaleString("en-US", options);

        return (
          <group
            dispose={null}
            key={index}
            position={[index * 4.5 - offset, 0, 0]}
            rotation={[0, 0, item.randomRotationZ]}
          >
            <Center></Center>
            <Float
              speed={1}
              rotationIntensity={0.5}
              floatIntensity={1}
              floatingRange={[-0.1, 0.1]}
            >
              <Center>
                <Text3D
                  font={fonts[1]}
                  size={0.5}
                  height={0.1}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelSize={0.02}
                >
                  {formattedTime}
                  <meshStandardMaterial color="#c7d2fe" />
                </Text3D>
              </Center>
              <Center position={[0, -1.5, 0]}>
                <WeatherIcon
                  iconCode={item.weather[0].icon}
                  scale={0.3}
                />
              </Center>
              <Center position={[0, -3, 0]}>
                <Text3D
                  font={fonts[0]}
                  size={0.5}
                  height={0.1}
                  curveSegments={12}
                  bevelEnabled
                  bevelThickness={0.02}
                  bevelSize={0.02}
                >
                  {Math.round(item.main.temp)}°C
                  <meshStandardMaterial color="#fb923c" />
                </Text3D>
              </Center>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

export default ForecastWeather;
