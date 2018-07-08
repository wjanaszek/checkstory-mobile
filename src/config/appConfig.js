export const apiUrl = 'http://10.0.2.2:8080';
// export const apiUrl = 'http://192.168.0.11:8080';

export const endpoints = {
    // Auth endpoints
    login: apiUrl + '/api/auth/login',
    signUp: apiUrl + '/api/auth/sign-up',
    checkEmail: apiUrl + '/api/auth/check/email',
    checkUsername: apiUrl + '/api/auth/check/username',
    // Stories endpoints
    allStories: 'api/stories',     // GET
    getOneStory: 'api/stories/:id',    // GET
    createStory: 'api/stories',        // POST
    updateStory: 'api/stories/:id',    // PUT
    deleteStory: 'api/stories/:id',    // DELETE
    // Photos endpoints
    allPhotos: 'api/stories/:storyId/photos',  // GET
    getOnePhoto: 'api/stories/:storyId/photos/:photoId',   // GET
    createPhoto: 'api/stories/:storyId/photos',    // POST
    updatePhoto: 'api/stories/:storyId/photos/:photoId',   // PUT
    deletePhoto: 'api/stories/:storyId/photos/:photoId'    // DELETE
};