import styled, { keyframes, css } from 'styled-components';

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

const fadeOutDown = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const animationCSS = css`
  &.fadeInUp {
    animation: ${fadeInUp} 1s forwards;
  }
  &.fadeOutDown {
    animation: ${fadeOutDown} 1s forwards;
  }
`;

export const Text2 = styled.h1`
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(245, 91, 102, 1) 0%,
    rgba(193, 99, 232, 1) 50.01000165939331%,
    rgba(187, 104, 253, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 3rem;
  ${animationCSS};
`;
export const Text3 = styled.h1`
  position: relative;
  background: linear-gradient(
    90deg,
    rgba(250, 246, 143, 1) 0%,
    rgba(99, 208, 232, 1) 50.01000165939331%,
    rgba(109, 88, 233, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 3rem;
  ${animationCSS};
`;

export const Project1 = styled.img`
  position: absolute;
  left: 17rem;
  top: 33rem;
  width: 300px;
  height: auto;
  ${animationCSS};
`;
export const Project2 = styled.img`
  position: absolute;
  right: 15rem;
  top: 35rem;
  width: 300px;
  height: auto;
  ${animationCSS};
`;
export const Project3 = styled.img`
  position: absolute;
  left: 9rem;
  top: 22rem;
  width: 300px;
  height: auto;
  border-radius: 30px;

  ${animationCSS};
`;
export const Project4 = styled.img`
  position: absolute;
  left: 22rem;
  top: 1rem;
  width: 300px;
  height: auto;
  border-radius: 30px;

  ${animationCSS};
`;
export const Project5 = styled.img`
  position: absolute;
  right: 10rem;
  top: 10rem;
  width: 250px;
  height: auto;
  border-radius: 30px;

  ${animationCSS};
`;
export const Project6 = styled.img`
  position: absolute;
  right: 27rem;
  top: 5rem;
  width: 300px;
  height: auto;
  border-radius: 30px;

  ${animationCSS};
`;
