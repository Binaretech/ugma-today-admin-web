import { sessionActions } from '../actions/sessionActions';

const initialState = {};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case sessionActions.LOADING_LOGIN:
      return {
        ...state,
        loading: true,
      };
    case sessionActions.LOGIN:
      return {
        ...state,
        ...action.payload,
        loading: false,
      };

    case sessionActions.ERROR_LOGIN:
      return {
        ...state,
        message: action.payload?.response?.data?.message,
        loading: false,
      };
    default:
      return state;
  }
}
