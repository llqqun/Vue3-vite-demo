import axios from 'axios';
const option = {
  baseURL: import.meta.env.DEV ? '/dev' : '',
  retry: 3, // 请求次数
  retryInterval: 1000,
  timeout: 6000,
};
const server = axios.create(option);

server.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
server.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default server;
