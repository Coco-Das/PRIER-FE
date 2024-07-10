import axios from 'axios';

export const KAKAO_ACCESS_TOKEN = localStorage.getItem('kakaoAccessToken');

export const API_BASE_URL = axios.create({
  baseURL: 'http://3.38.181.14:8080/api', // 배포
});

//  baseURL: 'http://3.35.18.26:8080/api', //로컬

//요청 인터셉터
API_BASE_URL.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },

  error => {
    return Promise.reject(error);
  },
);
//응답 인터셉터
API_BASE_URL.interceptors.response.use(
  //응답 데이터 그대로 반환
  response => {
    return response;
  },
  error => {
    // 오류 처리
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized or token expired');
    }
    return Promise.reject(error);
  },
);
