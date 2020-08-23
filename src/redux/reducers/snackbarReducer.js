import { snackbarActions } from '../actions/snackbarActions';
import { trans } from '../../trans/trans';

const initialState = {};

export default function snackbarReducer(state = initialState, action) {
  switch (action.type) {
    case snackbarActions.MESSAGE:
      let message = action?.payload;
      if (!action?.payload?.response && action?.payload?.isAxiosError)
        message = trans('words.connectionError');

      return {
        ...state,
        message,
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
