// export action names
// get photos
export const LOAD_PHOTOS = 'LOAD_PHOTOS';
export const LOAD_PHOTOS_IN_PROGRESS = 'LOAD_PHOTOS_IN_PROGRESS';
export const LOAD_PHOTOS_SUCCESS = 'LOAD_PHOTO_SUCCESS';
export const LOAD_PHOTOS_FAIL = 'LOAD_PHOTOS_FAIL';

// get one photo
export const LOAD_PHOTO = 'LOAD_PHOTO';
export const LOAD_PHOTO_IN_PROGRESS = 'LOAD_PHOTO_IN_PROGRESS';
export const LOAD_PHOTO_SUCCESS = 'LOAD_PHOTO_SUCCESS';
export const LOAD_PHOTO_FAIL = 'LOAD_PHOTO_FAIL';

// create photo
export const CREATE_PHOTO = 'CREATE_PHOTO';
export const CREATE_PHOTO_IN_PROGRESS = 'CREATE_PHOTO_IN_PROGRESS';
export const CREATE_PHOTO_SUCCESS = 'CREATE_PHOTO_SUCCESS';
export const CREATE_PHOTO_FAIL = 'CREATE_PHOTO_FAIL';

// update photo
export const UPDATE_PHOTO = 'UPDATE_PHOTO';
export const UPDATE_PHOTO_IN_PROGRESS = 'UPDATE_PHOTO_IN_PROGRESS';
export const UPDATE_PHOTO_SUCCESS = 'UPDATE_PHOTO_SUCCESS';
export const UPDATE_PHOTO_FAIL = 'UPDATE_PHOTO_FAIL';

// delete photo
export const DELETE_PHOTO = 'DELETE_PHOTO';
export const DELETE_PHOTO_IN_PROGRESS = 'DELETE_PHOTO_IN_PROGRESS';
export const DELETE_PHOTO_SUCCESS = 'DELETE_PHOTO_SUCCESS';
export const DELETE_PHOTO_FAIL = 'DELETE_PHOTO_FAIL';

export const getAllPhotos = (token, storyId) => {
    return {
        type: LOAD_PHOTOS,
        token: token,
        storyId: storyId
    }
};

export const getById = (token, storyId, photoId) => {
    return {
        type: LOAD_PHOTO,
        token: token,
        storyId: storyId,
        photoId: photoId
    }
};

export const createPhoto = (token, storyId, photo) => {
    return {
        type: CREATE_PHOTO,
        token: token,
        storyId: storyId,
        photo: photo
    }
};

export const updatePhoto = (token, storyId, photoId, photo) => {
    return {
        type: UPDATE_PHOTO,
        token: token,
        storyId: storyId,
        photoId: photoId,
        photo: photo
    }
};

export const deletePhoto = (token, storyId, photoId) => {
    return {
        type: DELETE_PHOTO,
        token: token,
        storyId: storyId,
        photoId: photoId
    }
};