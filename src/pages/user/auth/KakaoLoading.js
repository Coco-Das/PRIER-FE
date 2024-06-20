import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../../components/utils/Loading';

export default function KakaoLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const code = currentUrl.searchParams.get('code');
    console.log('receive code:', code);

    if (code) {
      const fetchData = async () => {
        console.log('fetchData:');
        try {
          const response = await axios.get(`http://13.125.15.23:8080/api/kakao/callback?code=${code}`);

          console.log('데이터', response.data);
          const ACCESS_TOKEN = response.data.accessToken;
          const KAKAO_ACCESS_TOKEN = response.data.kakaoAccessToken;
          const USER_ID = response.data.userId;
          localStorage.setItem('accessToken', ACCESS_TOKEN);
          localStorage.setItem('kakaoAccessToken', KAKAO_ACCESS_TOKEN);
          localStorage.setItem('userId', USER_ID);
          console.log('로그인 성공');
          navigate('/main');
        } catch (error) {
          console.error('카카오 로그인 실패:', error);
          navigate('/login');
        }
      };

      fetchData();
    } else {
      navigate('/login');
    }
  }, []);

  return <Loading />;
}
