export var Story = {
    id: number,         // story number
    ownerId: number,     // owner id
    title: string,      // story title
    notes: string,      // notes about the story
    latitude: number,   // to google maps api (?)
    longitude: number,  // to google maps api (?)
    createDate: string, // creation date
    photos: []     // array of photos
};