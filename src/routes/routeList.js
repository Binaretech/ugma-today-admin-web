import { lazy } from 'react';

const Login = lazy(() => import('../screens/login/Login'));
const NotFound = lazy(() => import('../screens/notFound/NotFound'));

export default [
  {
    path: '/',
    exact: true,
    component: Login,
  },
  {
    path: '*',
    component: NotFound,
  },
];
