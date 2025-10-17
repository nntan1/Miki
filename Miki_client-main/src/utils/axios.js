import axios from 'axios';

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': 'true',
  },
  withCredentials: true, // Để request gửi kèm cookie
});

axiosClient.interceptors.request.use(async (config) => {
  let accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    const utcStr = new Date().toUTCString();
    const timeNow = Date.parse(utcStr);
    const expire = localStorage.getItem('expire_at');
    const expireTime = Date.parse(expire);
    const userId = localStorage.getItem('userId');
    if (expireTime < timeNow) {
      try {
        const newAccessToken = await axios({
          method: 'POST',
          url: `https://localhost:7226/api/Users/refreshToken?userId=${userId}`,
        });
        localStorage.setItem('accessToken', newAccessToken.data.jwt);
        accessToken = newAccessToken.data.jwt;
        localStorage.setItem('expire_at', newAccessToken.data.expire_at);
      } catch (e) {
        if ((e.response.data == 'Refresh token was expired')) {
          localStorage.clear();
          window.location.replace('/login');
        }
      }
    }
    config.headers.Authorization = 'Bearer ' + accessToken;
  }
  return config;
});
