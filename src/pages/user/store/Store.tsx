import React, { useEffect, useState } from 'react';
import { Title } from '../../main/MainStyle';
import {
  BlueText,
  ChargeContainer,
  GiftWrapper,
  PointContainer,
  PointText,
  PriceContainer,
  PriceText,
  StoreWrapper,
  StyledPointIcon,
} from './StoreStyle';
import { LinkText } from '../../../components/user/UserStyle';
import Gifticon from '../../../components/user/Gifticon';
import PaymentModal from '../../../components/user/PaymentModal';
import CoinLog from '../../../components/user/CoinLog';
import { useGifticonStore, userPointStore } from '../../../states/user/PointStore';
import { CheckPoint, FetchGiftList, FetchKakaoPayment, FetchPointHistory } from '../../../services/StoreApi';

export default function Store() {
  const pointStore = userPointStore();
  const { setGifticons } = useGifticonStore();
  const [openPayment, setOpenPayment] = useState(false);
  const [charge, setCharge] = useState<{ amount: number; itemName: string }>({ amount: 0, itemName: '' });
  const [openLog, setOpenLog] = useState(false);

  //기프티콘 리스트 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gifticonData = await FetchGiftList();
        setGifticons(gifticonData);
        const points = await CheckPoint();
        pointStore.setPoint(points);
      } catch (error) {
        console.error('기프티콘 데이터 호출 실패:', error);
      }
    };

    fetchData();
  }, [setGifticons]);
  //포인트 구매
  const SelectAmount = (amount: number, itemName: string) => {
    setCharge({ amount, itemName });
    setOpenPayment(true);
  };

  const ChargeCoin = async (amount: number, itemName: string) => {
    try {
      await FetchKakaoPayment(amount, itemName);
      setOpenPayment(false);
    } catch (error) {
      console.error('포인트 구매 실패:', error);
    }
  };
  const CancleCharge = () => {
    setOpenPayment(false);
  };
  //사용 내역
  const OpenLog = async () => {
    setOpenLog(true);
    try {
      await FetchPointHistory();
    } catch (error) {
      console.error('포인트 로그 호출 실패:', error);
    }
  };
  const CancleLog = () => {
    setOpenLog(false);
  };
  return (
    <StoreWrapper>
      {openPayment && (
        <PaymentModal
          amount={charge.amount}
          itemName={charge.itemName}
          onConfirm={ChargeCoin}
          onCancel={CancleCharge}
        />
      )}
      {openLog && <CoinLog onCancel={CancleLog} />}
      <Title>상점</Title>
      <div className="flex w-full">
        <PointContainer>
          <StyledPointIcon className="mb-3"></StyledPointIcon>
          <div className="flex-col w-[60%] ">
            <PointText className="mb-5">포인트</PointText>
            <BlueText className="mb-5">{pointStore.point} 코어 보유</BlueText>
            <LinkText className="text-end" onClick={OpenLog}>
              사용 로그 보기 &gt;
            </LinkText>
          </div>
        </PointContainer>
        <ChargeContainer>
          <PointText>코어 충전하기</PointText>
          <div className="flex w-[80%] items-center justify-between  cursor-pointer">
            <PriceContainer onClick={() => SelectAmount(1000, '100 코어')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>100코어 : 1000원</PriceText>
            </PriceContainer>
            <PriceContainer onClick={() => SelectAmount(5000, '500 코어')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>500코어 : 5000원</PriceText>
            </PriceContainer>
            <PriceContainer onClick={() => SelectAmount(10000, '1000 코어')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>1000코어 : 10000원</PriceText>
            </PriceContainer>
          </div>
        </ChargeContainer>
      </div>
      <Title>기프티콘</Title>
      <GiftWrapper>
        <Gifticon />
      </GiftWrapper>
    </StoreWrapper>
  );
}
