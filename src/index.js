import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/app/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import { snackbarMessage } from './redux/actions/snackbarActions';
import { trans } from './trans/trans';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

console.log(`${process.env.PUBLIC_URL}/service-worker.js`)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: () => store.dispatch(snackbarMessage(trans('Components.snackbar.updateMessage'))),
});
