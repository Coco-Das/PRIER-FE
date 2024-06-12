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
import GiftPurchaseModal from './GiftPurchaseModal';

const StyledCoinIcon = styled(PointIcon)`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

export default function Gifticon() {
  const { gifticons } = useGifticonStore();
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  const handleFlip = async (index: number, productId: number) => {
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

  const handlePurchaseClick = (productId: number) => {
    setSelectedProductId(productId);
    setShowPurchaseAlert(true);
  };

  const ConfirmPurchase = async () => {
    if (selectedProductId) {
      try {
        const response = await PurchaseGift(selectedProductId);
        console.log(response);
        setShowPurchaseAlert(false);
      } catch (error) {
        console.error('기프티콘 구매 요청 실패:', error);
      }
    }
  };

  const CancelPurchase = () => {
    setShowPurchaseAlert(false);
  };

  return (
    <>
      {showPurchaseAlert && (
        <GiftPurchaseModal
          productName={gifticons.find(g => g.productId === selectedProductId)?.productName || ''}
          onConfirm={ConfirmPurchase}
          onCancel={CancelPurchase}
        />
      )}
      {gifticons.map((gifticon, index) => (
        <CardContainer key={gifticon.productId} onClick={() => gifticon.stock && handleFlip(index, gifticon.productId)}>
          <Card isFlipped={flippedIndex === index}>
            <CardFront>
              {gifticon.stock === 0 ? (
                <SoldOutContainer>
                  <div className="flex">
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
                    </GiftTextWrapper>
                  </div>
                  <SoldOutFlag>일시 품절</SoldOutFlag>
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
                  <LinkText
                    className="text-end"
                    onClick={e => {
                      e.stopPropagation();
                      handlePurchaseClick(gifticon.productId);
                    }}
                  >
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
