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

    Xhr.initConfigs();

    this.xhr = new Axios({
      url: this.endpoint,
      method: this.method,
      ...this.options,
    });
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
}
