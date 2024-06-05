import axios from 'axios';
import { useCallback, useEffect } from 'react';
import { useUserStore } from '../states/user/UserStore';
import { API_BASE_URL, KAKAO_ACCESS_TOKEN } from '../const/TokenApi';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
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
      navigate('/');
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
      throw error;
    }
  }, [navigate, setLogout]);
}
