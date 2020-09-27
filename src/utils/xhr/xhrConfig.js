/**
 * @type {import("./hook").Params}
 */
export const defaultOptions = {
    method: 'GET',
    useBaseUrl: true,
    body: {},
    headers: {
        'Content-Type': 'Application/json'
    },
    params: {},
    responseType: 'json',
    redirectUnauthorized: true,
};
