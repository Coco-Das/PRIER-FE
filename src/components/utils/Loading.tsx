import React from 'react';
import styled, { keyframes } from 'styled-components';
import Gif from '../../assets/personloading.json';
// import Gif2 from '../../assets/projectsloading.json';
import Lottie from './LottieComponent';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to top left, lime, transparent), linear-gradient(to top right, #4188fe, transparent);
  background-blend-mode: screen;
  background-blend-mode: multiply;
  background-blend-mode: overlay;
  background-blend-mode: darken;
  background-blend-mode: soft-light;
  background-blend-mode: luminosity;
`;

const shootingtime = '4500ms';

const tail = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  25% {
    opacity: 100%;
  }
  75% {
    opacity: 100%;
  }
  100% {
    width: 100%;
    opacity: 0;
  }
`;

const shooting = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ShootingStar = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  height: 2px;
  background: linear-gradient(-45deg, rgba(95, 145, 255, 0.8), rgba(0, 0, 255, 0));
  border-radius: 999px;
  filter: drop-shadow(0 0 6px rgba(105, 155, 255, 1));
  animation: ${tail} ${shootingtime} linear infinite, ${shooting} ${shootingtime} linear infinite;
  z-index: -1;
`;

export const Loading = () => {
  const stars = Array.from({ length: 20 });

  return (
    <Container>
      <Lottie animationData={Gif} loop={true} autoplay={true} style={{ width: '35%' }} />
      {stars.map((_, index) => (
        <ShootingStar
          key={index}
          style={{ top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }}
        />
      ))}
    </Container>
  );
};
