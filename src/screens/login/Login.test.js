import React from 'react';
import Login from './Login';
import { fireEvent, render } from '@testing-library/react';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { trans } from '../../trans/trans';
import renderer from 'react-test-renderer';

describe('Login', () => {
  test('should snapshot renders', () => {
    const login = renderer.create(
      <Provider store={store()}>
        <Login />
      </Provider>
    );

    let tree = login.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render Screens.Login.loginButton trans in Login', () => {
    const { getByText } = render(
      <Provider store={store()}>
        <Login />
      </Provider>
    );
    expect(getByText(trans('Screens.Login.loginButton'))).toBeInTheDocument();
  });
});
