import { requestActions } from '../actions/requestActions';

const initialState = {
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case requestActions.LOADING:
      return {
        ...state,
        loading: true,
      };

    case requestActions.ERROR:
      return {
        ...state,
        message: action.payload?.response?.data?.message,
        errors: action.payload?.response?.data?.errors || {},
        loading: false,
      };

    default:
      return state;
  }
};
