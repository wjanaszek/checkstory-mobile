import {
    CREATE_STORY,
    CREATE_STORY_FAIL, CREATE_STORY_IN_PROGRESS, CREATE_STORY_SUCCESS,
    DELETE_STORY, DELETE_STORY_FAIL, DELETE_STORY_IN_PROGRESS, DELETE_STORY_SUCCESS, LOAD_STORIES, LOAD_STORIES_FAIL,
    LOAD_STORIES_IN_PROGRESS,
    LOAD_STORIES_SUCCESS, LOAD_STORY,
    LOAD_STORY_FAIL,
    LOAD_STORY_IN_PROGRESS, UPDATE_STORY,
    UPDATE_STORY_FAIL, UPDATE_STORY_IN_PROGRESS, UPDATE_STORY_IN_STORIES_SUCCESS, UPDATE_STORY_SUCCESS
} from '../actions/stories';
import { errorPopup } from './apiAuthMiddleware';
import { apiUrl } from '../../config/appConfig';

export const apiStoriesMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOAD_STORIES:
            store.dispatch({ type: LOAD_STORIES_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    const stories = data.map(item => {
                        return {
                            id: item.id,
                            title: item.title,
                            notes: item.notes,
                            longitude: item.longitude,
                            latitude: item.latitude,
                            createDate: item.createDate
                        }
                    });
                    next({
                        type: LOAD_STORIES_SUCCESS,
                        stories: stories
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: LOAD_STORIES_FAIL,
                        error
                    })
                });
            break;
        case LOAD_STORY:
            store.dispatch({ type: LOAD_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log('load story result ' + JSON.stringify(data.content))
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: LOAD_STORY_FAIL,
                        error
                    })
                });
            break;
        case CREATE_STORY:
            store.dispatch({ type: CREATE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.story)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const story = data;
                    next({
                        type: CREATE_STORY_SUCCESS,
                        story: story
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: CREATE_STORY_FAIL, error
                    })
                });
            break;
        case UPDATE_STORY:
            store.dispatch({ type: UPDATE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.story)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const story = data;
                    next({
                        type: UPDATE_STORY_SUCCESS,
                        story: story
                    });
                    store.dispatch({
                        type: UPDATE_STORY_IN_STORIES_SUCCESS,
                        story: story
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: UPDATE_STORY_FAIL, error
                    })
                });
            break;
        case DELETE_STORY:
            store.dispatch({ type: DELETE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    next({
                        type: DELETE_STORY_SUCCESS,
                        storyId: action.storyId
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: DELETE_STORY_FAIL, error
                    })
                });
            break;
        default:
            break;
    }
};
