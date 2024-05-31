import styled from 'styled-components';
import * as React from 'react';
import Button from '@mui/material/Button';

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

export const FirstContainer = styled.div`
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 */
`;

export const Logo = styled(logo)`
  width: 30rem;
  height: 10rem;
  margin-top: 15rem;
  position: relative;
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
`;
const StyledButton = styled(Button)`
  position: relative;

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
