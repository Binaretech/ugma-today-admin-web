import { sessionActions } from '../actions/sessionActions';
import { requestActions } from '../actions/requestActions';

const initialState = {
  // loading: false,
};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case requestActions.LOADING:
      return {
        ...state,
        loading: true,
      };

    case sessionActions.LOGIN:
      localStorage.setItem('token', action.payload?.data?.token);
      return {
        ...state,
        ...action.payload?.data,
        loading: false,
      };

    case requestActions.ERROR:
      return {
        ...state,
        error: action.payload?.message,
        loading: false,
      };
    default:
      return state;
  }
}
