export const sessionActions = {
  LOGIN: 'LOGIN',
  LOADING_LOGIN: 'LOADING_LOGIN',
};

export function loading() {
  return {
    type: sessionActions.LOADING_LOGIN,
  };
}
