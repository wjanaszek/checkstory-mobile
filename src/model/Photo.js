export default class Photo {
    id;
    imageType;  // image type (JPG, JPEG or PNG)
    content;       // base64 encoded image data
    createDate;
    originalPhoto;
    storyId;

    constructor(imageType, data) {
        this.imageType = imageType;
        this.content = data;
        this.createDate = new Date();
        this.originalPhoto = 'f';
    }
}