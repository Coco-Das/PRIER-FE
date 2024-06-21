import styled, { keyframes } from 'styled-components';
import { ReactComponent as PointIcon } from '../../../assets/Coin.svg';

export const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: full;
  height: full;
  margin: 1% 7%;
`;

export const PointContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-right: 20px;
  padding: 20px 0;
  width: 23rem;
  max-width: 23rem;
  height: 11rem;
  max-height: 11rem;
`;

export const StyledPointIcon = styled(PointIcon)`
  width: 10rem;
  height: 5rem;
`;
const iconMove = keyframes`
  50% {
    transform: rotate(30deg);
  }
`;
export const PriceContainer = styled.div`
  transition: transform 0.3s ease-in-out;
  &:hover {
    color: #315af1;
    transform: scale(1.1, 1.1);
  }
  ${StyledPointIcon}:hover {
    animation: ${iconMove} 0.5s ease-in-out 2;
  }
`;
export const PointText = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export const BlueText = styled.p`
  color: #315af1;
`;
export const PriceText = styled.p`
  font-size: 18px;
`;
export const ChargeContainer = styled.div`
  display: flex;
  justify-content: space-around;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e1f9f0;
  width: 60rem;
  height: 11rem;
  max-height: 11rem;
  max-width: 60rem;
  padding: 20px;
`;
export const GiftWrapper = styled.div`
  margin: 1% 7% 0 9%;
  display: grid;
  grid-template-columns: repeat(2, minmax(36rem, 1fr));
  gap: 3rem;
`;
