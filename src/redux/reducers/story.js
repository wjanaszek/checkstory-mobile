import {
    LOAD_STORY_FAIL, LOAD_STORY_IN_PROGRESS, LOAD_STORY_SUCCESS, UPDATE_STORY_FAIL,
    UPDATE_STORY_IN_PROGRESS, UPDATE_STORY_SUCCESS
} from '../actions/stories';
import { Story } from '../../model/Story';
import {
    CREATE_PHOTO_FAIL,
    CREATE_PHOTO_IN_PROGRESS, CREATE_PHOTO_SUCCESS, DELETE_PHOTO_FAIL, DELETE_PHOTO_IN_PROGRESS, DELETE_PHOTO_SUCCESS,
    LOAD_PHOTO_FAIL, LOAD_PHOTO_IN_PROGRESS, LOAD_PHOTO_SUCCESS, LOAD_PHOTOS_FAIL, LOAD_PHOTOS_IN_PROGRESS,
    LOAD_PHOTOS_SUCCESS, UPDATE_PHOTO_FAIL, UPDATE_PHOTO_IN_PROGRESS, UPDATE_PHOTO_SUCCESS
} from '../actions/photos';
import { Actions } from 'react-native-router-flux';

const initialState = {
    story: null,
    photos: [],
    selectedPhoto: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORY_IN_PROGRESS:
        case LOAD_PHOTOS_IN_PROGRESS:
        case LOAD_PHOTO_IN_PROGRESS:
        case CREATE_PHOTO_IN_PROGRESS:
        case UPDATE_PHOTO_IN_PROGRESS:
        case DELETE_PHOTO_IN_PROGRESS:
        case UPDATE_STORY_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOAD_STORY_FAIL:
        case LOAD_PHOTOS_FAIL:
        case LOAD_PHOTO_FAIL:
        case CREATE_PHOTO_FAIL:
        case UPDATE_PHOTO_FAIL:
        case DELETE_PHOTO_FAIL:
        case UPDATE_STORY_FAIL: {
            Actions.pop();
            return { ...state, loading: false };
        }
        case LOAD_STORY_SUCCESS: {
            return { ...state, story: action.story, loading: false, };
        }
        case LOAD_PHOTOS_SUCCESS: {
            return { ...state, photos: action.photos, loading: false };
        }
        case LOAD_PHOTO_SUCCESS: {
            return { ...state, selectedPhoto: action.photo, loading: false };
        }
        case CREATE_PHOTO_SUCCESS: {
            const photos = [...state.photos];
            photos.push(action.photo);
            return { ...state, photos: photos, selectedPhoto: null, loading: false };
        }
        case UPDATE_PHOTO_SUCCESS: {
            const photos = [...state.photos];
            photos.forEach((photo) => {
                if (photo.id === action.photoId) {
                    photo = action.photo;
                }
            });
            return { ...state, photos: photos, selectedPhoto: null, loading: false };
        }
        case DELETE_PHOTO_SUCCESS: {
            const photos = [...state.photos];
            const index = photos.findIndex((photo) => photo.id === action.photoId);
            photos.splice(index, 1);
            Actions.pop();
            return { ...state, photos: photos, selectedPhoto: null, loading: false };
        }
        case UPDATE_STORY_SUCCESS: {
            // Actions.reset('storyList');
            Actions.pop();
            return { ...state, story: action.story, loading: false };
        }
        default:
            return state;
    }
}

