import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Text2, Text3, Project1, Project2, Project3, Project4, Project5, Project6 } from './FirstMainContainer2Styles';
import { ThirdContainer, Text4, Review1, Review2, Review3, Review4, Review5 } from './FirstMainContainer3Styles';
import firstmainimg1 from '../../assets/FirstMainImg1.png';
import firstmainimg2 from '../../assets/FirstMainImg2.png';
import firstmainimg3 from '../../assets/FirstMainImg3.png';
import firstmainimg4 from '../../assets/FirstMainImg4.png';
import firstmainimg5 from '../../assets/FirstMainImg5.png';
import firstmainimg6 from '../../assets/FirstMainImg6.png';
import firstmainimg7 from '../../assets/FirstMainImg7.png';
import firstmainimg8 from '../../assets/FirstMainImg8.png';
import firstmainimg9 from '../../assets/FirstMainImg9.png';
import firstmainimg10 from '../../assets/FirstMainImg10.png';
import firstmainimg11 from '../../assets/FirstMainImg11.png';
import firstmainimg12 from '../../assets/FirstMainImg12.png';
import firstmainimg13 from '../../assets/FirstMainImg13.png';
import firstmainimg14 from '../../assets/FirstMainImg14.png';
import firstmainimg15 from '../../assets/FirstMainImg15.png';
import logo from '../../assets/Logo-firstMain.png';
import ProjectImg1 from '../../assets/ProjectImg1.png';
import ProjectImg2 from '../../assets/ProjectImg2.png';
import ProjectImg3 from '../../assets/ProjectImg3.png';
import ProjectImg4 from '../../assets/ProjectImg4.png';
import ProjectImg5 from '../../assets/ProjectImg5.png';
import ProjectImg6 from '../../assets/ProjectImg6.png';

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
  const endRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
  useEffect(() => {
    const handleEndScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            navigate('/login');
          }, 700);
        }
      });
    };

    const endObserver = new IntersectionObserver(handleEndScroll, {
      threshold: 1.0,
    });

    if (endRef.current) {
      endObserver.observe(endRef.current);
    }

    return () => {
      if (endRef.current) {
        endObserver.unobserve(endRef.current);
      }
    };
  }, []);

  return (
    <>
      <GlobalStyle />
      <FirstContainer>
        <Logo src={logo} />
        <Text>테스트 그리고 피드백, 당신의 창조를 세상으로 연결합니다</Text>
        <Link to="/login">
          <StartButton>지금 시작하기</StartButton>
        </Link>
        <Img1 src={firstmainimg1} />
        <Img2 src={firstmainimg2} />
        <Img3 src={firstmainimg3} />
        <Img4 src={firstmainimg4} />
        <Img5 src={firstmainimg5} />
        <Img6 src={firstmainimg6} />
        <Img7 src={firstmainimg7} />
        <Img8 src={firstmainimg8} />
        <Img9 src={firstmainimg9} />
        <Img10 src={firstmainimg10} />
        <Img11 src={firstmainimg11} />
        <Img12 src={firstmainimg12} />
        <Img13 src={firstmainimg13} />
        <Img14 src={firstmainimg14} />
        <Img15 src={firstmainimg15} />
      </FirstContainer>
      <FirstContainer ref={secondContainerRef}>
        <Text2>프리어와 함께하는 프로젝트</Text2>
        <Text3>
          다양한 카테고리의 프로젝트들이 1,536개 <br />
          등록되고 있습니다.
        </Text3>
        <Project1 src={ProjectImg1} />
        <Project2 src={ProjectImg2} />
        <Project3 src={ProjectImg3} />
        <Project4 src={ProjectImg4} />
        <Project5 src={ProjectImg5} />
        <Project6 src={ProjectImg6} />
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
      <div
        ref={endRef}
        style={{
          height: '800px',
          width: '100%',
        }}
      />
    </>
  );
};

export default FirstMain;
