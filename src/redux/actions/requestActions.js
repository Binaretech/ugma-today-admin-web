import { snackbarMessage } from './snackbarActions';
import { trans } from '../../trans/trans';

export const requestActions = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
};

export function request(
  xhr,
  action,
  options = { showSnackbarSuccess: false, showSnackbarError: false }
) {
  const { showSnackbarSuccess, showSnackbarError } = options;

  return (dispatch) => {
    xhr
      .send()
      .then((response) => {
        if (showSnackbarSuccess)
          dispatch(
            snackbarMessage(
              response?.data?.message ||
                trans('Components.snackbar.successMessage')
            )
          );
        return dispatch({
          type: action,
          payload: response,
        });
      })
      .catch((err) => {
        if (showSnackbarError)
          dispatch(
            snackbarMessage(
              err.response?.data || trans('Components.snackbar.errorMessage')
            )
          );
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
