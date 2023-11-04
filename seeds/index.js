const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30 ) + 10;
        const camp = new Campground({
            author: '650391062885aba30e5f0d44', /* my own user ID  */
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'lorem ipsum sit amet campground lorem ipsum sit camp sit lorem sit ipsum campground',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
            ]
              },
            images: [
                {
                  url: 'https://res.cloudinary.com/ducukzwk6/image/upload/v1698358930/YelpCamp/tqbn9lndphkbkpsytk1l.png',
                  filename: 'YelpCamp/tqbn9lndphkbkpsytk1l',
                },
                {
                  url: 'https://res.cloudinary.com/ducukzwk6/image/upload/v1698358932/YelpCamp/qln59kbbfjtabv1itr0s.png',
                  filename: 'YelpCamp/qln59kbbfjtabv1itr0s',
                },
                {
                  url: 'https://res.cloudinary.com/ducukzwk6/image/upload/v1698358930/YelpCamp/oectgfes1a2wrnjqcnvk.jpg',
                  filename: 'YelpCamp/oectgfes1a2wrnjqcnvk',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then (() => {
    mongoose.connection.close() });