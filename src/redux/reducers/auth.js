// export action names
export const LOGIN = 'LOGIN_USER';
export const LOGIN_IN_PROGRESS = 'LOGIN_IN_PROGRESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

const defaultState = {
    loading: false,
    isLoggedIn: false,
    username: '',
    token: ''
};

export default function reducer(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_IN_PROGRESS: {
            console.log('in progressssss');
            return { ...state, loading: true };
        }
        case LOGIN_SUCCESS: {
            return { ...state, loading: false, username: action.username, token: action.token, isLoggedIn: true };
        }
        case LOGIN_FAIL: {
            return { ...state, loading: false };
        }
        case LOGOUT: {
            return { ...state, isLoggedIn: false, username: '', token: '' };
        }
        default:
            return state;
    }
};
