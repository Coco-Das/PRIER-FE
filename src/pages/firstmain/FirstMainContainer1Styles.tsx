import styled, { keyframes, css } from 'styled-components';
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
import { ReactComponent as logo } from '../../assets/Logo-firstMain.svg';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationCSS = css`
  animation: ${fadeInUp} 1s ease-in-out;
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

export const Logo = styled(logo)`
  width: 30rem;
  height: 10rem;
  margin-top: -10rem;
  position: relative;
  ${animationCSS};
`;

export const Text = styled.h1`
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(65, 136, 254, 1) 0%,
    rgba(35, 190, 135, 1) 45.5%,
    rgba(200, 102, 250, 1) 74.5%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 3rem;
  ${animationCSS};
  animation-delay: 0.2s;
`;

const ani = keyframes`
  0% {
    background-position: 0%;
  }

  100% {
    background-position: 400%;
  }
`;

export const StartButton = styled.button`
  text-decoration: none;
  position: relative;
  border: none;
  font-size: 22px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  width: 12rem;
  height: 3.3rem;
  text-align: center;
  background: linear-gradient(
    90deg,
    rgba(65, 136, 254, 1) 0%,
    rgba(35, 190, 135, 1) 45.5%,
    rgba(200, 102, 250, 1) 74.5%,
    rgba(65, 136, 254, 1) 100%
  );
  background-size: 400%;
  border-radius: 15px;
  z-index: 1;
  animation: ${ani} 10s linear infinite;
  border: none;

  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    z-index: -1;
    background: linear-gradient(
      90deg,
      rgba(65, 136, 254, 1) 0%,
      rgba(35, 190, 135, 1) 45.5%,
      rgba(200, 102, 250, 1) 74.5%,
      rgba(65, 136, 254, 1) 100%
    );
    background-size: 400%;
    border-radius: 15px;
    transition: 1s;
    filter: blur(5px);
    animation: ${ani} 10s linear infinite;
  }

  &:hover::before {
    filter: blur(15px);
    animation: none;
  }
  &:active {
    background: linear-gradient(
      32deg,
      rgba(65, 136, 254, 1) 0%,
      rgba(35, 190, 135, 1) 45.5%,
      rgba(200, 102, 250, 1) 74.5%,
      rgba(65, 136, 254, 1) 100%
    );
  }
`;

const animatedImgStyle = css`
  position: absolute;
  ${animationCSS};
`;

export const Img1 = styled(firstmainimg1)`
  ${animatedImgStyle}
  left: 4rem;
  top: 1rem;
  animation-delay: 0.6s;
`;

export const Img2 = styled(firstmainimg2)`
  ${animatedImgStyle}
  left: 18rem;
  top: 2rem;
  animation-delay: 0.8s;
`;

export const Img3 = styled(firstmainimg3)`
  ${animatedImgStyle}
  left: 32rem;
  top: 1rem;
  animation-delay: 1s;
`;

export const Img4 = styled(firstmainimg4)`
  ${animatedImgStyle}
  right: 13rem;
  top: 0.5rem;
  animation-delay: 1.2s;
`;

export const Img5 = styled(firstmainimg5)`
  ${animatedImgStyle}
  right: 4rem;
  top: 4rem;
  animation-delay: 1.4s;
`;

export const Img6 = styled(firstmainimg6)`
  ${animatedImgStyle}
  left: 14rem;
  top: 14rem;
  animation-delay: 1.6s;
`;

export const Img7 = styled(firstmainimg7)`
  ${animatedImgStyle}
  left: 6rem;
  top: 20rem;
  animation-delay: 1.8s;
`;

export const Img8 = styled(firstmainimg8)`
  ${animatedImgStyle}
  left: -3rem;
  top: 34rem;
  animation-delay: 2s;
`;

export const Img9 = styled(firstmainimg9)`
  ${animatedImgStyle}
  left: 18rem;
  top: 41rem;
  animation-delay: 2.2s;
`;

export const Img10 = styled(firstmainimg10)`
  ${animatedImgStyle}
  left: 25rem;
  top: 38rem;
  animation-delay: 2.4s;
`;

export const Img11 = styled(firstmainimg11)`
  ${animatedImgStyle}
  right: 34rem;
  top: 35rem;
  animation-delay: 2.6s;
`;

export const Img12 = styled(firstmainimg12)`
  ${animatedImgStyle}
  right: 23rem;
  bottom: 6rem;
  animation-delay: 2.8s;
`;

export const Img13 = styled(firstmainimg13)`
  ${animatedImgStyle}
  right: 20rem;
  top: 30rem;
  animation-delay: 3s;
`;

export const Img14 = styled(firstmainimg14)`
  ${animatedImgStyle}
  right: 4rem;
  top: 24rem;
  animation-delay: 3.2s;
`;

export const Img15 = styled(firstmainimg15)`
  ${animatedImgStyle}
  right: 0rem;
  top: 33rem;
  animation-delay: 3.4s;
`;
