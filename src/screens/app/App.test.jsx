import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import renderer from 'react-test-renderer';

const fakeUser = {
  "id": 1,
  "username": "mari_conazo",
  "type": 0,
  "profile": {
    "name": "Dr. Halie Tillman",
    "lastname": "Bahringer",
    "email": "vhintz@example.org"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZTVkYjkzNjZhODU3ZjI4ZGFmMjFmOTY3YzNmZmQ0NmUzN2QxMjlkMWZmMzRmOTQ3NDM2YTY1MDU3YzUwM2RmMzlkMDU1NTU0ZDFkMjU5ODMiLCJpYXQiOjE2MDEyMzAxNTksIm5iZiI6MTYwMTIzMDE1OSwiZXhwIjoxNjMyNzY2MTU5LCJzdWIiOiIxIiwic2NvcGVzIjpbInVzZXIiXX0.XMB7JzHZnAhU-0XtTlvJeTZ-zkDK64CbtjZoSB_usNOYZsQ4PKACK30oL376Q8m7Gw9b_l00-4ZqUHtbWhnwFw4MHgYGyh37laKONTyQfWuOAGIazSRrSggg0u6EQz-9oyTfXgpm-NvjccuFyATbEBtKImWvTlkhrDvBs96oi2rZiKLvIvK5rTW0dvx9t3hvk8jyh-QZ4f_2vCnDNUuP1_0WrHVs7r7BZNmGLMXtJhFFOyz7lJAx9D8sTa401z7k2XDhsdqP96lc49eqsbWwZOQt_vJ1O5JcMCVyB4hzC-Wbg3k7VGsd7MIgILlpJ9j8Q8nvXXeX6ZosDzFWvuChndcyLaXrhPlKtIcjFblJixGsJZxdM5NE1rKRl5MgkWV9C65cIMdWqVJeydnMcHacJSGlUzpAyfYTjNeRTovqu_JfQOmEzwN6QJTMrFy-6urWq2xxO42wEvEQOFdzNoC6bHQ1eGB7pFrFsuLnTyuD3G8BIviU68Gy3WvOqW2AMVdUhXCPEMCSINrLW_eQ_cImr1FroPs5aQRGnFydNd04PPKJtiKdtx0FD3glYDl1i33_VQbsUMV95LU1OeK_bsj-lwgsTb1VCqrN5xYRaumnILlhzolQq_BzfmiiASOlndIDFZ8uTiHXP0D17vAdsXiGPd_49Qb0p4HD36QBDnx-cZg"
};

jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation(() => {
  return JSON.stringify(fakeUser);
});

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
