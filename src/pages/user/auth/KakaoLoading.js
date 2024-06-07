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
          const response = await axios.get(`http://15.152.32.189:8080/kakao/callback?code=${code}`);
          const ACCESS_TOKEN = response.data.accessToken;
          const KAKAO_ACCESS_TOKEN = response.data.kakaoAccessToken;
          localStorage.setItem('accessToken', ACCESS_TOKEN);
          localStorage.setItem('kakaoAccessToken', KAKAO_ACCESS_TOKEN);
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
