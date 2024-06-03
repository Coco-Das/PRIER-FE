import { keyframes, styled } from 'styled-components';
import { ReactComponent as LogoIcon } from '../../../assets/Logo-firstMain.svg';
export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(#c163e8, transparent), linear-gradient(to top left, lime, transparent),
    linear-gradient(to top right, blue, transparent);
  background-blend-mode: screen;
  background-blend-mode: multiply;
  background-blend-mode: overlay;
  background-blend-mode: darken;
  background-blend-mode: soft-light;
  background-blend-mode: luminosity;
`;
export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LoginIntro = styled.div`
  background-color: #1c2631;
  height: 70%;
  border: none;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const IntroText = styled.h1`
  font-size: 28px;
  font-weight: 500;
  color: #ffffff;
`;
const scroll = keyframes`
  0% { transform: translateY(0); }
  10% { transform: translateY(0); }
  20% { transform: translateY(-66px); }
  30% { transform: translateY(-66px); }
  40% { transform: translateY(-132px); }
  50% { transform: translateY(-132px); }
  60% { transform: translateY(-198px); }
  70% { transform: translateY(-198px); }
  80% { transform: translateY(-264px); }
  90% { transform: translateY(-264px); }
  100% { transform: translateY(-330px); }
`;
export const RandomText = styled.div`
  width: 250px;
  height: 50px;
  overflow: hidden;
`;

export const ScrollerItem = styled.div`
  display: flex;
  height: 66px;
  animation: ${scroll} 15s ease-in infinite;
`;

export const CTALink = styled.a`
  color: #315af1;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: none;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: #ffffff;
  padding: 20px;
  width: 30%;
  height: 70%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;
export const LoginText = styled.h2`
  font-size: 24px;
  margin-bottom: 10%;
`;
export const KakaoContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 12px;
  width: 90%;
  gap: 10px;
  background-color: #fee500;
  padding: 15px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ffd400;
  }

  img {
    width: 22px;
    height: 22px;
  }
`;
export const KakaoText = styled.p`
  color: #000000 85%;
  margin: 0;
  font-family: san-serif;
`;

export const StyledLogoIcon = styled(LogoIcon)`
  width: 50%;
`;
