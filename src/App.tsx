import { useState } from "react";
import styled from "styled-components";
import "./App.css";
import Rain from "./environments/Rain";
import Snow from "./environments/Snow";

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function App() {
  type Weather = "rain" | "snow" | "sunny";
  const [weather, setWeather] = useState<Weather>("rain");

  return (
    <AppContainer>
      <button onClick={() => setWeather("rain")}>Rain</button>
      <button onClick={() => setWeather("snow")}>Snow</button>
      {weather === "rain" ? <Rain /> : <Snow />}
    </AppContainer>
  );
}

export default App;
