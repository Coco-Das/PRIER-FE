import React, { useEffect, useRef } from 'react';
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
    background-color: #1C2631;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @keyframes scaleUp {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(10px);
    }
  }

  .scaleUp {
    animation: scaleUp 0.5s forwards;
  }

  .fadeOutDown {
    animation: fadeOutDown 0.5s forwards;
  }
`;

const FirstMain = () => {
  const secondContainerRef = useRef<HTMLDivElement>(null);
  const thirdContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
          target.classList.add('scaleUp');
          target.classList.remove('fadeOutDown');
        } else {
          target.classList.add('fadeOutDown');
          target.classList.remove('scaleUp');
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.1,
    });

    const secondContainer = secondContainerRef.current;
    if (secondContainer) {
      const children = Array.from(secondContainer.children);
      children.forEach(child => observer.observe(child));
    }

    const thirdContainer = thirdContainerRef.current;
    if (thirdContainer) {
      const children = Array.from(thirdContainer.children);
      children.forEach(child => observer.observe(child));
    }

    return () => {
      if (secondContainer) {
        const children = Array.from(secondContainer.children);
        children.forEach(child => observer.unobserve(child));
      }

      if (thirdContainer) {
        const children = Array.from(thirdContainer.children);
        children.forEach(child => observer.unobserve(child));
      }
    };
  }, []);

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
      <FirstContainer ref={secondContainerRef}>
        <Text2>프리어와 함께하는 프로젝트</Text2>
        <Text3>
          다양한 카테고리의 프로젝트들이 1,536개 <br />
          등록되고 있습니다.
        </Text3>
        <Project1 />
        <Project2 />
      </FirstContainer>
      <ThirdContainer ref={thirdContainerRef}>
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
};

export default FirstMain;
