import React from 'react';
import { Title } from '../../main/MainStyle';
import {
  BlueText,
  ChargeContainer,
  GiftWrapper,
  PointContainer,
  PointText,
  StoreWrapper,
  StyledPointIcon,
} from './StoreStyle';
import { LinkText } from '../../../components/user/UserStyle';
import Gifticon from '../../../components/user/Gifticon';

function Store() {
  return (
    <StoreWrapper>
      <Title>상점</Title>
      <div className="flex w-full">
        <PointContainer>
          <div className="flex items-center gap-3">
            <StyledPointIcon></StyledPointIcon>
            <PointText>포인트</PointText>
          </div>
          <BlueText className="text-center">{} 120000 코어 보유</BlueText>
          <LinkText className="text-end">사용 로그 보기 &gt;</LinkText>
        </PointContainer>
        <ChargeContainer>
          <PointText>코어 충전하기</PointText>
          <LinkText className="text-end">코어 충전하기 &gt;</LinkText>
        </ChargeContainer>
      </div>
      <Title>기프티콘</Title>
      <GiftWrapper>
        <Gifticon />
      </GiftWrapper>
    </StoreWrapper>
  );
}

export default Store;
