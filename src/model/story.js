export default class Story {
    id;        // story number
    ownerId;     // owner id
    title;      // story title
    notes;      // notes about the story
    latitude;   // to google maps api (?)
    longitude;  // to google maps api (?)
    createDate; // creation date
    photos;     // array of photos


    constructor(title, notes, latitude, longitude, createDate) {
        this.title = title;
        this.notes = notes;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createDate = createDate;
    }
};