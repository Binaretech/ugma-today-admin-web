import Axios from 'axios';
import appBaseUrl from './configs';

let cancellation = undefined;

export default class Xhr {
  constructor(endpoint, method = 'GET', options = {}) {
    this.endpoint = endpoint;
    this.method = method;

    this.options = {
      cancelToken: new Axios.CancelToken((cancel) => (cancellation = cancel)),
      ...options,
    };

    this.xhr = Axios.request({
      url: this.endpoint,
      method: this.method,
      ...this.options,
    });

    this.send = this.send.bind(this);
  }

  static initConfigs() {
    Axios.defaults.baseURL = appBaseUrl();
    Axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'token'
    );
  }

  send() {
    return new Promise((resolve, reject) => {
      this.xhr
        .then((response) =>
          resolve({
            ...response.data,
            status: response.status,
          })
        )
        .catch((error) => reject(error));
    });
  }

  abort() {
    cancellation();
  }

  static get(endpoint, options = {}) {
    return new Xhr(endpoint, 'GET', options);
  }

  static post(endpoint, options = {}) {
    return new Xhr(endpoint, 'POST', options);
  }

  static put(endpoint, options = {}) {
    return new Xhr(endpoint, 'PUT', options);
  }

  static delete(endpoint, options = {}) {
    return new Xhr(endpoint, 'DELETE', options);
  }
}
