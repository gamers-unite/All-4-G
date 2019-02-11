import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from 'redux-promise-middleware';

import userReducer from './reducers/userReducer';
import gamesReducer from './reducers/gamesReducer';
import requestReducer from './reducers/requestReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const combinedReducers = combineReducers({
    user: userReducer,
    games: gamesReducer,
    request: requestReducer
});

export default createStore( composeEnhancers, combinedReducers, applyMiddleware(promiseMiddleware()));