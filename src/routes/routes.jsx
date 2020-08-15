import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../components/loader/Loader';

import routes from './routeList';

function Routes() {
  return (
    <Router>
      <Suspense fallback={<Loader fullscreen />}>
        <Switch>
          {routes.map((route) => (
            <Route {...route} key={route.path} />
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
