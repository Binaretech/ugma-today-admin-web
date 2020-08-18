import { sessionActions } from '../actions/sessionActions';

const initialState = {};

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case sessionActions.LOGIN:
      localStorage.setItem('token', action.payload?.data?.token);
      return {
        ...state,
        ...action.payload?.data,
        loading: false,
      };

    default:
      return state;
  }
}
