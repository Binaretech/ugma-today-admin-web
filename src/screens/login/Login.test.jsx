import React from 'react';
import Login from './Login';
import { render, fireEvent, screen } from '../../utils/test-utils';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { trans } from '../../trans/trans';
import renderer from 'react-test-renderer';
import apiEndpoints from '../../apiEndpoints';
import Xhr from '../../Xhr';

const fakeUser = {
  "data": {
    "id": 1,
    "username": "mari_conazo",
    "type": 0,
    "profile": {
      "name": "Dr. Halie Tillman",
      "lastname": "Bahringer",
      "email": "vhintz@example.org"
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTVkYjkzNjZhODU3ZjI4ZGFmMjFmOTY3YzNmZmQ0NmUzN2QxMjlkMWZmMzRmOTQ3NDM2YTY1MDU3YzUwM2RmMzlkMDU1NTU0ZDFkMjU5ODMiLCJpYXQiOjE2MDEyMzAxNTksIm5iZiI6MTYwMTIzMDE1OSwiZXhwIjoxNjMyNzY2MTU5LCJzdWIiOiIxIiwic2NvcGVzIjpbInVzZXIiXX0.XMB7JzHZnAhU-0XtTlvJeTZ-zkDK64CbtjZoSB_usNOYZsQ4PKACK30oL376Q8m7Gw9b_l00-4ZqUHtbWhnwFw4MHgYGyh37laKONTyQfWuOAGIazSRrSggg0u6EQz-9oyTfXgpm-NvjccuFyATbEBtKImWvTlkhrDvBs96oi2rZiKLvIvK5rTW0dvx9t3hvk8jyh-QZ4f_2vCnDNUuP1_0WrHVs7r7BZNmGLMXtJhFFOyz7lJAx9D8sTa401z7k2XDhsdqP96lc49eqsbWwZOQt_vJ1O5JcMCVyB4hzC-Wbg3k7VGsd7MIgILlpJ9j8Q8nvXXeX6ZosDzFWvuChndcyLaXrhPlKtIcjFblJixGsJZxdM5NE1rKRl5MgkWV9C65cIMdWqVJeydnMcHacJSGlUzpAyfYTjNeRTovqu_JfQOmEzwN6QJTMrFy-6urWq2xxO42wEvEQOFdzNoC6bHQ1eGB7pFrFsuLnTyuD3G8BIviU68Gy3WvOqW2AMVdUhXCPEMCSINrLW_eQ_cImr1FroPs5aQRGnFydNd04PPKJtiKdtx0FD3glYDl1i33_VQbsUMV95LU1OeK_bsj-lwgsTb1VCqrN5xYRaumnILlhzolQq_BzfmiiASOlndIDFZ8uTiHXP0D17vAdsXiGPd_49Qb0p4HD36QBDnx-cZg"
  }
};

jest.spyOn(global, 'fetch').mockImplementation(() => {
  Promise.resolve(fakeUser);
});

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
    const loginData = {
      username: 'mari',
      password: 'secret',
    };

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
