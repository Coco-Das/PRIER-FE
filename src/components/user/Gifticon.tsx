import React from 'react';
import { GiftImg, GiftTextWrapper, GifticonContainer, LinkText, Title } from './UserStyle';
import Gift from '../../assets/gift.png';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
import { styled } from 'styled-components';
const StyledCoinIcon = styled(PointIcon)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;
export default function Gifticon() {
  return (
    <GifticonContainer>
      <GiftImg src={Gift}></GiftImg>
      <GiftTextWrapper>
        <div className="flex items-center justify-between">
          <Title>코카콜라</Title>
          <LinkText>개 남음</LinkText>
        </div>
        <div className="flex items-center">
          <StyledCoinIcon></StyledCoinIcon>
          <p>4000코어</p>
        </div>
        <LinkText className="text-end">구매하기 &gt;</LinkText>
      </GiftTextWrapper>
    </GifticonContainer>
  );
}
