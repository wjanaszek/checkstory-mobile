import { endpoints } from '../../config/appConfig';
import {
    LOGIN,
    LOGIN_FAIL,
    LOGIN_IN_PROGRESS,
    LOGIN_SUCCESS,
    SIGN_UP,
    SIGN_UP_FAIL,
    SIGN_UP_IN_PROGRESS,
    SIGN_UP_SUCCESS
} from '../actions/auth';
import { LOAD_STORIES } from '../actions/stories';
import { Actions } from 'react-native-router-flux';

export const apiAuthMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOGIN:
            // Dispatch LOGIN_IN_PROGRESS to update loading state
            store.dispatch({type: LOGIN_IN_PROGRESS});
            // Make API call and dispatch approciate actions when done
            fetch(`${endpoints.login}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: action.username,
                    password: action.password
                })
            })
                .then(response => response.json())
                .then(response => {
                    console.log(response);
                    const authorization = response.accessToken;
                    if (authorization !== null && authorization !== undefined) {
                        console.log('authorization ' + authorization);
                        next({
                            type: LOGIN_SUCCESS,
                            username: action.username,
                            token: authorization
                        });
                        store.dispatch({
                            type: LOAD_STORIES,
                            token: authorization
                        });
                    } else {
                        next({
                            type: LOGIN_FAIL,
                            error: 'Login or password incorrect'
                        })
                    }
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: LOGIN_FAIL,
                        error: 'Login or password incorrect'
                    })
                });
            break;
        case SIGN_UP:
            store.dispatch({type: SIGN_UP_IN_PROGRESS});
            fetch(`${endpoints.signUp}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.user)
            })
                .then(response => response.json())
                .then(data => {
                    if (!data.code) {
                        next({
                            type: SIGN_UP_SUCCESS
                        });
                    } else {
                        next({
                            type: SIGN_UP_FAIL, error: data.message
                        });
                    }
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: SIGN_UP_FAIL, error
                    })
                });
            break;
        // Do nothing if the action does not interest us
        default:
            break;
    }
};

export function errorPopup() {
    Actions.popup({
        title: 'Error',
        message: 'Some error occured',
        yesOptionMsg: 'OK'
    });
}