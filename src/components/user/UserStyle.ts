import { css, styled } from 'styled-components';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';

export const ProjectContainer = styled.div`
  border: none;
  border-radius: 15px;
  padding: 0.5rem;
  width: max-content;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
`;
export const LinkText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  cursor: pointer;
`;
export const ProfileContainer = styled.div`
  position: absolute;
  top: 64px;
  right: 10px;
  border: 1px solid none;
  border-radius: 20px;
  background-color: white;
  width: 28%;
  padding: 25px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
`;
export const Title = styled.h1`
  color: #315af1;
  font-weight: 500;
  font-size: 22px;
`;
export const MiddleText = styled.h2`
  font-size: 18px;
`;
export const PointText = styled.p`
  color: #315af1;
  font-size: 16px;
`;
export const StyledPointIcon = styled(PointIcon)`
  width: 40px;
  height: 40px;
  -webkit-animation: icon-move 1s ease-in-out 3;
  @-webkit-keyframes icon-move {
    50% {
      -webkit-transform: rotate(30deg);
    }
  }
`;

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 2%;
`;

export const Filler = styled.div<{ percentage: number }>`
  height: 10px;
  width: ${({ percentage }) => percentage}%;
  background-color: #4285f4;
  border-radius: inherit;
  position: relative;
  overflow: hidden;
  transition: width 2s ease-in;

  &::before {
    content: '';
    position: absolute;
    top: -20;
    left: 5;
    width: 100%;
    height: 10px;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    animation: shine 2s 10;
  }

  @keyframes shine {
    0% {
      transform: translateX(-20%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;

export interface ProgressBarProps {
  percentage: number;
}
// 리뷰

export const ReviewContainer = styled.div`
  border: none;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  backgroud-color: white;
  width: 100%;
  padding: 20px;
`;

export const ReviewProject = styled.h1`
  font-size: 20px;
  margin-top: 5%;
`;

export const ReviewTeam = styled.h2`
  color: #315af1;
  font-size: 18px;
`;

//기프티콘
export const CardContainer = styled.div`
  perspective: 1000px;
  display: flex;
  width: 35rem;
  height: 13rem;
  max-height: 13rem;
`;

export const Card = styled.div<{ isFlipped: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  ${props =>
    props.isFlipped &&
    css`
      transform: rotateY(180deg);
    `}
`;
export const CardFront = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;

export const CardBack = styled.div`
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  padding: 30px;
  transform: rotateY(180deg);
  border-radius: 20px;
  background: linear-gradient(45deg, rgba(49, 90, 241, 0.3), rgba(35, 190, 135, 0.3), rgba(119, 60, 209, 0.3));
`;

export const GiftTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1em;
`;

export const GiftImg = styled.img`
  width: 40%;
  margin-right: 20px;
  border: none;
  border-radius: 15px;
`;
export const DescriptionText = styled.p`
  font-size: 18px;
`;

export const SoldOutContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  backdrop-filter: blur(50px);
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
  }
`;
export const SoldOutFlag = styled.div`
  text-align: center;
  border: 1px solid #a4000c;
  border-radius: 5px;
  padding: 0.5em 1em;
  background: rgba(245, 91, 102, 0.5);
  color: #a4000c;
  z-index: 3;
  position: absolute;
`;
