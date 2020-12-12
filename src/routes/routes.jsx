import {Suspense} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Loader from '../components/loader/Loader';

import routes from './routeList';
import Root from '../components/root/Root';

function Routes() {
  return (
    <Router>
      <Suspense fallback={<Loader fullscreen />}>
        <Root>
          <Switch>
            {routes().map((route) => (
              <Route {...route} key={route.path} />
            ))}
          </Switch>
        </Root>
      </Suspense>
    </Router>
  );
}

export default Routes;
