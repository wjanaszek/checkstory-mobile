// export action names
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORIES_IN_PROGRESS = 'LOAD_STORIES_IN_PROGRESS';
export const LOAD_STORIES_SUCCESS = 'LOAD_STORIES_SUCCESS';
export const LOAD_STORIES_FAIL = 'LOAD_STORIES_FAIL';

export const LOAD_STORY = 'LOAD_STORY';
export const LOAD_STORY_IN_PROGRESS = 'LOAD_STORY_IN_PROGRESS';
export const LOAD_STORY_SUCCESS = 'LOAD_STORY_SUCCESS';
export const LOAD_STORY_FAIL = 'LOAD_STORY_FAIL';
export const CREATE_STORY = 'CREATE_STORY';
export const UPDATE_STORY = 'UPDATE_STORY';
export const DELETE_STORY = 'DELETE_STORY';

export const getAllStories = (token) => {
    return {
        type: LOAD_STORIES,
        token: token
    }
};

export const getById = (token, storyId) => {
    return {
        type: LOAD_STORY,
        token: token,
        storyId: storyId
    }
};

export const createStory = (token, story) => {
    return {
        type: CREATE_STORY,
        token: token,
        story: story
    }
};

export const updateStory = (token, storyId, story) => {
    return {
        type: UPDATE_STORY,
        token: token,
        storyId: storyId,
        story: story
    }
};

export const deleteStory = (token, storyId) => {
    return {
        type: DELETE_STORY,
        token: token,
        storyId: storyId
    }
};

