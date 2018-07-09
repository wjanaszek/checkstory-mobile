import {
    LOAD_STORY_FAIL,
    LOAD_STORY_IN_PROGRESS,
    LOAD_STORY_SUCCESS,
    UPDATE_STORY_FAIL,
    UPDATE_STORY_IN_PROGRESS,
    UPDATE_STORY_SUCCESS
} from '../actions/stories';
import { Story } from '../../model/Story';
import {
    ADD_PHOTO_TO_COMPARE,
    COMPARE_PHOTOS_FAIL,
    COMPARE_PHOTOS_SUCCESS,
    CREATE_PHOTO_FAIL,
    CREATE_PHOTO_IN_PROGRESS,
    CREATE_PHOTO_SUCCESS,
    DELETE_PHOTO_FAIL,
    DELETE_PHOTO_IN_PROGRESS,
    DELETE_PHOTO_SUCCESS,
    LOAD_PHOTO_FAIL,
    LOAD_PHOTO_IN_PROGRESS,
    LOAD_PHOTO_SUCCESS,
    LOAD_PHOTOS_FAIL,
    LOAD_PHOTOS_IN_PROGRESS,
    LOAD_PHOTOS_SUCCESS,
    REMOVE_PHOTO_TO_COMPARE,
    UPDATE_PHOTO_FAIL,
    UPDATE_PHOTO_IN_PROGRESS,
    UPDATE_PHOTO_SUCCESS
} from '../actions/photos';
import { Actions } from 'react-native-router-flux';
import { errorPopup } from '../middleware/apiAuthMiddleware';

const initialState = {
    story: null,
    photos: [],
    photosToCompare: [],
    comparedPhotos: null,
    selectedPhoto: null,
    loading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_PHOTO_TO_COMPARE: {
            return {
                ...state,
                photosToCompare: [...state.photosToCompare, action.photoId]
            };
        }

        case REMOVE_PHOTO_TO_COMPARE: {
            return {
                ...state,
                photosToCompare: state.photosToCompare.filter(photoId => photoId !== action.photoId)
            };
        }

        case LOAD_STORY_IN_PROGRESS:
        case LOAD_PHOTOS_IN_PROGRESS:
        case LOAD_PHOTO_IN_PROGRESS:
        case CREATE_PHOTO_IN_PROGRESS:
        case UPDATE_PHOTO_IN_PROGRESS:
        case DELETE_PHOTO_IN_PROGRESS:
        case UPDATE_STORY_IN_PROGRESS: {
            return {...state, loading: true};
        }
        case LOAD_STORY_FAIL:
        case LOAD_PHOTOS_FAIL:
        case LOAD_PHOTO_FAIL:
        case CREATE_PHOTO_FAIL:
        case UPDATE_PHOTO_FAIL:
        case DELETE_PHOTO_FAIL:
        case UPDATE_STORY_FAIL: {
            Actions.pop();
            return {...state, loading: false};
        }
        case COMPARE_PHOTOS_FAIL: {
            if (Actions.currentScene === 'popup') {
                Actions.pop();
            }
            errorPopup();
        }
        case LOAD_STORY_SUCCESS: {
            return {
                ...state,
                story: action.story,
                loading: false
            };
        }
        case LOAD_PHOTOS_SUCCESS: {
            return {...state, photos: action.photos, photosToCompare: [], loading: false};
        }
        case LOAD_PHOTO_SUCCESS: {
            return {...state, selectedPhoto: action.photo, loading: false};
        }
        case COMPARE_PHOTOS_SUCCESS: {
            if (Actions.currentScene === 'popup') {
                Actions.pop();
            }
            Actions.imagePreview({imageType: action.comparedPhotos.imageType, content: action.comparedPhotos.content});
            return {...state, comparedPhotos: action.comparedPhotos};
        }
        case CREATE_PHOTO_SUCCESS: {
            const photos = [...state.photos, action.photo];
            return {...state, photos, selectedPhoto: null, loading: false};
        }
        case UPDATE_PHOTO_SUCCESS: {
            return {
                ...state, photos: state.photos.map(photo => {
                    if (photo.id === action.photoId) {
                        return action.photo;
                    } else {
                        return photo;
                    }
                }), selectedPhoto: null, loading: false
            };
        }
        case DELETE_PHOTO_SUCCESS: {
            Actions.pop();
            return {
                ...state,
                photos: state.photos.filter(photo => photo.id !== action.photoId),
                photosToCompare: state.photosToCompare.filter(photoId => photoId !== action.photoId),
                selectedPhoto: null,
                loading: false,
            };
        }
        case UPDATE_STORY_SUCCESS: {
            Actions.pop();
            const story = {...state.story};
            story.title = action.story.title;
            story.notes = action.story.notes;
            story.latitude = action.story.latitude;
            story.longitude = action.story.longitude;
            story.createDate = action.story.createDate;
            return {...state, story, loading: false};
        }
        default:
            return state;
    }
}

