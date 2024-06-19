import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
}

const scaleIn = keyframes`
  from {
    transform: scale(0.5);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 50;
`;

const ImageContainer = styled.div<{ visible: boolean }>`
  position: relative;
  max-width: 100%;
  max-height: 100%;
  animation: ${({ visible }) => (visible ? scaleIn : '')} 0.5s forwards;
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  right: -25px; /* 이미지 오른쪽으로 10px */
  top: -25px;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
  z-index: 10;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const ImageModal: React.FC<ImageModalProps> = ({ imageUrl, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      setVisible(true);
    }
  }, [imageUrl]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 500); // scaleOut 애니메이션 시간과 일치
  };

  if (!imageUrl) return null;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const modalImage = e.currentTarget as HTMLImageElement;

    if (width === height) {
      modalImage.style.width = '700px';
    } else {
      modalImage.style.width = '900px';
    }
  };

  return (
    <ModalBackground className="fixed inset-0 flex items-center overflow-auto justify-center bg-black bg-opacity-75 z-50">
      <ImageContainer visible={visible} className="relative max-w-full max-h-full">
        <ImageWrapper>
          <CloseButton onClick={handleClose} className="absolute text-white text-xl">
            &times;
          </CloseButton>
          <img src={imageUrl} alt="Modal" className="max-w-full max-h-full block my-[30px]" onLoad={handleImageLoad} />
        </ImageWrapper>
      </ImageContainer>
    </ModalBackground>
  );
};

export default ImageModal;
