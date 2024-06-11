import React from 'react';
import { styled } from 'styled-components';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
interface PaymentModalProps {
  productName: string;
  onConfirm: () => void;
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
  border: 1px solid transparent;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
  cursor: pointer;
`;
const PaymentText = styled.h2`
  color: #315af1;
`;
const PaymentButton = styled.button`
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

const GiftPurchaseModal: React.FC<PaymentModalProps> = ({ productName, onConfirm, onCancel }) => {
  return (
    <PaymentOverlay>
      <PaymentContainer>
        <PointIcon className="w-20" />
        <PaymentText>{productName}을 구매하시겠습니까?</PaymentText>
        <span className="flex mt-36 gap-10">
          <PaymentButton className="relative" onClick={onConfirm}>
            확인
          </PaymentButton>
          <PaymentButton onClick={onCancel}>취소</PaymentButton>
        </span>
      </PaymentContainer>
    </PaymentOverlay>
  );
};
export default GiftPurchaseModal;
