import { createStore } from 'redux';
import rootReducer from './reducers';

/**
 Store definition
 */
let store = createStore(rootReducer);

export default store;