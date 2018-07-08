import {
    COMPARE_PHOTOS,
    COMPARE_PHOTOS_FAIL,
    COMPARE_PHOTOS_SUCCESS,
    CREATE_PHOTO,
    CREATE_PHOTO_FAIL,
    CREATE_PHOTO_IN_PROGRESS,
    CREATE_PHOTO_SUCCESS,
    DELETE_PHOTO,
    DELETE_PHOTO_FAIL,
    DELETE_PHOTO_IN_PROGRESS,
    DELETE_PHOTO_SUCCESS,
    LOAD_PHOTO,
    LOAD_PHOTO_FAIL,
    LOAD_PHOTO_IN_PROGRESS,
    LOAD_PHOTOS,
    LOAD_PHOTOS_FAIL,
    LOAD_PHOTOS_IN_PROGRESS,
    LOAD_PHOTOS_SUCCESS,
    UPDATE_PHOTO,
    UPDATE_PHOTO_FAIL,
    UPDATE_PHOTO_IN_PROGRESS,
    UPDATE_PHOTO_SUCCESS
} from '../actions/photos';
import { apiUrl } from '../../config/appConfig';
import { errorPopup } from './apiAuthMiddleware';

export const apiPhotosMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case COMPARE_PHOTOS:
            console.log('sending request to compare');
            fetch(`${apiUrl}/api/images-compare`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify({
                    originalImageId: action.firstPhotoId,
                    modifiedImageId: action.secondPhotoId,
                    resize: false,
                    boundingRectangles: false
                })
            })
                .then(response => response.json())
                .then(data => {
                    next({
                        type: COMPARE_PHOTOS_SUCCESS,
                        comparedPhotos: data
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: COMPARE_PHOTOS_FAIL,
                        error
                    })
                });
            break;
        case CREATE_PHOTO:
            store.dispatch({type: CREATE_PHOTO_IN_PROGRESS});
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.photo)
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const photo = {};
                    photo.id = data.id;
                    photo.originalPhoto = data.originalPhoto;
                    photo.content = data.content;
                    photo.createDate = data.createDate;
                    console.log('create date: ' + data.createDate);
                    next({
                        type: CREATE_PHOTO_SUCCESS,
                        photo: photo
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: CREATE_PHOTO_FAIL, error
                    })
                });
            break;
        case DELETE_PHOTO:
            store.dispatch({type: DELETE_PHOTO_IN_PROGRESS});
            console.log('deleting ' + action.photoId);
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos/${action.photoId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => {
                    console.log('data ' + JSON.stringify(response));
                    next({
                        type: DELETE_PHOTO_SUCCESS,
                        photoId: action.photoId
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: DELETE_PHOTO_FAIL, error
                    })
                });
            break;
        case LOAD_PHOTOS:
            store.dispatch({type: LOAD_PHOTOS_IN_PROGRESS});
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let photos = data.photos.map(item => {
                        return {
                            id: item.id,
                            originalPhoto: item.originalPhoto,
                            storyId: item.storyId,
                            imageType: item.imageType,
                            content: item.content,
                            createDate: `${item.createDate}`.split(' ')[0]
                        }
                    });
                    next({
                        type: LOAD_PHOTOS_SUCCESS,
                        photos: photos
                    });
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: LOAD_PHOTOS_FAIL,
                        error
                    })
                });
            break;
        case LOAD_PHOTO:
            store.dispatch({type: LOAD_PHOTO_IN_PROGRESS});
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos/${action.photoId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then()
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: LOAD_PHOTO_FAIL, error
                    })
                });
            break;
        case UPDATE_PHOTO:
            store.dispatch({type: UPDATE_PHOTO_IN_PROGRESS});
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos/${action.photoId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.photo)
            })
                .then(response => response.json())
                .then(data => {
                    next({
                        type: UPDATE_PHOTO_SUCCESS,
                        photoId: action.photoId,
                        photo: data
                    });
                })
                .catch(error => {
                    errorPopup();
                    next({
                        type: UPDATE_PHOTO_FAIL, error
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: UPDATE_PHOTO_FAIL, error
                    })
                });
            break;
        default:
            break;
    }
};
