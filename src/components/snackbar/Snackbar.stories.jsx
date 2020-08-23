import React from 'react';
import Snackbar from './Snackbar';
// Configs for StoryBook with redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../../redux/reducers';

const SnackbarWithProvider = () => (
  <Provider
    store={createStore(reducers, {
      snackbarReducer: {
        open: true,
        message: 'Message for Storybook',
      },
    })}
  >
    <Snackbar />
  </Provider>
);
export default { title: 'Snackbar', component: Snackbar };

export const normal = () => <SnackbarWithProvider />;
