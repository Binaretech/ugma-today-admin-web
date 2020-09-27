import { useRef } from "react";
import { defaultOptions } from './xhrConfig';
import appBaseUrl from '../../configs';
import { useHistory } from "react-router-dom";
import paths from "../../routes/paths";

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
 * 
 * @param {Params} params 
 */
export function useXhr(params) {
    params = { ...defaultOptions, ...params };
    const xhr = useRef(new XMLHttpRequest());
    const { push } = useHistory();

    /**
     * 
     * @param {Params} options
     * @returns {Promise<any>}
     */
    function send(options = {}) {
        const conf = { ...params, ...options };

        xhr.current.abort();
        return new Promise((resolve, reject) => {
            xhr.current.open(conf.method, formatUrl(conf), true);
            xhr.current.send(setBody(conf));
            xhr.current.onload = () => {
                const response = getResponse();

                if (xhr.current.status >= 200 && xhr.current.status < 300) {
                    resolve(options.responseType === 'json' ? {
                        ...response, status: xhr.current.status
                    } : {
                            [options.responseType]: response, status: xhr.current.status
                        }
                    );
                    return;
                }

                if (xhr.current.status === 401 && conf.redirectUnauthorized) push(paths.login);

                return reject({ ...response, status: xhr.current.status });
            };

            xhr.current.onerror = () => reject();
            xhr.current.ontimeout = () => reject();
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
function formatUrl({ useBaseUrl, url, params }) {
    if (useBaseUrl) {
        url = `${appBaseUrl()}${url}`;
    }

    Object.keys(params || {}).forEach((param) => {
        url = url.replace(`:${param}`, params[param]);
    });

    console.log(useBaseUrl, url);
    return url;
}


function formatToFormData(formData, key, data) {
    if (data instanceof Array) {
        for (let i = 0; i < data.length; i += 1) {
            if (data instanceof Array || data instanceof Object) {
                formatToFormData(formData, `${key}[${i}]`, data[i]);
            }
        }
    } else if (data instanceof Object && !(data instanceof File) && !(data instanceof Image) && !(data instanceof Blob)) {
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
    };

    if (options?.headers?.hasOwnProperty('Content-Type') && options?.headers['Content-Type'] === 'application/json') {
        return JSON.stringify(this.options.body);
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
        if (options.responseType === 'json')
            return JSON.parse(xhr.response);

        return xhr.response;
    } catch (error) {
        return xhr.response;
    }
}