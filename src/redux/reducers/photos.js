import { Story } from '../../model/story';
import { LOAD_PHOTO_FAIL, LOAD_PHOTOS_IN_PROGRESS, LOAD_PHOTOS_SUCCESS } from '../actions/photos';

const initialState = {
    story: Story,       // ? potrzebne ?
    photos: Photo = [],
    selectedPhoto: Photo = null,
    loading: false
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_PHOTOS_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOAD_PHOTOS_SUCCESS: {
            return { ...state, photos: action.photos, loading: false };
        }
        case LOAD_PHOTO_FAIL: {
            return { ...state, loading: false };
        }
        default:
            return state;
    }
}