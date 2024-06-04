import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../../components/utils/Loading';

export default function KakaoLoading() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      // 인가 코드를 백엔드 서버로 전송하여 액세스 토큰을 요청
      axios
        .get(`http://localhost:8080/kakao/callback?code=${code}`, { code })
        .then(response => {
          console.log(response.data);
          // 사용자 정보를 로컬 스토리지에 저장하거나 상태 관리
          const ACCESS_TOKEN = response.data.accessToken;
          localStorage.setItem('token', ACCESS_TOKEN);
          navigate('/main');
        })
        .catch(error => {
          console.error('카카오 로그인 실패', error);
          navigate('/login');
        });
    }
  }, []);
  return (
    <>
      <Loading></Loading>
    </>
  );
}
