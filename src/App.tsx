import { Canvas } from "@react-three/fiber";
import WeatherDisplay from "./components/WeatherDisplay";
import "./index.css";
import { OPEN_WEATHER_API_KEY } from "./constants/api";
import { Perf } from "r3f-perf";

function App() {
  return (
    <div className="h-screen flex items-center justify-center">
      {OPEN_WEATHER_API_KEY ? (
        <Canvas
          camera={{
            fov: 45,
            near: 0.1,
            far: 100,
            position: [0, 0, 32],
          }}
        >
          <Perf position="top-left" />
          <WeatherDisplay />
        </Canvas>
      ) : (
        <div className="text-red-700 text-lg font-bold p-4">
          API key is not set. Please set VITE_OPEN_WEATHER_API_KEY in your .env file.
        </div>
      )}
    </div>
  );
}

export default App;
