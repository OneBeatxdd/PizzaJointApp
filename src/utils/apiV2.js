import axios from 'axios';
import { getCookie } from './cookies';

const api = async (method, url, data, extraOptions = {}) => {
  let authToken = getCookie('authToken');

  let options = {
    method,
    url,
  };

  if (authToken) {
    options.headers = { Authorization: `Bearer ${authToken}` };
  }

  if (data) {
    options.data = data;
  }
  if (extraOptions) {
    options = { ...options, ...extraOptions };
  }

  return await axios(options);;
};

export default api;
