import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/index';
import { apiMiddleware } from './middleware/apiMiddleware';

/**
 Store definition
 */
let store = createStore(rootReducer, {}, applyMiddleware(apiMiddleware));

export default store;