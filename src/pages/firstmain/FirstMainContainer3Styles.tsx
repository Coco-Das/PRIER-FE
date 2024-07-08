import styled, { keyframes, css } from 'styled-components';
import ReviewImg1 from '../../assets/FirstMainReview1.png';
import ReviewImg2 from '../../assets/FirstMainReview2.png';
import ReviewImg3 from '../../assets/FirstMainReview3.png';
import ReviewImg4 from '../../assets/FirstMainReview4.png';
import ReviewImg5 from '../../assets/FirstMainReview5.png';
import ReviewImg6 from '../../assets/FirstMainReview6.png';

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
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
    transform: translateY(50px);
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

export const ThirdContainer = styled.div`
  height: 120vh;
  display: flex;
  flex-direction: column;
  align-items: left;
  overflow: hidden;
  justify-content: center;
  position: relative; /* 자식 요소의 절대 위치를 위한 상대 위치 */
  padding-left: 6rem;
`;

export const Text4 = styled.h1`
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
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 3rem;
  ${animationCSS};
`;

// ReviewImg 컴포넌트를 img 태그로 바꾸고 styled-components로 스타일링 적용
const ReviewImage = styled.img`
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.8);
  ${animationCSS};
`;

export const Review2 = styled(ReviewImage).attrs({
  src: ReviewImg2,
  alt: 'Review1',
})`
  right: 24rem;
  top: 20rem;
`;

export const Review5 = styled(ReviewImage).attrs({
  src: ReviewImg5,
  alt: 'Review2',
})`
  right: 30rem;
  top: 27rem;
`;

export const Review3 = styled(ReviewImage).attrs({
  src: ReviewImg3,
  alt: 'Review3',
})`
  right: 8rem;
  top: 32rem;
`;

export const Review4 = styled(ReviewImage).attrs({
  src: ReviewImg4,
  alt: 'Review4',
})`
  right: 5rem;
  top: 15rem;
`;

export const Review6 = styled(ReviewImage).attrs({
  src: ReviewImg6,
  alt: 'Review5',
})`
  right: 2rem;
  top: 23rem;
`;

export const Review1 = styled(ReviewImage).attrs({
  src: ReviewImg1,
  alt: 'Review6',
})`
  right: 22rem;
  top: 10rem;
`;
