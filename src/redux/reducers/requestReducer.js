import { requestActions } from '../actions/requestActions';

const initialState = {
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActions.SET_ERRORS:
      return {
        ...state,
        errors: action.payload?.response?.data?.errors || {},
      };

    case requestActions.CLEAN_ERRORS:
      return {
        ...state,
        message: '',
        errors: {},
      };

    default:
      return state;
  }
};
