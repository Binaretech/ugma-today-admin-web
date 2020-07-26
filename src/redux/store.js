import { createStore } from 'redux';
import reducers from './reducers';


const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

export default createStore(reducers, {}, composeEnhacers
    && composeEnhacers());
