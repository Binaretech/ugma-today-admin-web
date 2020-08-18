import { lazy } from 'react';

const NotFound = lazy(() => import('../screens/notFound/NotFound'));

export default [
  {
    path: '*',
    component: NotFound,
  },
];
