import React, { useState } from 'react';
import { Title } from '../../main/MainStyle';
import {
  BlueText,
  ChargeContainer,
  GiftWrapper,
  PointContainer,
  PointText,
  PriceText,
  StoreWrapper,
  StyledPointIcon,
} from './StoreStyle';
import { LinkText } from '../../../components/user/UserStyle';
import Gifticon from '../../../components/user/Gifticon';
import PaymentModal from '../../../components/user/PaymentModal';
import CoinLog from '../../../components/user/CoinLog';
import { userPointStore } from '../../../states/user/PointStore';
import { FetchPayment, FetchPointHistory } from '../../../services/StoreApi';

export default function Store() {
  const pointStore = userPointStore();
  const [openPayment, setOpenPayment] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [openLog, setOpenLog] = useState(false);
  //포인트 구매
  const SelectAmount = (amount: string) => {
    setSelectedAmount(amount);
    setOpenPayment(true);
  };

  const ChargeCoin = async (amount: string) => {
    try {
      const transactionData = await FetchPayment(amount);
      pointStore.updatePoint(transactionData);
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
      {openPayment && <PaymentModal amount={selectedAmount} onConfirm={ChargeCoin} onCancel={CancleCharge} />}
      {openLog && <CoinLog onCancel={CancleLog} />}
      <Title>상점</Title>
      <div className="flex w-full">
        <PointContainer>
          <StyledPointIcon></StyledPointIcon>
          <div className="flex-col">
            <PointText className="mb-5">포인트</PointText>
            <BlueText className="mb-5">{pointStore.point} 코어 보유</BlueText>
            <LinkText className="text-end" onClick={OpenLog}>
              사용 로그 보기 &gt;
            </LinkText>
          </div>
        </PointContainer>
        <ChargeContainer>
          <PointText>코어 충전하기</PointText>
          <div className="flex items-center justify-center gap-10">
            <span onClick={() => SelectAmount('1000')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>100코어 : 1000원</PriceText>
            </span>
            <span onClick={() => SelectAmount('5000')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>500코어 : 5000원</PriceText>
            </span>
            <span onClick={() => SelectAmount('10000')}>
              <StyledPointIcon></StyledPointIcon>
              <PriceText>1000코어 : 10000원</PriceText>
            </span>
          </div>
          <LinkText className="flex items-end ml-20">코어 충전하기 &gt;</LinkText>
        </ChargeContainer>
      </div>
      <Title>기프티콘</Title>
      <GiftWrapper>
        <Gifticon />
      </GiftWrapper>
    </StoreWrapper>
  );
}
