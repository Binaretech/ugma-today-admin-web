import { lazy } from 'react';

const App = lazy(() => import('../screens/app/App'));
const NotFound = lazy(() => import('../screens/notFound/NotFound'));

export default [
  {
    path: '/',
    exact: true,
    component: App,
  },
  {
    path: '*',
    component: NotFound,
  },
];
