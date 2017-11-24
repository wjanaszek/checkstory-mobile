import { combineReducers } from 'redux';
import auth from './auth';
import stories from './stories';
import story from './story';

const rootReducer = combineReducers({
    auth,
    stories,
    story
});

export default rootReducer;