import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Filler,
  LinkText,
  MiddleText,
  PointText,
  ProfileContainer,
  ProgressBarContainer,
  StyledPointIcon,
  Title,
} from '../board/UserStyle';

export default function Profile() {
  const [progress] = useState(50);

  return (
    <ProfileContainer>
      <div className="flex justify-between items-center gap-10 mb-3">
        <Title>반갑습니다 {}개발자1님</Title>
        <Link to="/mypage">
          <LinkText>마이 페이지 &gt;</LinkText>
        </Link>
      </div>
      <ProgressBarContainer>
        <Filler percentage={progress} />
      </ProgressBarContainer>
      <MiddleText>등급 LV.</MiddleText>
      <div className="flex-col">
        <div className="flex items-center gap-3">
          <StyledPointIcon></StyledPointIcon>
          <MiddleText>포인트</MiddleText>
        </div>
        <PointText className="text-center">{} 120000 코어 보유</PointText>
        <Link to="/store">
          <LinkText className="text-right">상점 바로가기 &gt;</LinkText>
        </Link>
      </div>
    </ProfileContainer>
  );
}
