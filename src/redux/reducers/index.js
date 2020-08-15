import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import snackbarReducer from './snackbarReducer';

export default combineReducers({
  sessionReducer,
  snackbarReducer,
});
