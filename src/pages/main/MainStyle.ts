import styled from 'styled-components';
import { device } from '../../styles/Media';

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const GreetingContainer = styled.div`
  position: relative;
  display: flex;
  border: 2px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#f3f8ff, #f3f8ff) padding-box,
    linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
  width: 100vw;
  padding: 0 3%;
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
