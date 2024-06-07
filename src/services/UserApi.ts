import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useUserStore } from '../states/user/UserStore';
import { API_BASE_URL, KAKAO_ACCESS_TOKEN } from '../const/TokenApi';

export function FetchMyPage() {
  const setUserProfile = useUserStore(state => state.setUserProfile);
  useEffect(() => {
    const FetchUserProfile = async () => {
      try {
        const response = await API_BASE_URL.get('/users/mypage');
        console.log('유저 정보 요청 성공', response.data);
        return response.data;
      } catch (error) {
        console.error('유저 정보 요청 실패:', error);
        throw error;
      }
    };
    FetchUserProfile();
  }, [setUserProfile]);
}

export function FetchLogout() {
  const setLogout = useUserStore(state => state.setLogout);

  return useCallback(async () => {
    try {
      const response = await axios.get('https://kauth.kakao.com/oauth/logout', {
        headers: { Authorization: `Bearer ${KAKAO_ACCESS_TOKEN}` },
      });
      console.log('로그아웃 요청 성공', response.data);

      localStorage.removeItem('accessToken');
      localStorage.removeItem('kakao_access_token');
      localStorage.removeItem('userId');

      setLogout();
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      throw error;
    }
  }, [setLogout]);
}

export const EditNickName = async (newNickName: string) => {
  try {
    const response = await API_BASE_URL.put('/user/nickname', { nickname: newNickName });
    console.log('닉네임 수정 요청 성공', response.data);
    const setNickname = useUserStore.getState().setNickname;
    setNickname(newNickName);
  } catch (error) {
    console.error('닉네임 수정 실패:', error);
    throw error;
  }
};
