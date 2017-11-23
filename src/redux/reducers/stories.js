import { Story } from '../../model/story';
import { LOAD_STORIES_FAIL, LOAD_STORIES_IN_PROGRESS, LOAD_STORIES_SUCCESS } from '../actions/stories';

const initialState = {
  stories: Story = [],
  loading: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORIES_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOAD_STORIES_SUCCESS: {
            return { ...state, stories: action.stories, loading: false };
        }
        case LOAD_STORIES_FAIL: {
            return { ...state, stories: null, loading: false };
        }
        default:
            return state;
    }
};