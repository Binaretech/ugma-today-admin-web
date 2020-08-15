export const snackbarActions = {
  CLOSE: 'CLOSE',
  MESSAGE: 'MESSAGE',
};

export function snackbarMessage(message) {
  return {
    type: snackbarActions.MESSAGE,
    message,
  };
}

export function snackbarClose() {
  return {
    type: snackbarActions.CLOSE,
  };
}
