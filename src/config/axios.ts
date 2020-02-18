import axios from 'axios';
import history from '../config/history'


const appID = 'jsRqyboNdXtnuE2GHZKRuzPv'
const appSecret = 'xPp9SBcr5szSvxys24LUD1Gu'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})


instance.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.log(error);

  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, function (error) {
  // 拦截器
  console.log(error);
  if (error.response.status === 401) {
    console.log('重定向');
    // window.location.href = '/login'
    history.push('login')
  }
  return Promise.reject(error);
});

export default instance