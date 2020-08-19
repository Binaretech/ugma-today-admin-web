export const snackbarActions = {
  CLOSE: 'CLOSE',
  MESSAGE: 'MESSAGE',
};

export function snackbarMessage(payload) {
  return {
    type: snackbarActions.MESSAGE,
    payload,
  };
}

export function snackbarClose() {
  return {
    type: snackbarActions.CLOSE,
  };
}
