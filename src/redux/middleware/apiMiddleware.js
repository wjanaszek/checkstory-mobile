import { LOGIN, LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS } from '../reducers/auth';
import { apiUrl, endpoints } from '../../config/appConfig';
import { LOAD_STORIES, LOAD_STORIES_FAIL, LOAD_STORIES_IN_PROGRESS, LOAD_STORIES_SUCCESS } from '../reducers/stories';

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOGIN:
            // Dispatch LOGIN_IN_PROGRESS to update loading state
            store.dispatch({ type: LOGIN_IN_PROGRESS });
            // Make API call and dispatch approciate actions when done
            fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: action.username,
                    password: action.password
                })
            })
                .then(response => {
                    const authorization = response.headers.get('Authorization');
                    if (authorization !== null) {
                        next({
                            type: LOGIN_SUCCESS,
                            username: action.username,
                            token: authorization.slice(7)
                        });
                        next({
                            type: LOAD_STORIES,
                            token: authorization.slice(7)
                        })
                    } else {
                        next({
                            type: LOGIN_FAIL,
                            response
                        })
                    }
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: LOGIN_FAIL,
                        error
                    })
                });
            break;
        case LOAD_STORIES:
            store.dispatch({ type: LOAD_STORIES_IN_PROGRESS });
            fetch(`${apiUrl}/${endpoints.allStories}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                   console.log('getStories result ' + JSON.stringify(data));
                   next({
                       type: LOAD_STORIES_SUCCESS,
                       stories: ''
                   })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: LOAD_STORIES_FAIL,
                        error
                    })
                });
        // Do nothing if the action does not interest us
        default:
            break;
    }
};