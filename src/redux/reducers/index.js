import { combineReducers } from 'redux';
import auth from './auth';
import stories from './stories';
import photos from './photos';

const rootReducer = combineReducers({
    auth,
    stories,
    photos
});

export default rootReducer;