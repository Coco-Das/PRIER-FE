import React from 'react';
import { keyframes, styled } from 'styled-components';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
interface PaymentModalProps {
  amount: number;
  itemName: string;
  onConfirm: (amount: number, itemName: string) => void;
  onCancel: () => void;
}

const PaymentOverlay = styled.div`
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
const PaymentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  height: 60%;
  padding: 20px;
  border: 1.5px solid transparent;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
  cursor: pointer;
`;
const PaymentText = styled.h2`
  color: #315af1;
  margin-bottom: 0.5rem;
`;
const AlertText = styled.p`
  font-size: 1rem;
  text-decolation: underline;
`;
const PaymentButton = styled.button`
  background-color: #fee500;
  padding: 10px 50px;
  border-radius: 10px;
  border: 1px solid #f3f5fb;
  &:hover {
    background-color: #ffd400;
    color: #191919;
    transition: 0.5s;
    border: 1px solid #191919;
  }
`;
const CancleButton = styled.button`
  background-color: #f3f5fb;
  padding: 10px 50px;
  border-radius: 10px;
  border: 1px solid #f3f5fb;
  &:hover {
    background-color: #f3f8ff;
    color: #315af1;
    transition: 0.5s;
    border: 1px solid #315af1;
  }
`;
const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-10px);
    opacity: 1;
  }
`;
const Tooltip = styled.div`
  position: absolute;
  bottom: 360px; // 버튼 위에 위치하도록 조정
  background-color: white;
  border: 1px solid red;
  border-radius: 50px;
  padding: 5px 10px;
  color: red;
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  animation: ${bounce} 0.7s ease-in-out 3, fadeOut 0.6s forwards 4s;

  @keyframes fadeOut {
    to {
      opacity: 0;
    }
  }
`;
const PaymentModal: React.FC<PaymentModalProps> = ({ amount, itemName, onConfirm, onCancel }) => {
  return (
    <PaymentOverlay>
      <PaymentContainer>
        <PointIcon className="w-20" />
        <PaymentText>{amount} 원을 충전하시겠습니까?</PaymentText>
        <AlertText>충전 후 포인트를 사용할 시에는 취소가 불가합니다.</AlertText>
        <span className="flex mt-36 gap-8">
          <Tooltip>카카오 페이로 결제하기</Tooltip>
          <PaymentButton className="relative" onClick={() => onConfirm(amount, itemName)}>
            결제
          </PaymentButton>
          <CancleButton onClick={onCancel}>취소</CancleButton>
        </span>
      </PaymentContainer>
    </PaymentOverlay>
  );
};
export default PaymentModal;
