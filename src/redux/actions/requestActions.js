import { snackbarMessage } from './snackbarActions';
import { trans } from '../../trans/trans';

export const requestActions = {
  LOADING: 'LOADING',
  SET_ERRORS: 'SET_ERRORS',
  CLEAN_ERRORS: 'CLEAN_ERRORS',
};

export function request(
  xhr,
  actionSuccess,
  actionError,
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
          type: actionSuccess,
          payload: response,
        });
      })
      .catch((err) => {
        if (showSnackbarError)
          dispatch(
            snackbarMessage(
              err?.response?.data?.message ||
                trans('Components.snackbar.errorMessage')
            )
          );
        dispatch(setErrors(err));
        return dispatch({
          type: actionError,
          payload: err,
        });
      });
  };
}

export function setErrors(errors) {
  return {
    type: requestActions.SET_ERRORS,
    payload: errors,
  };
}

export default function cleanErrors() {
  return {
    type: requestActions.CLEAN_ERRORS,
  };
}
