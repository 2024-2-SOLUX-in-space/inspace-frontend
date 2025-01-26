// api.js
import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: 'http://3.35.10.158:8080', // API의 기본 URL
  //timeout: 10000, // 요청 타임아웃 시간 (ms)
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    //console.log('access_token: ', token);

    return config;
  },
  (error) => {
    // 요청 오류 처리 추후 작업
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 응답 에러 처리 추후 작업
    return Promise.reject(error);
  },
);

export default api;
