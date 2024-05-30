import styled from 'styled-components';
import * as React from 'react';
import Button from '@mui/material/Button';

//import { ReactComponent as firstmainimg1 } from '../../assets/FirstMainImg1.svg';
import firstmainimg2 from '../../assets/FirstMainImg2.svg';
import firstmainimg3 from '../../assets/FirstMainImg3.svg';
import firstmainimg4 from '../../assets/FirstMainImg4.svg';
import firstmainimg5 from '../../assets/FirstMainImg5.svg';
import firstmainimg6 from '../../assets/FirstMainImg6.svg';
import firstmainimg7 from '../../assets/FirstMainImg7.svg';
import firstmainimg8 from '../../assets/FirstMainImg8.svg';
import firstmainimg9 from '../../assets/FirstMainImg9.svg';
import firstmainimg10 from '../../assets/FirstMainImg10.svg';
import firstmainimg11 from '../../assets/FirstMainImg11.svg';
import firstmainimg12 from '../../assets/FirstMainImg12.svg';
import firstmainimg13 from '../../assets/FirstMainImg13.svg';
import firstmainimg14 from '../../assets/FirstMainImg14.svg';
import firstmainimg15 from '../../assets/FirstMainImg15.svg';
import firstmainimg16 from '../../assets/FirstMainImg16.svg';
import { ReactComponent as logo } from '../../assets/Logo-firstMain.svg';

export const FirstMainContainer = styled.div`
  height: 100vh;
  background-color: #1d2732;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled(logo)`
  margin-bottom: 1.5rem;
  width: 30rem;
  height: 10rem;
  margin-top: -5rem;
`;
export const Text = styled.h1`
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
`;
const StyledButton = styled(Button)`
  background: linear-gradient(90deg, rgba(49, 90, 241, 1) 0%, rgba(119, 60, 209, 1) 100%);
  border-radius: 15px;
  width: 12rem;
  height: 3.3rem;
  position: relative;
  box-shadow: 0px 4px 4px 0px rgba(36, 189, 139, 0.51);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '지금 시작하기';
    white-space: nowrap;
    background: linear-gradient(
      90deg,
      rgba(65, 136, 254, 1) 0%,
      rgba(35, 190, 135, 1) 45.5%,
      rgba(200, 102, 250, 1) 74.5%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    font-size: 22px;
    font-weight: 700;
    position: absolute;
  }
`;

export const StartButton = styled(({ ...props }) => <StyledButton {...props} />)``;
//StartButton은 StyledButton을 래핑하여 Link 컴포넌트와 연결합니다.
