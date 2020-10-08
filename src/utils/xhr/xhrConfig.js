/**
 * @type {import("./hook").Params}
 */
export const defaultOptions = {
    method: 'GET',
    useBaseUrl: true,
    body: {},
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    params: {},
    useToken: true,
    responseType: 'json',
    redirectUnauthorized: true,
    showErrorSnackbar: false,
    showSucessSnackbar: false,
};
