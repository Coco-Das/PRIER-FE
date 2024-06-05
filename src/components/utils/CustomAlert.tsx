import React from 'react';
import styled from 'styled-components';
interface CustomAlertProps {
  message: string;
  onConfirm: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: blur(10);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  padding: 20px;
  width: 30%;
  text-align: center;
  border: 1px solid transparent;
  border-radius: 20px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px;
  background-color: #4188fe;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #315af1;
  }
`;

const CustomAlert: React.FC<CustomAlertProps> = ({ message, onConfirm }) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <Button onClick={onConfirm}>확인</Button>
        <Button onClick={onConfirm}>취소</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CustomAlert;
