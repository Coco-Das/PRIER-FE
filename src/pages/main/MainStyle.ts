import styled, { keyframes } from 'styled-components';
import { device } from '../../styles/Media';

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const GreetingContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 11px;
  width: 100vw;
  padding: 0 3%;
  background-color: #f3f8ff;

  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 13px;
    border: 2px solid transparent;
    background-size: 200% 200%;
    background-image: linear-gradient(45deg, #315af1, #23be87, #773cd1, #315af1);
    background-clip: border-box;
    filter: hue-rotate(0deg);
    animation: gradientAnimation 6s ease infinite;
    z-index: -1;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const PointText = styled.h1`
  color: #315af1;
  font-weight: 700;
  margin-bottom: 2%;
  ${device.small} {
    font-size: 18px;
  }

  ${device.medium} {
    font-size: 26px;
  }

  ${device.large} {
    font-size: 30px;
  }
`;
export const MainText = styled.p`
  ${device.small} {
    font-size: 14px;
  }

  ${device.medium} {
    font-size: 20px;
  }

  ${device.large} {
    font-size: 24px;
  }
`;
export const StyledChartIcon = styled.img`
  width: 18%;
`;

export const LinkButton = styled.div`
  display: flex;
  justify-content: flex-end;
  border: none;
  border-radius: 8px;
  padding: 10px;
  margin-left: auto;
  margin-top: 1%;
  width: max-content;
  background-color: #b0c9ff;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  ${device.small} {
    font-size: 8px;
  }

  ${device.medium} {
    font-size: 14px;
  }
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
export const Title = styled.h2`
  color: #315af1;
  font-weight: 700;
  margin-top: 2%;
  margin-bottom: 2%;
  ${device.small} {
    font-size: 14px;
  }

  ${device.medium} {
    font-size: 20px;
  }

  ${device.large} {
    font-size: 24px;
  }
`;

interface OrderButtonProps {
  active: boolean;
}

export const OrderButton = styled.button<OrderButtonProps>`
  border: none;
  border-radius: 20px;
  padding: 4px 10px;
  margin-bottom: 3%;
  font-size: 14px;
  font-weight: 300;
  background-color: ${props => (props.active ? '#315af1' : 'white')};
  color: ${props => (props.active ? '#ffffff' : '#000000')};
  transition: 0.4s;
`;
const expandInput = keyframes`
  from {
    width: var(--size-button);
  }
  to {
    width: 200px;
 box-shadow: 0.7px 0.7px 1px #4188fe, -0.7px -0.7px 1px #4188fe, inset 0px 0px 0px #0e0e0e, inset 0px -0px 0px #4188fe;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  --size-button: 40px;
  color: #315af1;
`;

export const StyledInput = styled.input`
  padding-left: var(--size-button);
  height: var(--size-button);
  font-size: 16px;
  border: 1px solid #315af1;
  color: #315af1;
  outline: none;
  width: var(--size-button);
  transition: all ease 0.3s;
  background-color: white;
  border-radius: 50px;
  cursor: pointer;

  &:focus {
    width: 200px;
    cursor: text;
    animation: ${expandInput} 0.3s forwards; /* 애니메이션 적용 */
  }
`;

export const IconWrapper = styled.div`
  position: absolute;
  width: var(--size-button);
  height: var(--size-button);
  top: 0;
  left: 0;
  padding: 8px;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
  }
`;
export const NoresultWrapper = styled.div`
  width: 100%;
  height: 15rem;
  color: #828282;
  display: flex;
  justify-content: center;
  align-items: center;
`;
