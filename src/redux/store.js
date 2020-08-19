import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
// import { createPromise } from 'redux-promise-middleware';

import reducers from './reducers';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default function configureStore() {
  const middlewares = [
    thunk,
    // createPromise({
    //   promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    // }),
  ];

  return createStore(
    reducers,
    {},
    (composeEnhacers && composeEnhacers(applyMiddleware(...middlewares))) ||
      applyMiddleware(...middlewares)
  );
}
