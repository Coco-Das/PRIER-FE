import React from 'react';
import styled from 'styled-components';
interface CustomAlertProps {
  message: string;
  showButtons?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const ModalContent = styled.div`
  padding: 30px;
  width: 30%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: 1px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;

const AgreeButton = styled.button`
  background-color: #4188fe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  &:hover {
    background-color: #315af1;
    transition: 0.3s;
  }
`;
const DisagreeButton = styled.button`
  background-color: #ffffff;
  color: #315af1;
  border: 1px solid #315af1;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  padding: 10px 20px;
  &:hover {
    background-color: #f3f8ff;
    transition: 0.3s;
  }
`;

const CustomAlert: React.FC<CustomAlertProps> = ({ message, showButtons = true, onConfirm, onCancel }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        {showButtons && (
          <span className="flex justify-center items-center gap-7">
            <AgreeButton onClick={onConfirm}>확인</AgreeButton>
            <DisagreeButton onClick={onCancel}>취소</DisagreeButton>
          </span>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomAlert;
