import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import spaceReducer from './reducers/spaceReducer';

const rootReducer = combineReducers({
  space: spaceReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
