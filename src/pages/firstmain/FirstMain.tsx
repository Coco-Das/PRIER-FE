import React from 'react';
import { Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import {
  FirstContainer,
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
} from './FirstMainContainer1Styles';
import { Text2, Text3 } from './FirstMainContainer2Styles';
const GlobalStyle = createGlobalStyle`
  body {
    background-color: #1C2631; /* 원하는 배경색으로 설정 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;
function FirstMain() {
  return (
    <>
      <GlobalStyle />
      <FirstContainer>
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
      </FirstContainer>
      <FirstContainer>
        <Text2>프리어와 함께하는 프로젝트</Text2>
        <Text3>다양한 카테고리의 프로젝트들이 1,536개</Text3>
        <Text3>등록되고 있습니다.</Text3>
      </FirstContainer>
    </>
  );
}

export default FirstMain;
