import styled, { keyframes, css } from 'styled-components';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const animationCSS = css`
  animation: ${fadeInUp} 1.5s ease-in-out;
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

export const Logo = styled.img`
  width: auto;
  height: 9rem;
  margin-top: -10rem;
  position: relative;
  left: 2rem;
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

// const animatedImgStyle = css`
//   position: absolute;
//   ${animationCSS};
// `;

export const Img1 = styled.img`
  position: absolute;
  width: 11%;
  height: auto;
  ${animationCSS};
  left: 4rem;
  top: 1rem;
`;

export const Img2 = styled.img`
  position: absolute;
  width: 10%;
  height: auto;
  ${animationCSS};
  left: 18rem;
  top: 2rem;
`;

export const Img3 = styled.img`
  position: absolute;
  width: 10%;
  height: auto;
  ${animationCSS};
  left: 35rem;
  top: 3rem;
`;

export const Img4 = styled.img`
  position: absolute;
  width: 18%;
  height: auto;
  ${animationCSS};
  right: 13rem;
  top: 0.5rem;
`;

export const Img5 = styled.img`
  position: absolute;
  width: 8%;
  height: auto;
  ${animationCSS};
  right: 4rem;
  top: 4rem;
`;

export const Img6 = styled.img`
  position: absolute;
  width: 9%;
  height: auto;
  ${animationCSS};
  left: 14rem;
  top: 14rem;
`;

export const Img7 = styled.img`
  position: absolute;
  width: 15%;
  height: auto;
  ${animationCSS};
  left: 6rem;
  top: 20rem;
`;

export const Img8 = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  ${animationCSS};
  left: -3rem;
  top: 34rem;
`;

export const Img9 = styled.img`
  position: absolute;
  width: 8%;
  height: auto;
  ${animationCSS};
  left: 18rem;
  top: 41rem;
`;

export const Img10 = styled.img`
  position: absolute;
  width: 20%;
  height: auto;
  ${animationCSS};
  left: 25rem;
  top: 38rem;
`;

export const Img11 = styled.img`
  position: absolute;
  width: 7%;
  height: auto;
  ${animationCSS};
  right: 34rem;
  top: 35rem;
`;

export const Img12 = styled.img`
  position: absolute;
  width: 10%;
  height: auto;
  ${animationCSS};
  right: 23rem;
  bottom: 6rem;
`;

export const Img13 = styled.img`
  position: absolute;
  width: 7%;
  height: auto;
  ${animationCSS};
  right: 20rem;
  top: 28rem;
`;

export const Img14 = styled.img`
  position: absolute;
  width: 13%;
  height: auto;
  ${animationCSS};
  right: 4rem;
  top: 24rem;
`;

export const Img15 = styled.img`
  position: absolute;
  width: 25%;
  height: auto;
  ${animationCSS};
  right: 0rem;
  top: 33rem;
`;
