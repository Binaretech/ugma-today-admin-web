import { lazy } from 'react';

const Login = lazy(() => import('../screens/login/Login'));
const NotFound = lazy(() => import('../screens/notFound/NotFound'));

export default (id) => {
  return [
    ...publicRoutes,
    ...id ? privateRoutes : []
  ];
};

const publicRoutes = [
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

const privateRoutes = [
  {
    path: '/price-list',
    exact: true,
    component: NotFound,
  },
  {
    path: '/price-create',
    exact: true,
    component: NotFound,
  },
];