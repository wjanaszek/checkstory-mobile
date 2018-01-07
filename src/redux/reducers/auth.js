import { LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS, LOGOUT, SIGN_UP_SUCCESS } from '../actions/auth';
import { Actions } from 'react-native-router-flux';

const initialState = {
    loading: false,
    isLoggedIn: false,
    username: '',
    token: '',
    error: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOGIN_SUCCESS: {
            Actions.reset('storyList');
            return { ...state, loading: false, username: action.username, token: action.token, isLoggedIn: true, error: null };
        }
        case LOGIN_FAIL: {
            return { ...state, loading: false, error: action.error };
        }
        case LOGOUT: {
            Actions.reset('home');
            return { ...state, isLoggedIn: false, username: '', token: '' };
        }
        case SIGN_UP_SUCCESS: {
            Actions.popup({
                title: 'Signup success',
                message: 'You sure you\'ve been successfully registred to checkstory!',
                yesOptionMsg: 'OK'
            });
            return state;
        }
        default:
            return state;
    }
};
