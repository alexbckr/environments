import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { normalize } from "../utils";

interface SnowProps {
  initx: number;
  inity: number;
  direction: number;
  size: number;
  speed: number;
  distance: number;
}

const getFallAnimation = (direction: number) => {
  const finalX = Math.cos(direction) * 800;

  return keyframes`
    0% {
      transform: translate(0, -100px);
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    90% {
      opacity: 0.5;
    }
    100% {
      transform: translate(${finalX}px, 800px);
      opacity: 0;
    }
  `;
};

const Snowflake = styled.div<SnowProps>`
  position: absolute;
  left: ${(props) => props.initx * 100}vw;
  top: ${(props) => props.inity * 100}vh;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  background-color: darkgrey;

  filter: blur(${(props) => props.distance * 5}px);

  animation: ${(props) => getFallAnimation(props.direction)}
    ${(props) => props.speed}s linear infinite;
`;

const SIZE_RANGE = [4, 8];
const SPEED_RANGE = [2, 20];
const DISTANCE_RANGE = [0.1, 0.9];
const generateSnowflakes = (count: number): SnowProps[] => {
  return Array.from({ length: count }, (_, index) => {
    const size = normalize(Math.random(), SIZE_RANGE);
    const speed = normalize(Math.random(), SPEED_RANGE);
    const direction = Math.random() * 2 * Math.PI; // random value in radians
    const distance = normalize(Math.random(), DISTANCE_RANGE);

    return {
      initx: Math.random(),
      inity: Math.random(),
      direction,
      distance,
      size,
      speed,
    };
  });
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export default function Snow() {
  const [snowflakes] = useState(generateSnowflakes(200));

  return (
    <Container>
      {snowflakes.map((s, key) => (
        <Snowflake {...s} key={key} />
      ))}
    </Container>
  );
}
