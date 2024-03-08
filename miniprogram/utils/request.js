const daigo = require('daigo');
const config = require('../env.config');

const request = daigo.create({
  baseURL: config.baseURL,
  timeout: 60000,
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = request;
