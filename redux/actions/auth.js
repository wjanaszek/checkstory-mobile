import { LOGIN, LOGOUT } from '../reducers/auth';

export const login = (username, password) => {
    return {
        type: LOGIN,
        username: username
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
};

export const signup = (username, email, password) => {
    return (dispatch) => {

    }
};