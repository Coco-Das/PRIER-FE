import React, { useState } from 'react';
import { styled } from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { userPointStore } from '../../states/user/PointStore';
import { CheckPoint, RefundKakaoPayment } from '../../services/StoreApi';
import CreditCardOffRoundedIcon from '@mui/icons-material/CreditCardOffRounded';
import { Tooltip, TooltipProps, tooltipClasses } from '@mui/material';
import Snackbar from './Snackbar';

interface CoinLogProps {
  onCancel: () => void;
}

const LogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
`;
const LogContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
  height: 60%;
  padding: 2rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background: linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #315af1, #23be87, #773cd1) border-box;
  cursor: pointer;
`;
const LogTitle = styled.h2`
  color: #315af1;
  margin-bottom: 2rem;
`;
const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;
const TransactionList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: scroll;
`;

const TransactionItem = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  &:hover {
    background: #e1f9f0;
    transition: 0.3s;
  }
`;
const TransactionTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  width: 20%;
`;
const TransactionTime = styled.p`
  font-size: 18px;
  font-weight: 300;
  width: 11rem;
`;

const TransactionText = styled.p`
  font-size: 18px;
  width: 20%;
  font-weight: 300;
`;
const StyledCreditCardOffRoundedIcon = styled(CreditCardOffRoundedIcon)`
  cursor: pointer;
  &:hover {
    color: #315af1;
    transition: color 0.4s;
  }
`;
const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#F3F8FF',
    color: '#4188FE',
    borderRounded: '10px',
    border: '1px solid #CEE7FF',
    fontSize: 12,
  },
}));

const CoinLog: React.FC<CoinLogProps> = ({ onCancel }) => {
  const pointStore = userPointStore();
  const [snackbar, setSnackbar] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const TransactionType = (type: string) => {
    switch (type) {
      case 'QUEST_REWARD':
        return '퀘스트 보상';
      case 'POINT_CHARGE':
        return '포인트 충전';
      case 'PRODUCT_PURCHASE':
        return '상품 구매';
      case 'FEEDBACK_EXTENSION':
        return '피드백 연장';
      case 'REFUND':
        return '포인트 환불';
      default:
        return type;
    }
  };
  const formatTransactionTime = (datetime: string) => {
    const date = new Date(datetime);
    return new Intl.DateTimeFormat('ko-KR', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // 24-hour format
      timeZone: 'Asia/Seoul',
    }).format(date);
  };
  const handleRefund = async (payToken: string, amount: number) => {
    try {
      const response = await RefundKakaoPayment(payToken, amount);
      const remain = await CheckPoint();
      pointStore.setPoint(remain);
      setSnackbar({ message: '환불 요청이 처리되었습니다.', type: 'success' });
      if (response.status === 500) {
        setSnackbar({ message: '이미 처리된 요청입니다.', type: 'error' });
      }
      if (response.status === 401) {
        setSnackbar({ message: '포인트를 사용한 경우 환불이 불가합니다.', type: 'error' });
      }
    } catch (error) {
      setSnackbar({ message: '이미 처리된 요청입니다.', type: 'error' });
    }
  };

  return (
    <LogOverlay>
      <LogContainer>
        <CloseButton onClick={onCancel} />
        <LogTitle>코어 로그</LogTitle>
        <TransactionList>
          <TransactionItem>
            <TransactionTitle className="">사용 금액</TransactionTitle>
            <TransactionTitle>거래 내용</TransactionTitle>
            <TransactionTitle> 잔액</TransactionTitle>
            <TransactionTime style={{ fontWeight: '500' }}>거래 시간 </TransactionTime>
          </TransactionItem>
          {pointStore.transactions.map(transaction => (
            <TransactionItem key={transaction.transactionId}>
              <TransactionText>{transaction.amount}</TransactionText>
              <TransactionText>{TransactionType(transaction.transactionType)}</TransactionText>
              <TransactionText>{transaction.balance}</TransactionText>
              <TransactionTime>{formatTransactionTime(transaction.createdAt)}</TransactionTime>
              {transaction.transactionType === 'POINT_CHARGE' && transaction.tid && (
                <LightTooltip title="카카오페이 결제 취소" placement="right">
                  <StyledCreditCardOffRoundedIcon
                    onClick={() => handleRefund(transaction.tid as string, transaction.amount * 10)}
                  />
                </LightTooltip>
              )}
            </TransactionItem>
          ))}
        </TransactionList>
      </LogContainer>
      {snackbar && <Snackbar message={snackbar.message} type={snackbar.type} onClose={() => setSnackbar(null)} />}
    </LogOverlay>
  );
};
export default CoinLog;
