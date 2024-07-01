/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Lottie from '../utils/LottieComponent';
import Alert from '../../assets/Alert.json';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../states/user/UserStore';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(60, 60, 60, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;

const AlarmTitle = styled.h1`
  width: 100%;
  margin-top: 0.5rem;
  text-align: center;
`;

const AlarmText = styled.h2<{ isVisible: any }>`
  width: 80%;
  font-size: 17px;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  line-height: ${({ isVisible }) => (isVisible ? '2rem' : '0')};
  text-align: center;
  transition: all 0.3s ease;
`;

const LinkText = styled.p<{ isVisible: any }>`
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  font-size: 16px;
  line-height: ${({ isVisible }) => (isVisible ? '1em' : '0')};
  align-self: end;
  color: #828282;
  transition: all 0.3s ease;
  &:hover {
    color: #315af1;
  }
`;

const AlarmContainer = styled.div<{ isExpanded: any }>`
  width: ${({ isExpanded }) => (isExpanded ? '27%' : '25%')};
  height: ${({ isExpanded }) => (isExpanded ? '35%' : '30%')};
  color: ${({ isExpanded }) => (isExpanded ? 'black' : 'white')};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  border: 3px solid transparent;
  background: ${({ isExpanded }) =>
    isExpanded
      ? 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #7296f1, #7dd8a5, #a473d1) border-box'
      : 'rgba(60, 60, 60, 0.8) padding-box, linear-gradient(45deg, #7296f1, #7dd8a5, #a473d1) border-box'};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
`;

export default function Alarm() {
  const response = sessionStorage.getItem('responseAmount');
  const comment = sessionStorage.getItem('commentAmount');
  const [isOpen, setIsOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const userProfile = useUserStore(state => state.userProfile);

  useEffect(() => {
    const timer = setTimeout(() => {
      sessionStorage.setItem('responseAmount', '0');
      sessionStorage.setItem('commentAmount', '0');
      setIsOpen(false);
    }, 7000);

    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(expandTimer);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <AlarmContainer isExpanded={isExpanded}>
        <Lottie animationData={Alert} loop={true} autoplay={true} style={{ width: '25%' }} />
        <AlarmTitle>새로운 알림이 도착했습니다.</AlarmTitle>
        <AlarmText isVisible={isExpanded}>
          <span className="text-[#315AF1]">{response}</span> 개의 피드백과{' '}
          <span className="text-[#315AF1]">{comment} </span>개의 댓글이<br></br> 새로 작성되었습니다.
        </AlarmText>
        <Link to={`/feedback/${userProfile.nowProjectId}`}>
          <LinkText isVisible={isExpanded}>나의 테스트 확인하러 가기 &gt;</LinkText>
        </Link>
      </AlarmContainer>
    </ModalOverlay>
  );
}
