// export action names
export const LOGIN = 'LOGIN_USER';
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

export const login = (username, password) => {
    return {
        type: LOGIN,
        username: username,
        password: password
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