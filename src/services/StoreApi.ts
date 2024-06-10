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
    updatePoint(response.data);
  } catch (error) {
    console.log('포인트 사용 내역 요청 실패', error);
    throw error;
  }
}

export async function FetchPayment(amount: string) {
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
