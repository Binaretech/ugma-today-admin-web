import React from 'react';
import Login from './Login';
import { fireEvent, render } from '@testing-library/react';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { trans } from '../../trans/trans';
import renderer from 'react-test-renderer';
import Xhr from '../../Xhr';
import apiEndpoints from '../../apiEndpoints';

jest.mock('../../Xhr');

const loginComponent = () => (
  <Provider store={store()}>
    <Login />
  </Provider>
);

describe('Login', () => {
  test('should snapshot renders', () => {
    const login = renderer.create(loginComponent());

    let tree = login.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render Screens.Login.loginButton trans in Login', () => {
    const { getByText } = render(loginComponent());
    expect(getByText(trans('Screens.Login.loginButton'))).toBeInTheDocument();
  });

  test('should render words.user in first input', () => {
    const login = render(loginComponent());

    login.getAllByText(trans('words.user')).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('should render words.password in second input', () => {
    const login = render(loginComponent());

    login.getAllByText(trans('words.password')).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
