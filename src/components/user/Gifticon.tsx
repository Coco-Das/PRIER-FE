import React, { useState } from 'react';
import {
  Card,
  CardBack,
  CardContainer,
  CardFront,
  DescriptionText,
  GiftImg,
  GiftTextWrapper,
  LinkText,
  SoldOutContainer,
  SoldOutFlag,
  Title,
} from './UserStyle';
import { ReactComponent as PointIcon } from '../../assets/Coin.svg';
import { styled } from 'styled-components';
import { useGifticonStore } from '../../states/user/PointStore';
import { DescriptionGift, PurchaseGift } from '../../services/StoreApi';

const StyledCoinIcon = styled(PointIcon)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export default function Gifticon() {
  const { gifticons } = useGifticonStore();
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [details, setDetails] = useState<string | null>(null);

  const handleFlip = async (index: number, productId: string) => {
    if (index === flippedIndex) {
      setFlippedIndex(null);
      setDetails(null);
    } else {
      try {
        const detail = await DescriptionGift(productId);
        setDetails(detail.description);
        setFlippedIndex(index);
      } catch (error) {
        console.error('기프티콘 설명 요청 실패:', error);
      }
    }
  };
  const handlePurchase = (productId: string) => async () => {
    try {
      const response = await PurchaseGift(productId);
      console.log(response);
    } catch (error) {
      console.error('기프티콘 구매 요청 실패:', error);
    }
  };
  return (
    <>
      {gifticons.map((gifticon, index) => (
        <CardContainer key={gifticon.productId} onClick={() => handleFlip(index, gifticon.productId)}>
          <Card isFlipped={flippedIndex === index}>
            <CardFront>
              {gifticon.stock === '0' ? (
                <SoldOutContainer>
                  <GiftImg src={gifticon.imageUrl} alt={gifticon.productName} />
                  <GiftTextWrapper>
                    <div className="flex items-center justify-between">
                      <Title>{gifticon.productName}</Title>
                      <SoldOutFlag>일시 품절</SoldOutFlag>
                    </div>
                  </GiftTextWrapper>
                </SoldOutContainer>
              ) : (
                <>
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
                    <LinkText className="text-end">상세 보기 &gt;</LinkText>
                  </GiftTextWrapper>
                </>
              )}
            </CardFront>
            <CardBack>
              {details && flippedIndex === index ? (
                <GiftTextWrapper>
                  <Title>{gifticon.productName}</Title>
                  <DescriptionText>{details}</DescriptionText>
                  <LinkText className="text-end" onClick={handlePurchase(gifticon.productId)}>
                    구매하기 &gt;
                  </LinkText>
                </GiftTextWrapper>
              ) : (
                <GiftTextWrapper>
                  <Title>로딩 중...</Title>
                </GiftTextWrapper>
              )}
            </CardBack>
          </Card>
        </CardContainer>
      ))}
    </>
  );
}
