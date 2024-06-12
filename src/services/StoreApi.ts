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

export async function FetchPayment(amount: number) {
  try {
    const response = await API_BASE_URL.post(
      '/points/recharge',
      { amount },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('포인트 구매 요청 성공', response.data);
    return response.data;
  } catch (error) {
    console.error('포인트 구매 요청 실패', error);
    throw error;
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
