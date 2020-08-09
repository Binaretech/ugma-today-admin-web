import Axios from 'axios';

const apiRoutes = {
  login: 'login',
};

export function request(endpoint, method = 'GET', options = {}) {
  return Axios.request({
    url: endpoint,
    method,
    ...options,
  });
}

export default apiRoutes;
