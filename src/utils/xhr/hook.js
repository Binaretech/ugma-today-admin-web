import {useRef, useEffect} from 'react';
import {defaultOptions} from './xhrConfig';
import appBaseUrl from '../../configs';
import {useDispatch, useSelector} from 'react-redux';
import {snackbarMessage} from '../../redux/actions/snackbarActions';
import {trans} from '../../trans/trans';
import {setLogin} from '../../redux/actions/sessionActions';

/**
 * @typedef {object} Params
 * @prop {'GET'|'POST'|'PUT'|'DELETE'} method
 * @prop {string} url
 * @prop {bool} useBaseUrl
 * @prop {object} params
 * @prop {object} body
 * @prop {"" | "arraybuffer" | "blob" | "document" | "json" | "text"} responseType
 * @prop {object} headers
 * @prop {boolean} redirectUnauthorized
 * @prop {boolean} showSucessSnackbar
 * @prop {boolean} showErrorSnackbar
 *
 * @param {Params} params
 */
export function useXhr(params) {
  params = {...defaultOptions, ...params};

  const xhr = useRef(new XMLHttpRequest());
  const dispatch = useDispatch();
  const token = useSelector((state) => state.sessionReducer.token);

  useEffect(() => {
    const request = xhr.current;
    return () => {
      request.abort();
    };
  }, []);

  /**
   *
   * @param {Params} options
   * @returns {Promise<any>}
   */
  function send(options = {}) {
    options = {...params, ...options};

    xhr.current.abort();

    return new Promise((resolve, reject) => {
      xhr.current.open(options.method, formatUrl(options), true);

      setHeaders(options, xhr.current, token);
      xhr.current.send(setBody(options));
      xhr.current.onload = () => {
        const response = getResponse(options, xhr.current);

        if (xhr.current.status >= 200 && xhr.current.status < 300) {
          resolve(
            options.responseType === 'json'
              ? {
                  ...response,
                  status: xhr.current.status,
                }
              : {
                  [options.responseType]: response,
                  status: xhr.current.status,
                },
          );

          if (options.showSucessSnackbar) {
            dispatch(
              snackbarMessage(
                response?.data?.message ||
                  response?.message ||
                  trans('Components.snackbar.successMessage'),
              ),
            );
          }
          return;
        }
        if (xhr.current.status === 401 && options.redirectUnauthorized) {
          dispatch(setLogin());
        }

        return reject({...response, status: xhr.current.status});
      };

      xhr.current.onerror = () =>
        reject({
          type: 'error',
          message: trans('errors.networkError'),
        });

      xhr.current.ontimeout = () =>
        reject({
          type: 'timeout',
          message: trans('errors.timeout'),
        });
    });
  }

  function abort() {
    if (this.xhr.readyState < 4 && this.xhr.readyState > 0) {
      this.xhr.abort();
    }
  }

  return [send, abort];
}

/**
 * @typedef {object} Params
 * @prop {boolean} useBaseUrl
 * @prop {string} url
 * @prop {object} params
 *
 * @param {Params} params
 */
function formatUrl({useBaseUrl, url, params, queryParams}) {
  if (useBaseUrl) {
    url = `${appBaseUrl()}${url}`;
  }

  Object.keys(params || {}).forEach((param) => {
    url = url.replace(`:${param}`, params[param]);
  });

  const query = Object.keys(queryParams || {}).map((query) => {
    return `${query}=${queryParams[query]}`;
  });

  if (query.length > 0) url = `${url}?${query.join('&')}`;

  return url;
}

function formatToFormData(formData, key, data) {
  if (data instanceof Array) {
    for (let i = 0; i < data.length; i += 1) {
      if (data instanceof Array || data instanceof Object) {
        formatToFormData(formData, `${key}[${i}]`, data[i]);
      }
    }
  } else if (
    data instanceof Object &&
    !(data instanceof File) &&
    !(data instanceof Image) &&
    !(data instanceof Blob)
  ) {
    for (const prop in data) {
      if (data instanceof Array || data instanceof Object) {
        formatToFormData(formData, `${key}[${prop}]`, data[prop]);
      }
    }
  } else {
    formData.append(key, data);
  }
}

function setBody(options = {}) {
  if (!Object.keys(options?.body || {}).length === 0) {
    return null;
  }

  if (
    options?.headers?.hasOwnProperty('Content-Type') &&
    options?.headers['Content-Type'] === 'application/json'
  ) {
    return JSON.stringify(options.body);
  }
  const formData = new FormData();

  Object.keys(options?.body || {}).forEach((key) => {
    formatToFormData(formData, key, options.body[key]);
  });

  return formData;
}

/**
 *
 * @param {Params} options
 * @param {XMLHttpRequest} xhr
 */
function getResponse(options, xhr) {
  try {
    if (options.responseType === 'json') return JSON.parse(xhr.response);

    return xhr.response;
  } catch (error) {
    return xhr.response;
  }
}

/**
 *
 * @param {Params} options
 * @param {XMLHttpRequest} xhr
 */
function setHeaders(options, xhr, token) {
  if (options.useToken && token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  Object.keys(options.headers).forEach((key) => {
    xhr.setRequestHeader(key, options.headers[key]);
  });

  return this;
}
