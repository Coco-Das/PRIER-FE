import styled from 'styled-components';
import { ReactComponent as PointIcon } from '../../../assets/Coin.svg';

export const StoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: full;
  margin: 1% 7%;
`;

export const PointContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-right: 20px;
  padding: 20px;
  width: 30%;
`;
export const StyledPointIcon = styled(PointIcon)`
  width: 30%;
  height: 20%;
`;
export const PointText = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export const BlueText = styled.p`
  color: #315af1;
`;
export const ChargeContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #e1f9f0;
  width: 70%;
  padding: 20px;
`;
export const GiftWrapper = styled.div`
  margin: 0 7%;
`;
