import { Story } from '../../model/story';
import { Actions } from 'react-native-router-flux';
import {
    CREATE_STORY_FAIL,
    CREATE_STORY_IN_PROGRESS, CREATE_STORY_SUCCESS, DELETE_STORY_FAIL, DELETE_STORY_IN_PROGRESS, DELETE_STORY_SUCCESS,
    LOAD_STORIES_FAIL,
    LOAD_STORIES_IN_PROGRESS,
    LOAD_STORIES_SUCCESS, UPDATE_STORY_IN_STORIES_SUCCESS
} from '../actions/stories';

// @TODO do story class/model
const initialState = {
  stories: [],
  story: null,
  storyId: null,
  loading: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORIES_IN_PROGRESS:
        case CREATE_STORY_IN_PROGRESS:
        case DELETE_STORY_IN_PROGRESS: {
            return { ...state, loading: true };
        }
        case LOAD_STORIES_FAIL:
        case CREATE_STORY_FAIL:
        case DELETE_STORY_FAIL: {
            return { ...state, loading: false };
        }
        case LOAD_STORIES_SUCCESS: {
            return { ...state, stories: action.stories, loading: false };
        }
        case CREATE_STORY_SUCCESS: {
            const stories = [...state.stories];
            stories.push(action.story);
            Actions.reset('storyList');
            return { ...state, stories: stories, loading: false };
        }
        case DELETE_STORY_SUCCESS: {
            const stories = [...state.stories];
            const index = stories.findIndex((story) => story.id === action.storyId);
            stories.splice(index, 1);
            Actions.reset('storyList');
            return { ...state, stories: stories, loading: false };
        }
        case UPDATE_STORY_IN_STORIES_SUCCESS: {
            const stories = [...state.stories];
            const index = stories.findIndex((story) => story.id === action.story.id);
            stories[index] = action.story;
            Actions.replace('storyDetail', {story: action.story});
            return { ...state, stories: stories, loading: false };
        }

        default:
            return state;
    }
};