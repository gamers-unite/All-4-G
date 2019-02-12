// import { createStore, applyMiddleware, combineReducers, compose } from "redux";
// import promiseMiddleware from 'redux-promise-middleware';

// import userReducer from './ducks/userReducer';
// import gamesReducer from './ducks/gamesReducer';
// import requestReducer from './ducks/requestReducer';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(combineReducers(
//     userReducer,
//     gamesReducer,
//     requestReducer,
//     composeEnhancers(applyMiddleware(promiseMiddleware())))
// );

// export default store;

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";

import userReducer from "./ducks/userReducer";
import gamesReducer from "./ducks/gamesReducer";
import requestReducer from "./ducks/requestReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducers = combineReducers({
    user: userReducer,
    games: gamesReducer,
    request: requestReducer
});

export default createStore(
    combinedReducers,
    composeEnhancers(applyMiddleware(promiseMiddleware))
);
