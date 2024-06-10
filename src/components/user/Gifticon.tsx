import React from 'react';
import { GiftImg, GiftTextWrapper, GifticonContainer, LinkText, Title } from './UserStyle';
import Gift from '../../assets/gift.png';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
import { styled } from 'styled-components';
import { useGifticonStore } from '../../states/user/PointStore';

const StyledCoinIcon = styled(PointIcon)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export default function Gifticon() {
  const { gifticons } = useGifticonStore();
  return (
    <>
      {gifticons.map(gifticon => (
        <GifticonContainer key={gifticon.productId}>
          <GiftImg src={gifticon.imageUrl} alt={gifticon.productName} />
          <GiftTextWrapper>
            <div className="flex items-center justify-between">
              <Title>{gifticon.productName}</Title>
              <LinkText>{gifticon.stock} 개 남음</LinkText>
            </div>
            <div className="flex items-center">
              <StyledCoinIcon />
              <p>{gifticon.price} 코어</p>
            </div>
            <LinkText className="text-end">구매하기 &gt;</LinkText>
          </GiftTextWrapper>
        </GifticonContainer>
      ))}
    </>
  );
}
