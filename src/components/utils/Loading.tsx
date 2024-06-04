import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactComponent as firstmainimg1 } from '../../assets/FirstMainImg1.svg';
import { ReactComponent as firstmainimg2 } from '../../assets/FirstMainImg2.svg';
import { ReactComponent as firstmainimg3 } from '../../assets/FirstMainImg3.svg';
import { ReactComponent as firstmainimg4 } from '../../assets/FirstMainImg4.svg';
import { ReactComponent as firstmainimg5 } from '../../assets/FirstMainImg5.svg';
import { ReactComponent as firstmainimg6 } from '../../assets/FirstMainImg6.svg';
import { ReactComponent as firstmainimg7 } from '../../assets/FirstMainImg7.svg';
import { ReactComponent as firstmainimg8 } from '../../assets/FirstMainImg8.svg';
import { ReactComponent as firstmainimg9 } from '../../assets/FirstMainImg9.svg';
import { ReactComponent as firstmainimg10 } from '../../assets/FirstMainImg10.svg';
import { ReactComponent as firstmainimg11 } from '../../assets/FirstMainImg11.svg';
import { ReactComponent as firstmainimg12 } from '../../assets/FirstMainImg12.svg';
import { ReactComponent as firstmainimg13 } from '../../assets/FirstMainImg13.svg';
import { ReactComponent as firstmainimg14 } from '../../assets/FirstMainImg14.svg';
import { ReactComponent as firstmainimg15 } from '../../assets/FirstMainImg15.svg';

const textDur = '1050ms';

const Container = styled.div`
  position: absolute;
  width: 17rem;
  height: 10rem;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;

const textAnim = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  30% {
    transform: translate3d(0, 0, 0);
  }
  45% {
    transform: translate3d(0, -4rem, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
`;

const textWAnim = keyframes`
  0% {
    transform: translate3d(0, -4rem, 0);
  }
  38% {
    transform: translate3d(0, -4rem, 0);
  }
  69% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(0, -4rem, 0);
  }
`;

const Text = styled.div`
  color: #315af1;
  font-size: 4rem;
  font-weight: 700;
  position: absolute;
  bottom: 0;
  animation: ${textAnim} ${textDur} ease-in infinite;
  transform: translate3d(0, 0, 0);
  font-family: 'Moirai One';
  &.text-p {
    left: 0rem;
    transform: translate3d(0, -4rem, 0);
    animation: ${textWAnim} ${textDur} ease-in infinite;
  }
  &.text-r {
    left: 4.4rem;
    animation-delay: 150ms;
  }
  &.text-i {
    left: 8.6rem;
    animation-delay: 230ms;
  }
  &.text-e {
    left: 12rem;
    animation-delay: 310ms;
  }
  &.text-r-last {
    left: 15.6rem;
    animation-delay: 390ms;
  }
`;

export const FirstContainer = styled.div`
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 */
`;

export const Img1 = styled(firstmainimg1)`
  position: absolute;
  left: 4rem;
  top: 1rem;
`;
export const Img2 = styled(firstmainimg2)`
  position: absolute;
  left: 18rem;
  top: 2rem;
`;
export const Img3 = styled(firstmainimg3)`
  position: absolute;
  left: 32rem;
  top: 1rem;
`;
export const Img4 = styled(firstmainimg4)`
  position: absolute;
  right: 13rem;
  top: 0.5rem;
`;
export const Img5 = styled(firstmainimg5)`
  position: absolute;
  right: 4rem;
  top: 4rem;
`;
export const Img6 = styled(firstmainimg6)`
  position: absolute;
  left: 14rem;
  top: 14rem;
`;
export const Img7 = styled(firstmainimg7)`
  position: absolute;
  left: 6rem;
  top: 20rem;
`;
export const Img8 = styled(firstmainimg8)`
  position: absolute;
  left: -3rem;
  top: 34rem;
`;
export const Img9 = styled(firstmainimg9)`
  position: absolute;
  left: 18rem;
  top: 41rem;
`;
export const Img10 = styled(firstmainimg10)`
  position: absolute;
  left: 25rem;
  top: 38rem;
`;
export const Img11 = styled(firstmainimg11)`
  position: absolute;
  right: 34rem;
  top: 35rem;
`;
export const Img12 = styled(firstmainimg12)`
  position: absolute;
  right: 23rem;
  bottom: 6rem;
`;
export const Img13 = styled(firstmainimg13)`
  position: absolute;
  right: 20rem;
  top: 30rem;
`;
export const Img14 = styled(firstmainimg14)`
  position: absolute;
  right: 4rem;
  top: 24rem;
`;
export const Img15 = styled(firstmainimg15)`
  position: absolute;
  right: 0rem;
  top: 33rem;
`;

export const Loading = () => {
  return (
    <>
      <Img1 />
      <Img2 />
      <Img3 />
      <Img4 />
      <Img5 />
      <Img6 />
      <Img7 />
      <Img8 />
      <Img9 />
      <Img10 />
      <Img11 />
      <Img12 />
      <Img13 />
      <Img14 />
      <Img15 />
      <Container>
        <Text className="text text-p">P</Text>
        <Text className="text text-r">R</Text>
        <Text className="text text-i">I</Text>
        <Text className="text text-e">E</Text>
        <Text className="text text-r-last">R</Text>
      </Container>
    </>
  );
};
