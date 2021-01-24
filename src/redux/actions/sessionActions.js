export const sessionActions = {
  LOGIN: 'LOGIN',
  LOADING_LOGIN: 'LOADING_LOGIN',
  REMOVE_SESSION: 'REMOVE_SESSION',
  ERROR_LOGIN: 'ERROR_LOGIN',
  LOGOUT: 'LOGOUT',
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

export function removeSession() {
  localStorage.removeItem('utd');
  return {
    type: sessionActions.REMOVE_SESSION,
  };
}

export function setLogin(payload = {}) {
  localStorage.setItem('utd', JSON.stringify(payload));
  return {
    type: sessionActions.LOGIN,
    payload,
  };
}

export function setUserData(payload) {
  return {
    type: sessionActions.LOGIN,
    payload,
  };
}

export function setLogout() {
  localStorage.removeItem('utd');
  return {
    type: sessionActions.LOGOUT,
  };
}
