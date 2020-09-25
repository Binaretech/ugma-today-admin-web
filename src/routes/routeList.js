import { lazy } from 'react';

const Login = lazy(() => import('../screens/login/Login'));
const NotFound = lazy(() => import('../screens/notFound/NotFound'));
const Home = lazy(() => import('../screens/home/Home'));

export default (id) => {
  return [
    ...publicRoutes,
    ...(id ? privateRoutes : []),
    // {
    //   path: '*',
    //   component: NotFound,
    // },
  ];
};

const publicRoutes = [
  {
    path: '/login',
    exact: true,
    component: Login,
  },
];

const privateRoutes = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
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