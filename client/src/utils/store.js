import {compose, createStore, applyMiddleware} from "redux";

import thunk from "redux-thunk";

// All component reducers
import rootReducer from "./reducers";

const initialState = {};
const enhancer = [];

const devTool = window.__REDUX_DEVTOOLS_EXTENSION__;
if(typeof devTool === 'function') {
    enhancer.push(devTool());
}

const composedEnhancers = compose(
    applyMiddleware(thunk),
    ...enhancer
);

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
);

export default store;
