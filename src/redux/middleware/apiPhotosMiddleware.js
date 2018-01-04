import {
    CREATE_PHOTO,
    CREATE_PHOTO_FAIL, CREATE_PHOTO_IN_PROGRESS, CREATE_PHOTO_SUCCESS,
    DELETE_PHOTO, DELETE_PHOTO_FAIL, DELETE_PHOTO_IN_PROGRESS, DELETE_PHOTO_SUCCESS, LOAD_PHOTO, LOAD_PHOTO_FAIL,
    LOAD_PHOTO_IN_PROGRESS, LOAD_PHOTOS, LOAD_PHOTOS_FAIL, LOAD_PHOTOS_IN_PROGRESS, LOAD_PHOTOS_SUCCESS,
    UPDATE_PHOTO,
    UPDATE_PHOTO_FAIL, UPDATE_PHOTO_IN_PROGRESS, UPDATE_PHOTO_SUCCESS
} from '../actions/photos';
import { apiUrl } from '../../config/appConfig';
import { errorPopup } from './apiAuthMiddleware';

export const apiPhotosMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOAD_PHOTOS:
            store.dispatch({ type: LOAD_PHOTOS_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    let photos = null;
                    // @TODO check why was data['photos']
                    // if (data['photos'].length) {
                    //     photos = data['photos'];
                    // } else {
                    //     photos = data;
                    // }
                    photos = data.photos.map(item => {
                        return {
                            id: item.photoNumber,
                            ownerId: item.owner_id,
                            originalPhoto: item.originalPhoto,
                            storyNumber: item.storyNumber,
                            imageType: item.imageType,
                            content: item.content,
                            createDate: item.createDate.split(' ')[0]
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
            store.dispatch({ type: LOAD_PHOTO_IN_PROGRESS });
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
        case CREATE_PHOTO:
            store.dispatch({ type: CREATE_PHOTO_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos`, {
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
                    const photo = data;
                    photo.id = data.photoNumber;
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
        case UPDATE_PHOTO:
            store.dispatch({ type: UPDATE_PHOTO_IN_PROGRESS });
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
                    fetch(`${apiUrl}/api/stories/${action.storyId}/photos/${action.photoId}`, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + action.token
                        }
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
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    errorPopup();
                    next({
                        type: UPDATE_PHOTO_FAIL, error
                    })
                });
            break;
        case DELETE_PHOTO:
            store.dispatch({ type: DELETE_PHOTO_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}/photos/${action.photoId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(data => {
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
        default:
            break;
    }
};
