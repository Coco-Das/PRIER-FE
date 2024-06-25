import { css, styled } from 'styled-components';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
import { ReactComponent as BaseImg } from '../../assets/BaseImg.svg';

export const LatestProjectContainer = styled.div`
  position: relative;
  width: 17rem;
  height: 22rem;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px;
  border-radius: 15px;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -0.5rem;
    margin: auto;
    width: 18rem;
    height: 23rem;
    border-radius: 17px;
    z-index: -10;
    pointer-events: none;
    background: #f3f5fb;
    transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  &:hover::after {
    filter: blur(30px);
  }

  &:hover::before {
    transform: rotate(-90deg) scaleX(1.3) scaleY(0.8);
    background: linear-gradient(-45deg, #28b381 0%, #40c9ff 100%);
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
  }
`;

export const LatestProjectWrapper = styled.div`
  width: 100%;
  height: 25rem;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(19rem, 1fr));
  transition: 0.3s ease-out;
`;

export const ProjectWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(19rem, 1fr));
  gap: 2rem;
`;
export const ProjectContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 18rem;
  height: 22rem;
  border-radius: 15px;
  padding: 0.5rem;
  cursor: pointer;
  background-color: #ffffff;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    left: -0.25rem;
    margin: auto;
    width: 18.5rem;
    height: 22.5rem;
    border-radius: 17px;
    z-index: -10;
    pointer-events: none;
    background: #f3f5fb;
  }
  &:hover::before {
    background: #4188fe;
    box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.25);
    transition: 0.3s ease-out;
  }
`;

export const ProjectImg = styled.img`
  border-radius: 10px;
  margin-bottom: 0.5rem;
  height: 50%;
  align-self: center;
`;
export const Base = styled(BaseImg)`
  margin-bottom: 0.5rem;
  width: 100%;
  height: 50%;
  align-self: center;
`;
export const LinkText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  cursor: pointer;
  &:hover {
    color: #4188fe;
  }
`;
export const SmallText = styled.p`
  font-size: 15px;
  font-weight: 300;
  color: #828282;
  cursor: pointer;
`;
export const colors = ['#FFD09B', '#CEE7FF', '#E1F9F0', '#ACA4D5', '#4188FE'];

export const TagContainer = styled.div`
  font-size: 14px;
  padding: 0.1rem 0.5rem;
  background-color: ${props => props.color};
  font-weight: 300;
  border-radius: 15px;
  margin-right: 10px;
`;
//프로필
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
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  background-color: white;
  width: 22rem;
  height: 9rem;
  padding: 20px;
  margin-bottom: 1rem;
`;
export const ReviewText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const ReviewProject = styled.h1`
  font-size: 20px;
  margin-top: 1rem;
`;

export const ReviewTeam = styled.h2`
  color: #315af1;
  font-size: 18px;
`;

//기프티콘
export const CardContainer = styled.div`
  cursor: pointer;
  perspective: 1000px;
  display: flex;
  width: 35rem;
  height: 13.5rem;
  max-height: 13.5rem;
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
  border: 1.5px solid transparent;
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
  border: 2px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;
export const GiftTitle = styled.h1`
  color: #315af1;
  font-weight: 500;
  font-size: 22px;
  max-width: 10rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const PurchaseButton = styled.button`
  display: flex;
  font-size: 1rem;
  align-items: center;
  justify-content: center;
  width: 7rem;
  padding: 0.5rem 0.5rem;
  align-self: end;
  border: 1px solid #315af1;
  border-radius: 10px;
  color: #315af1;
  -webkit-transition: all 0.5s ease-in;
  -moz-transition: all 0.5s ease-in;
  transition: 0.5s ease-out;
  &:hover {
    background: #4188fe;
    color: white;
    -webkit-transition: all 0.5s ease-out;
    -moz-transition: all 0.5s ease-out;
    transition: all 0.5s ease-out;
  }

  &:hover::before {
    -webkit-animation: sh02 0.5s 0s linear;
    -moz-animation: sh02 0.5s 0s linear;
    animation: sh02 0.5s 0s linear;
  }
  &::before {
    content: '';
    display: block;
    width: 0px;
    height: 86%;
    position: absolute;
    top: 7%;
    left: 0%;
    opacity: 0;
    background: #fff;
    box-shadow: 0 0 50px 30px #fff;
    -webkit-transform: skewX(-20deg);
    -moz-transform: skewX(-20deg);
    -ms-transform: skewX(-20deg);
    -o-transform: skewX(-20deg);
    transform: skewX(-20deg);
  }
  @keyframes sh02 {
    from {
      opacity: 0;
      left: 0%;
    }

    50% {
      opacity: 1;
    }

    to {
      opacity: 0;
      left: 100%;
    }
  }
`;

export const GiftTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  word-break: break-all;
  white-space: normal;
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
