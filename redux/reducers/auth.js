// export action names
export const LOGIN = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

const defaultState = {
    isLoggedIn: false,
    username: '',
    token: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN: {
            return { ...state, isLoggedIn: true, username: action.username, token: action.token };
        }
        case LOGOUT: {
            return { ...state, isLoggedIn: false, username: '', token: '' };
        }
        default:
            return state;
    }
};
