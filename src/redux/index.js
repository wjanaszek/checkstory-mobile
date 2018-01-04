import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducers/index';
import { apiAuthMiddleware } from './middleware/apiAuthMiddleware';
import { apiPhotosMiddleware } from './middleware/apiPhotosMiddleware';
import { apiStoriesMiddleware } from './middleware/apiStoriesMiddleware';

/**
 Store definition
 */
let store = createStore(rootReducer, {}, applyMiddleware(apiAuthMiddleware, apiPhotosMiddleware, apiStoriesMiddleware));

export default store;