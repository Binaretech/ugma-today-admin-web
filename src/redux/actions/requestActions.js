export const requestActions = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
};

export function request(xhr, action) {
  return (dispatch) => {
    dispatch(loading());
    xhr
      .send()
      .then((response) => {
        return dispatch({ type: action, payload: response });
      })
      .catch((err) => {
        return dispatch(error(err));
      });
  };
}

export function loading() {
  return {
    type: requestActions.LOADING,
  };
}

export function error(error) {
  return {
    type: requestActions.ERROR,
    payload: error,
  };
}
