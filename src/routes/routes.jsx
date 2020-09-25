import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../components/loader/Loader';
import { useSelector } from 'react-redux';

import routes from './routeList';
import Root from '../components/root/Root';

function Routes() {
  const userId = useSelector((state) => state.sessionReducer?.id);

  return (
    <Router>
      <Suspense fallback={<Loader fullscreen />}>
        <Root>
          <Switch>
            {
              routes(userId).map((route) => (
                <Route {...route} key={route.path} />
              ))
            }
          </Switch>
        </Root>
      </Suspense>
    </Router>
  );
}

export default Routes;
