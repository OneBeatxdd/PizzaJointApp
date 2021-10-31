import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import * as sagas from '../sagas';
import system from '../reducers/system';
import pizza from '../reducers/pizza';

const reducers = combineReducers({
  system,
  pizza,
});

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware, thunk, createLogger({ collapsed: true })];

const store = createStore(reducers, applyMiddleware(...middlewares));

Object.values(sagas).forEach(sagaMiddleware.run);

export default store;
