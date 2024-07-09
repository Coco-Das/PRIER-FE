import React, { useState } from 'react';
import styled from 'styled-components';

interface LinkModalProps {
  showButtons?: boolean;
  onConfirm?: (url: string) => void;
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
  all: unset; // 모든 상속된 스타일 초기화
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

const InputField = styled.input`
  font-size: 1.2rem;
  font-family: 'Paybooc', 'sans-serif';
  text-align: left;
  margin: 0;
  border: none;
  border-bottom: 2px solid #315af1;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 20px;
  margin-bottom: -20px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    text-align: left;
    color: #888;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
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

const LinkModal: React.FC<LinkModalProps> = ({ showButtons = true, onConfirm, onCancel }) => {
  const [url, setUrl] = useState('');

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm(url);
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <InputField type="text" placeholder="링크 추가" value={url} onChange={e => setUrl(e.target.value)} />
        {showButtons && (
          <ButtonContainer>
            <AgreeButton onClick={handleConfirm}>확인</AgreeButton>
            <DisagreeButton onClick={onCancel}>취소</DisagreeButton>
          </ButtonContainer>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default LinkModal;
