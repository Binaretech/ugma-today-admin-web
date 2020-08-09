import Axios from 'axios';
import appBaseUrl from './configs';

function request(endpoint, method, options) {
  return new Promise((resolve, reject) => {
    Axios.request({
      url: endpoint,
      method,
      ...options,
    })
      .then((response) =>
        resolve({
          ...response.data,
          status: response.status,
        })
      )
      .catch((error) => reject(error));
  });
}

export default class Xhr {
  static initConfigs() {
    Axios.defaults.baseURL = appBaseUrl();
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
  }

  static get(endpoint, options = {}) {
    return request(endpoint, 'GET', options);
  }

  static post(endpoint, options = {}) {
    return request(endpoint, 'POST', options);
  }

  static put(endpoint, options = {}) {
    return request(endpoint, 'PUT', options);
  }

  static delete(endpoint, options = {}) {
    return request(endpoint, 'DELETE', options);
  }
}
