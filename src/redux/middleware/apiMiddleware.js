import { LOGIN, LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS } from '../reducers/auth';
import { apiUrl } from '../../../index';

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOGIN:
            console.log('sending ' + action.username + ', ' + action.password);
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
                    password: action.password,
                })
            })
            .then(response => {
                const authorization = response.headers.get('Authorization');
                if (authorization !== null) {
                    next({
                        type: LOGIN_SUCCESS,
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
        // Do nothing if the action does not interest us
        default:
            break;
    }
};