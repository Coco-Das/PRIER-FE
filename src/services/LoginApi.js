const REST_API_KEY = '8ce35623abe60c5ca718b21703a566e3';

const REDIRECT_URI = 'http://43.203.209.250/api/kakao/callback';
// const REDIRECT_URI = 'http://localhost:3000/api/kakao/callback'; 로컬주소
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
