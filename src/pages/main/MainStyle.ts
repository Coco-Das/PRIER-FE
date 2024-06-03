import styled from 'styled-components';
import { device } from '../../styles/Media';
import { ReactComponent as ChartIcon } from '../../assets/main_chart.svg';

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const GreetingContainer = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  width: 100vw;
  padding: 0 3%;
  background-color: #f3f8ff;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 21px;
    border: 2px solid transparent;
    background-image: linear-gradient(45deg, #315af1, #23be87, #773cd1);
    background-clip: border-box;
    filter: hue-rotate(0deg);
    animation: huerotate 3s infinite linear;
    z-index: -1;
  }

  @keyframes huerotate {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
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
export const StyledChartIcon = styled(ChartIcon)`
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
  &:hover {
    background-color: #315af1;
    color: #ffffff;
    transition: 0.7s;
  }
`;
export const Title = styled.h2`
  color: #315af1;
  font-weight: 700;
  margin-top: 2%;
  margin-bottom: 1%;
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
  padding: 4px 6px;
  margin-bottom: 3%;
  font-size: 14px;
  font-weight: 300;
  background-color: ${props => (props.active ? '#315af1' : '#f0f0f0')};
  color: ${props => (props.active ? '#ffffff' : '#000000')};
`;

export const SearchInputWrapper = styled.div`
  input {
    position: relative;
    background: none;
    border: none;
    outline: none;
    width: 160px;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    line-height: 18px;
    margin: 5px 0;
    font-size: 18px;
    -webkit-appearance: none;
    transition: all 0.6s ease;
    cursor: pointer;
    & + div {
      position: relative;
      height: 28px;
      width: 100%;
      margin: -28px 0 0 0;
      svg {
        display: block;
        position: absolute;
        height: 28px;
        width: 160px;
        right: 0;
        top: 0;
        fill: none;
        stroke: #315AF1;
        stroke-width: 1.5px;
        stroke-dashoffset: 212.908 + 59;
        stroke-dasharray: 59 212.908;
        transition: all 0.6s ease;
      }
    }

    &:focus {
      width: 160px;
      padding: 0 4px;
      cursor: text;
      & + div {
        svg {
          stroke-dasharray: 150 212.908;
          stroke-dashoffset: 300;
        }
      }
    }
  }
}

* {
  box-sizing: inherit;
  &:before,
  &:after {
    box-sizing: inherit;
  }
}
}`;
