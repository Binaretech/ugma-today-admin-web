import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Loader from '../components/loader/Loader';

import routes from './routeList';

function Routes() {
    return (
        <Router>

            <Switch>
                <Suspense fallback={<Loader fullscreen />}>
                    {
                        routes.map((route) => <Route {...route} />)
                    }
                </Suspense>
            </Switch>
        </Router>
    );
}

export default Routes;