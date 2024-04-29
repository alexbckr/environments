import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { normalize } from "../utils";

interface DropProps {
  id: number;
  initx: number;
  speed: number;
  height: number;
  blur: number;
}

const dropAnimation = keyframes`
  from {
    transform: translateY(-100px);
  }
  to {
    transform: translateY(calc(100vh + 100px));
  }
`;

const Drop = styled.div<DropProps>`
  position: absolute;
  left: ${(props) => props.initx * 100}vw;

  width: 1px;
  height: ${(props) => props.height}px;
  background-color: lightgrey;
  animation: ${dropAnimation} ${(props) => props.speed}s linear infinite;
  filter: blur(${(props) => props.blur}px);
`;

// higher speed -> slower (animation takes longer)
const SPEED_RANGE = [0.3, 1.2];
const HEIGHT_RANGE = [30, 80];
const BLUR_RANGE = [1, 8];
const generateDrops = (count: number): DropProps[] => {
  return Array.from({ length: count }, (_, index) => {
    const distance = Math.random();

    return {
      id: index,
      initx: Math.random(),
      speed: normalize(distance, SPEED_RANGE),
      blur: normalize(distance, BLUR_RANGE),
      // higher distance -> shorter height
      height: normalize(1 - distance, HEIGHT_RANGE),
    };
  });
};

const RainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

function Rain() {
  const [drops] = useState<DropProps[]>(generateDrops(100));

  return (
    <RainContainer>
      {drops.map((d, key) => (
        <Drop {...d} key={key} />
      ))}
    </RainContainer>
  );
}

export default Rain;
