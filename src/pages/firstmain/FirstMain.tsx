import React from 'react';
import { Link } from 'react-router-dom';

import {
  FirstMainContainer,
  Img1,
  Img2,
  Img3,
  Img4,
  Img5,
  Img6,
  Img7,
  Img8,
  Img9,
  Img10,
  Img11,
  Img12,
  Img13,
  Img14,
  Img15,
  Logo,
  StartButton,
  Text,
} from './FirstMainStyles';
function FirstMain() {
  return (
    <FirstMainContainer>
      <Logo />
      <Text>테스트 그리고 피드백, 당신의 창조를 세상으로 연결합니다</Text>
      <StartButton component={Link} to="/main" />
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
    </FirstMainContainer>
  );
}

export default FirstMain;
