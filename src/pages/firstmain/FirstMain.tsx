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
import { Text2, Text3, Project1, Project2 } from './FirstMainContainer2Styles';
import { ThirdContainer, Text4, Review1, Review2, Review3, Review4, Review5 } from './FirstMainContainer3Styles';
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
        <Text3>
          다양한 카테고리의 프로젝트들이 1,536개 <br />
          등록되고 있습니다.
        </Text3>
        <Project1 />
        <Project2 />
      </FirstContainer>
      <ThirdContainer>
        <Text2>실시간으로 등록되는 리뷰들</Text2>
        <Text4>
          디자이너, 기획자,개발자 등 <br />
          다양한 사람들이 함께하고 있어요!
        </Text4>
        <Review3 />
        <Review4 />
        <Review1 />
        <Review2 />
        <Review5 />
      </ThirdContainer>
    </>
  );
}

export default FirstMain;
