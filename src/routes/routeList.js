import { lazy } from 'react';
import paths from './paths';

const Login = lazy(() => import('../screens/login/Login'));
const NotFound = lazy(() => import('../screens/notFound/NotFound'));
const Home = lazy(() => import('../screens/home/Home'));
const CreateCost = lazy(() => import('../screens/createCost/CreateCost'));
const ListCosts = lazy(() => import('../screens/listCosts/ListCosts'));

export default (id) => {
  return [
    ...publicRoutes,
    ...(id ? privateRoutes : []),
    {
      path: '*',
      component: NotFound,
    },
  ];
};

const publicRoutes = [
  {
    path: paths.login,
    exact: true,
    component: Login,
  },
];

const privateRoutes = [
	{
		path: paths.home,
		exact: true,
		component: Home,
	},
	{
		path: paths.costList,
		exact: true,
		component: ListCosts,
	},
	{
		path: paths.createCost,
		exact: true,
		component: CreateCost,
	},
];