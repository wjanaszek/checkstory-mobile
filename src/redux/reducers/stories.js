import { Story } from '../../model/story';

// export action names
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORIES_IN_PROGRESS = 'LOAD_STORIES_IN_PROGRESS';
export const LOAD_STORIES_SUCCESS = 'LOAD_STORIES_SUCCESS';
export const LOAD_STORIES_FAIL = 'LOAD_STORIES_FAIL';

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