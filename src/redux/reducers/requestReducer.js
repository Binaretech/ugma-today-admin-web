import { requestActions } from '../actions/requestActions';

const initialState = {
  errors: {},
};

export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case requestActions.SET_ERRORS:
      return {
        ...state,
        errors: action.payload?.errors || {},
      };

    case requestActions.CLEAN_ERRORS:
      return {
        ...state,
        message: '',
        errors: {},
      };
    case requestActions.CLEAN_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.key]: undefined,
        }
      };
    default:
      return state;
  }
};
