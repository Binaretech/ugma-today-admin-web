export const sessionActions = {
  LOGIN: 'LOGIN',
  LOADING_LOGIN: 'LOADING_LOGIN',
  ERROR_LOGIN: 'ERROR_LOGIN',
};

export function loading() {
  return {
    type: sessionActions.LOADING_LOGIN,
  };
}

export function error(error) {
  return {
    type: sessionActions.ERROR_LOGIN,
    payload: error,
  };
}

export function setUserData(payload) {
  return {
    type: sessionActions.LOGIN,
    payload,
  };
}
