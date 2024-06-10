import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
import CloseIcon from '@mui/icons-material/Close';

interface CoinLogProps {
  onCancel: () => void;
}

const LogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const LogContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 60%;
  padding: 20px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
  cursor: pointer;
`;
const LogTitle = styled.h2`
  color: #315af1;
`;
const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CoinLog: React.FC<CoinLogProps> = ({ onCancel }) => {
  return (
    <LogOverlay>
      <LogContainer>
        <CloseButton onClick={onCancel} />
        <PointIcon className="w-20" />
        <LogTitle>사용 로그</LogTitle>
      </LogContainer>
    </LogOverlay>
  );
};
export default CoinLog;
