import { API_BASE_URL } from '../const/TokenApi';
import { userPointStore } from '../states/user/PointStore';

export async function CheckPoint() {
  try {
    const response = await API_BASE_URL.get('/points');
    console.log('포인트 정보 요청 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('포인트 정보 요청 실패', error);
    throw error;
  }
}
export async function FetchPointHistory() {
  try {
    const response = await API_BASE_URL.get('/points/history');
    console.log('포인트 사용 내역 요청 성공', response.data);
    const updatePoint = userPointStore.getState().updatePoint;
    if (Array.isArray(response.data)) {
      response.data.forEach(transaction => {
        updatePoint(transaction);
      });
    } else {
      console.error('Unexpected response format:', response.data);
    }
  } catch (error) {
    console.log('포인트 사용 내역 요청 실패', error);
    throw error;
  }
}

export async function FetchKakaoPayment(amount: number, itemName: string) {
  try {
    const response = await API_BASE_URL.post(
      '/payment/ready',
      {
        price: amount,
        itemName: itemName,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('카카오 결제 준비 요청 성공', response.data);
    const redirectUrl = response.data.next_redirect_pc_url;
    window.location.href = redirectUrl;
  } catch (error) {
    console.error('카카오 페이 결제 실패', error);
    throw error;
  }
}
export async function RefundKakaoPayment(payToken: string, amount: number) {
  try {
    console.log(payToken, amount);
    const response = await API_BASE_URL.post(`/payment/refund`, {
      tid: payToken,
      cancelAmount: amount,
      cancelTaxFreeAmount: 0,
    });
    console.log('환불 요청 성공', response.data);
  } catch (error) {
    console.error('환불 실패');
  }
}
//기프티콘
export async function FetchGiftList() {
  try {
    const response = await API_BASE_URL.get('/store/products');
    console.log('기프티콘 리스트 요청 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('기프티콘 리스트 요청 실패', error);
    throw error;
  }
}
export async function DescriptionGift(productId: number) {
  try {
    const response = await API_BASE_URL.get(`/store/products/${productId}`);
    console.log('기프티콘 설명 요청 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('기프티콘 설명 요청 실패', error);
    throw error;
  }
}
export async function PurchaseGift(productId: number) {
  try {
    const response = await API_BASE_URL.post(`/store/purchase/${productId}`);
    console.log('기프티콘 구매 요청 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('기프티콘 구매 요청 실패', error);
    throw error;
  }
}
