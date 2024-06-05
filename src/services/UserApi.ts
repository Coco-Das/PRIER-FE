import axios from 'axios';
import { useEffect } from 'react';
import { useUserStore } from '../states/user/UserStore';

const API_BASE_URL = '/api';

export function FetchMyPage() {
  const setUserProfile = useUserStore(state => state.setUserProfile);
  useEffect(() => {
    const FetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/mypage`, {
          headers: { Authorization: 'Bearer 1eed2de1-f7fd-6cb0-3bab-932e763390ec' },
        });
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
