import React from 'react';
import ReactDOM from 'react-dom';
import App from './screens/app/App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import createStore from './redux/store';
import {snackbarMessage} from './redux/actions/snackbarActions';
import {trans} from './trans/trans';
import BigNumber from 'bignumber.js';
import {loadUserData} from './utils/functions';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';
import {setLogin} from './redux/actions/sessionActions';

BigNumber.set({
  decimalSeparator: ',',
  groupSeparator: '.',
  DECIMAL_PLACES: 2,
});

dayjs.extend(relativeTime);
dayjs.locale('es');

const store = createStore();

const data = loadUserData();

if (data && Object.keys(data).length > 0) {
  store.dispatch(setLogin(data));
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
reportWebVitals();

serviceWorkerRegistration.register({
  onUpdate: () =>
    store.dispatch(snackbarMessage(trans('Components.snackbar.updateMessage'))),
});
