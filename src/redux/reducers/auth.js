import { LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS, LOGOUT } from '../actions/auth';

const initialState = {
    loading: false,
    isLoggedIn: false,
    username: '',
    token: ''
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_IN_PROGRESS: {
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
