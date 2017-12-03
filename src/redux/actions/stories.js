// export action names
// get stories
export const LOAD_STORIES = 'LOAD_STORIES';
export const LOAD_STORIES_IN_PROGRESS = 'LOAD_STORIES_IN_PROGRESS';
export const LOAD_STORIES_SUCCESS = 'LOAD_STORIES_SUCCESS';
export const LOAD_STORIES_FAIL = 'LOAD_STORIES_FAIL';

// get one story
export const LOAD_STORY = 'LOAD_STORY';
export const LOAD_STORY_IN_PROGRESS = 'LOAD_STORY_IN_PROGRESS';
export const LOAD_STORY_SUCCESS = 'LOAD_STORY_SUCCESS';
export const LOAD_STORY_FAIL = 'LOAD_STORY_FAIL';

// create story
export const CREATE_STORY = 'CREATE_STORY';
export const CREATE_STORY_IN_PROGRESS = 'CREATE_STORY_IN_PROGRESS';
export const CREATE_STORY_SUCCESS = 'CREATE_STORY_SUCCESS';
export const CREATE_STORY_FAIL = 'CREATE_STORY_FAIL';

// update story
export const UPDATE_STORY = 'UPDATE_STORY';
export const UPDATE_STORY_IN_PROGRESS = 'UPDATE_STORY_IN_PROGRESS';
export const UPDATE_STORY_SUCCESS = 'UPDATE_STORY_SUCCESS';
export const UPDATE_STORY_FAIL = 'UPDATE_STORY_FAIL';

// delete story
export const DELETE_STORY = 'DELETE_STORY';
export const DELETE_STORY_IN_PROGRESS = 'DELETE_STORY_IN_PROGRESS';
export const DELETE_STORY_SUCCESS = 'DELETE_STORY_SUCCESS';
export const DELETE_STORY_FAIL = 'DELETE_STORY_FAIL';

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

export const updateStory = (token, story) => {
    return {
        type: UPDATE_STORY,
        token: token,
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

