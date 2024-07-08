import React, { useState } from 'react';
import {
  Card,
  CardBack,
  CardContainer,
  CardFront,
  CardFrontContainer,
  DescriptionText,
  GiftImg,
  GiftText,
  GiftTextWrapper,
  GiftTitle,
  LinkText,
  PurchaseButton,
  SoldOutContainer,
  SoldOutFlag,
  Title,
} from './UserStyle';
import { styled } from 'styled-components';
import { useGifticonStore } from '../../states/user/PointStore';
import { DescriptionGift, FetchGiftList, PurchaseGift } from '../../services/StoreApi';
import GiftPurchaseModal from './GiftPurchaseModal';
import Snackbar from './Snackbar';
import CoinIcon from '../../assets/Coin.png';
import { device } from '../../styles/Media';

const StyledCoinIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  ${device.small} {
    width: 25px;
    height: 25px;
  }
`;

export default function Gifticon() {
  const { gifticons } = useGifticonStore();
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const [details, setDetails] = useState<string | null>(null);
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { setGifticons } = useGifticonStore();

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
        setSnackbar({ message: `상품을 구매했습니다.`, type: 'success' });
        setFlippedIndex(null);
        const gifticonData = await FetchGiftList();
        setGifticons(gifticonData);
      } catch (error) {
        console.error('기프티콘 구매 요청 실패:', error);
        setSnackbar({ message: `상품 구매에 실패했습니다.`, type: 'error' });
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
                  <CardFrontContainer>
                    <GiftImg src={gifticon.imageUrl} alt={gifticon.productName} />
                    <GiftTextWrapper>
                      <Title>{gifticon.productName}</Title>
                      <LinkText>{gifticon.stock} 개 남음</LinkText>
                      <div className="flex items-center">
                        <StyledCoinIcon src={CoinIcon} />
                        <GiftText>{gifticon.price} 코어</GiftText>
                      </div>
                    </GiftTextWrapper>
                  </CardFrontContainer>
                  <SoldOutFlag>일시 품절</SoldOutFlag>
                </SoldOutContainer>
              ) : (
                <>
                  <GiftImg src={gifticon.imageUrl} alt={gifticon.productName} />
                  <GiftTextWrapper>
                    <div>
                      <GiftTitle>{gifticon.productName}</GiftTitle>
                      <LinkText>{gifticon.stock} 개 남음</LinkText>
                    </div>
                    <div className="flex items-center">
                      <StyledCoinIcon src={CoinIcon} />
                      <GiftText>{gifticon.price} 코어</GiftText>
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
                  <PurchaseButton
                    className="text-end"
                    onClick={e => {
                      e.stopPropagation();
                      handlePurchaseClick(gifticon.productId);
                    }}
                  >
                    구매하기
                  </PurchaseButton>
                </GiftTextWrapper>
              ) : (
                <GiftTextWrapper></GiftTextWrapper>
              )}
            </CardBack>
          </Card>
        </CardContainer>
      ))}
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </>
  );
}
