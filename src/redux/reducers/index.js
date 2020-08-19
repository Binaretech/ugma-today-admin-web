import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import snackbarReducer from './snackbarReducer';
import requestReducer from './requestReducer';

export default combineReducers({
  sessionReducer,
  snackbarReducer,
  requestReducer,
});
