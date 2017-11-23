import { combineReducers } from 'redux';
import auth from './auth';
import stories from './stories';

const rootReducer = combineReducers({
    auth,
    stories
});

export default rootReducer;