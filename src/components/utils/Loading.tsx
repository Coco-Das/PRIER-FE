import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Gif2 from '../../assets/projectloading.json';
import Lottie from './LottieComponent';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  z-index: 50;
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
    transform: translateX(100vw);
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
  overflow: hidden;
`;

export const Loading = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const stars = Array.from({ length: 10 });

  return (
    <>
      {loading && (
        <Container>
          <Lottie animationData={Gif2} loop={true} autoplay={true} style={{ width: '35%' }} />
          {stars.map((_, index) => (
            <ShootingStar
              key={index}
              style={{ top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 10}s` }}
            />
          ))}
        </Container>
      )}
    </>
  );
};
