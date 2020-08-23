import React from 'react';
import Login from './Login';
import { render, fireEvent, screen } from '../../utils/test-utils';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { trans } from '../../trans/trans';
import renderer from 'react-test-renderer';
import apiEndpoints from '../../apiEndpoints';
import Xhr from '../../Xhr';
import axios from 'axios';

jest.mock('axios');

const loginComponentWithProvider = () => (
  <Provider store={store()}>
    <Login />
  </Provider>
);

describe('Login', () => {
  test('should snapshot renders', () => {
    const login = renderer.create(loginComponentWithProvider());

    let tree = login.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('should render Screens.Login.loginButton trans in Login', () => {
    const { getByText } = render(loginComponentWithProvider());
    expect(getByText(trans('Screens.Login.loginButton'))).toBeInTheDocument();
  });

  test('should render words.user in first input', () => {
    const login = render(loginComponentWithProvider());

    login.getAllByText(trans('words.user')).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('should render words.password in second input', () => {
    const login = render(loginComponentWithProvider());

    login.getAllByText(trans('words.password')).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('should get a successful login response from server', async () => {
    const res = {
      data: {},
      status: 200,
    };

    const loginData = {
      username: 'mari',
      password: 'secret',
    };

    axios.request.mockResolvedValue(res);

    Xhr.post(apiEndpoints.login, {
      data: loginData,
    })
      .send()
      .then((response) => expect(response).toHaveProperty('status', 200));
  });

  test('should fire login button click event', async () => {
    render(<Login />);

    fireEvent.click(screen.getByText(trans('Screens.Login.loginButton')));

    const elements = await screen.findAllByText('', {
      selector: 'div',
    });

    elements.forEach((div) => {
      expect(div).toBeTruthy();
    });
  });
});
