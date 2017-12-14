import { apiUrl } from '../../config/appConfig';
import {
    LOGIN, LOGIN_FAIL, LOGIN_IN_PROGRESS, LOGIN_SUCCESS, SIGN_UP, SIGN_UP_FAIL,
    SIGN_UP_IN_PROGRESS, SIGN_UP_SUCCESS
} from '../actions/auth';
import {
    CREATE_STORY, CREATE_STORY_FAIL, CREATE_STORY_IN_PROGRESS, CREATE_STORY_SUCCESS, DELETE_STORY, DELETE_STORY_FAIL,
    DELETE_STORY_IN_PROGRESS, DELETE_STORY_SUCCESS,
    LOAD_STORIES, LOAD_STORIES_FAIL, LOAD_STORIES_IN_PROGRESS, LOAD_STORIES_SUCCESS,
    LOAD_STORY, LOAD_STORY_FAIL, LOAD_STORY_IN_PROGRESS, UPDATE_STORY, UPDATE_STORY_FAIL, UPDATE_STORY_IN_PROGRESS,
    UPDATE_STORY_IN_STORIES_SUCCESS,
    UPDATE_STORY_SUCCESS
} from '../actions/stories';
import {
    CREATE_PHOTO, CREATE_PHOTO_FAIL, CREATE_PHOTO_IN_PROGRESS, DELETE_PHOTO, DELETE_PHOTO_FAIL,
    DELETE_PHOTO_IN_PROGRESS, DELETE_PHOTO_SUCCESS,
    LOAD_PHOTO,
    LOAD_PHOTO_FAIL, LOAD_PHOTO_IN_PROGRESS, LOAD_PHOTOS, LOAD_PHOTOS_FAIL,
    LOAD_PHOTOS_IN_PROGRESS, LOAD_PHOTOS_SUCCESS, UPDATE_PHOTO, UPDATE_PHOTO_FAIL, UPDATE_PHOTO_IN_PROGRESS
} from '../actions/photos';

export const apiMiddleware = store => next => action => {
    // Pass all actions through by default
    next(action);
    switch (action.type) {
        case LOGIN:
            // Dispatch LOGIN_IN_PROGRESS to update loading state
            store.dispatch({ type: LOGIN_IN_PROGRESS });
            // Make API call and dispatch approciate actions when done
            fetch(`${apiUrl}/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: action.username,
                    password: action.password
                })
            })
                .then(response => {
                    const authorization = response.headers.get('Authorization');
                    if (authorization !== null) {
                        console.log('authorization ' + authorization.slice(7));
                        next({
                                type: LOGIN_SUCCESS,
                                username: action.username,
                                token: authorization.slice(7)
                            });
                        store.dispatch({
                            type: LOAD_STORIES,
                            token: authorization.slice(7)
                        });
                    } else {
                        next({
                            type: LOGIN_FAIL,
                            error: 'Login or password incorrect'
                        })
                    }
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: LOGIN_FAIL,
                        error: 'Login or password incorrect'
                    })
                });
            break;
        case SIGN_UP:
            store.dispatch({ type: SIGN_UP_IN_PROGRESS });
            fetch(`${apiUrl}/api/users`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(action.user)
            })
                .then(response => response.json())
                .then(data => {
                    next({
                        type: SIGN_UP_SUCCESS
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: SIGN_UP_FAIL, error
                    })
                });
            break;
        /**
         * STORIES
         */
        case LOAD_STORIES:
            store.dispatch({ type: LOAD_STORIES_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                   const stories = data.map(item => {
                       return {
                           id: item.id,
                           title: item.title,
                           notes: item.notes,
                           longitude: item.longitude,
                           latitude: item.latitude,
                           createDate: item.createDate
                       }
                   });
                   next({
                       type: LOAD_STORIES_SUCCESS,
                       stories: stories
                   })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: LOAD_STORIES_FAIL,
                        error
                    })
                });
            break;
        case LOAD_STORY:
            store.dispatch({ type: LOAD_STORY_IN_PROGRESS });
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
                    console.log('load story result ' + JSON.stringify(data.content))
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: LOAD_STORY_FAIL,
                        error
                    })
                });
            break;
        case CREATE_STORY:
            store.dispatch({ type: CREATE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.story)
            })
                .then(response => response.json())
                .then(data => {
                    const story = data;
                    next({
                        type: CREATE_STORY_SUCCESS,
                        story: story
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: CREATE_STORY_FAIL, error
                    })
                });
            break;
        case UPDATE_STORY:
            store.dispatch({ type: UPDATE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                },
                body: JSON.stringify(action.story)
            })
                .then(response => response.json())
                .then(data => {
                    const story = data;
                    next({
                        type: UPDATE_STORY_SUCCESS,
                        story: story
                    });
                    store.dispatch({
                        type: UPDATE_STORY_IN_STORIES_SUCCESS,
                        story: story
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: UPDATE_STORY_FAIL, error
                    })
                });
            break;
        case DELETE_STORY:
            store.dispatch({ type: DELETE_STORY_IN_PROGRESS });
            fetch(`${apiUrl}/api/stories/${action.storyId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + action.token
                }
            })
                .then(response => response.json())
                .then(data => {
                    next({
                        type: DELETE_STORY_SUCCESS,
                        storyId: action.storyId
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
                    next({
                        type: DELETE_STORY_FAIL, error
                    })
                });
            break;
        /**
         * PHOTOS
         */
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
                            content: item.content
                        }
                    });
                    next({
                        type: LOAD_PHOTOS_SUCCESS,
                        photos: photos
                    });
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
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
                    photo.id = photo.photoNumber;
                    next({
                        type: CREATE_STORY_SUCCESS,
                        photo: photo
                    })
                })
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
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
                .then()
                .catch(error => {
                    console.log('error ' + JSON.stringify(error));
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
                    next({
                        type: DELETE_PHOTO_FAIL, error
                    })
                });
            break;
        // Do nothing if the action does not interest us
        default:
            break;
    }
};