import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import StarGif from '../../assets/star-unscreen.gif';
interface QuestSuccessProps {
  onClose: () => void;
}

const SuccessWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(45deg, rgba(119, 60, 209, 0.7), rgba(49, 90, 241, 0.8), rgba(35, 190, 135, 0.7));
  z-index: 5;
`;
const GifWrapper = styled.div`
  display: inline-block;
  img {
    animation: play 1s steps(10) infinite;
  }

  @keyframes play {
    from {
      background-position: 0;
    }
    to {
      background-position: -1000px;
    }
  }
`;
const SuccessTitle = styled.h1`
  color: white;
  font-size: 4rem;
  font-weight: bold;
  text-shadow: 0 0 7px #62c7a3, 0 0 12px #828282;
`;
const SuccessSubTitle = styled.h2`
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 7px #62c7a3, 0 0 12px #828282;
`;
const TextWhite = styled.p`
  color: white;
`;
const QuestSuccess: React.FC<QuestSuccessProps> = ({ onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <SuccessWrapper onClick={onClose}>
      <span className="text-center">
        <SuccessSubTitle>퀘스트 달성 성공</SuccessSubTitle>
        <SuccessTitle>오늘의 퀘스트를 달성했습니다</SuccessTitle>
      </span>
      <GifWrapper>
        <img src={StarGif} style={{ width: '800px' }} />
      </GifWrapper>
      <span className="text-center">
        <TextWhite>오늘도 함께 해주셔서 감사해요</TextWhite>
        <TextWhite>퀘스트를 달성하여 코어를 모으면 보상을 받을 수 있어요</TextWhite>
        <TextWhite className="mt-6" style={{ color: '#E8E0F1' }}>
          클릭하여 돌아가기
        </TextWhite>
      </span>
    </SuccessWrapper>
  );
};
export default QuestSuccess;
