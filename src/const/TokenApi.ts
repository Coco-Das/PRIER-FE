import axios from 'axios';

export const KAKAO_ACCESS_TOKEN = localStorage.getItem('kakaoAccessToken');

export const API_BASE_URL = axios.create({
<<<<<<< HEAD
  baseURL: 'http://52.78.144.83:8080/api',
=======
  baseURL: 'http://52.79.204.128:8080/api',
>>>>>>> d2510f15e5a87f08dd82cd5f774024287d7d09dc
});
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
