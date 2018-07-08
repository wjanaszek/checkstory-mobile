import { LOGIN, LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS, LOGOUT, SIGN_UP, SIGN_UP_SUCCESS } from '../actions/auth';
import { Actions } from 'react-native-router-flux';

const initialState = {
    loading: false,
    isLoggedIn: false,
    username: '',
    token: '',
    loginError: null,
    signUpError: null
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP: {
            return {...state, signUpError: null};
        }
        case LOGIN: {
            return {...state, loginError: null};
        }
        case LOGIN_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOGIN_SUCCESS: {
            Actions.reset('storyList');
            return { ...state, loading: false, username: action.username, token: action.token, isLoggedIn: true, loginError: null };
        }
        case LOGIN_FAIL: {
            return { ...state, loading: false, loginError: action.error };
        }
        case LOGOUT: {
            Actions.reset('home');
            return { ...state, isLoggedIn: false, username: '', token: '' };
        }
        case SIGN_UP_SUCCESS: {
            Actions.popup({
                title: 'Signup success',
                message: 'You sure you\'ve been successfully registred to checkstory!',
                yesOptionMsg: 'LOG IN'
            });
            return state;
        }
        default:
            return state;
    }
};
