import axios from 'axios'


const appID = 'jsRqyboNdXtnuE2GHZKRuzPv'
const appSecret = 'xPp9SBcr5szSvxys24LUD1Gu'

const instance = axios.create({
  baseURL: 'https://gp-server.hunger-valley.com/',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})


axios.interceptors.request.use(function (config) {
  const xToken = localStorage.getItem('x-token')
  if (xToken) {
    config.headers['Authorization'] = `Bearer ${xToken}`
  }
  return config;
}, function (error) {
  console.log(error);

  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  if (response.headers['x-token']) {
    localStorage.setItem('x-token', response.headers['x-token'])
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default instance