import { snackbarActions } from '../actions/snackbarActions';

const initialState = {};

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case snackbarActions.MESSAGE:
      return {
        ...state,
        message: action.message,
        open: true,
      };

    case snackbarActions.CLOSE:
      return {
        ...state,
        open: false,
        message: '',
      };
    default:
      return state;
  }
}
