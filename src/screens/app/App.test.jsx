import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import renderer from 'react-test-renderer';

describe('App', () => {
  test('should renders App component', () => {
    const app = renderer.create(
      <Provider store={store()}>
        <App />
      </Provider>
    );
    expect(app.toJSON()).toMatchSnapshot();
  });
});
