import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loading } from '../../../components/utils/Loading';
import { FetchMyPage } from '../../../services/UserApi';
import { useUserStore } from '../../../states/user/UserStore';
export default function KakaoLoading() {
  const navigate = useNavigate();
  const setImgUrl = useUserStore(state => state.setImgUrl);

  useEffect(() => {
    const currentUrl = new URL(window.location.href);
    const code = currentUrl.searchParams.get('code');
    console.log('receive code:', code);

    if (code) {
      const fetchData = async () => {
        console.log('fetchData:');
        try {
          const response = await axios.get(`http://3.38.181.14:8080/api/kakao/callback?code=${code}`); // 배포
          //            const response = await axios.get(`http://3.35.18.26:8080/api/kakao/callback?code=${code}`); // 로컬


          console.log('데이터', response.data);
          const ACCESS_TOKEN = response.data.accessToken;
          const KAKAO_ACCESS_TOKEN = response.data.kakaoAccessToken;
          const USER_ID = response.data.userId;
          const Response_Amount = response.data.notificationDto.responseAmount;
          const Comment_Amount = response.data.notificationDto.commentAmount;

          localStorage.setItem('accessToken', ACCESS_TOKEN);
          localStorage.setItem('kakaoAccessToken', KAKAO_ACCESS_TOKEN);
          localStorage.setItem('userId', USER_ID);
          sessionStorage.setItem('responseAmount', Response_Amount);
          sessionStorage.setItem('commentAmount', Comment_Amount);
          console.log('로그인 성공');
          try {
            await FetchMyPage();
            setImgUrl(response.data.profileImgDto.s3Key);
            navigate('/main');
          } catch (error) {
            console.error('메인 페이지 호출 실패:', error);
          }
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
