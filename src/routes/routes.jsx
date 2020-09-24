import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { useSelector } from 'react-redux';

import routes from './routeList';

function Routes() {
  const userId = useSelector((state) => state.sessionReduer?.user?.id);

  return (
    <Router>
      <Suspense fallback={<Loader fullscreen />}>
        <Switch>
          {
            routes(userId).map((route) => (
              <Route {...route} key={route.path} />
            ))
          }
        </Switch>
      </Suspense>
    </Router>
  );
}

export default Routes;
