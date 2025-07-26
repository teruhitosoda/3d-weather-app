import { useGLTF } from "@react-three/drei";
import { WEATHER_ICON_MAP } from "../constants/weatherIcons";

type WeatherIconProps = {
  iconCode: string;
  scale?: number;
};

export function WeatherIcon({ iconCode, scale = 1 }: WeatherIconProps) {
  const getIconPath = (iconCode: string): string => {
    return WEATHER_ICON_MAP[iconCode] || WEATHER_ICON_MAP["default"];
  };
  const { scene } = useGLTF(getIconPath(iconCode));

  return (
    <primitive
      object={scene.clone()}
      scale={scale}
    />
  );
}

export default WeatherIcon;
