/*jshint esversion: 6 */ 
const mongoose = require('mongoose');

// Genre Schema, not for the database but the application
const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// make genre acessible from anywhere
const Genre = module.exports = mongoose.model('Genre', genreSchema);

// Model Functions

// Get Genres
module.exports.getGenres = (callback, limit) => {
    Genre.find(callback).limit(limit);
};

// Add Genre
module.exports.addGenre = (genre, callback) => {
    Genre.create(genre, callback);
};

// Update Genre
module.exports.updateGenre = (id, genre, options, callback) => {
    const query = { _id: id };

    const update = {
        name : genre.name
    };

    Genre.findOneAndUpdate(query, update, options, callback);
};

// Delete Genre
module.exports.removeGenre = (id, callback) => {
    const query = { _id : id };
    Genre.remove(query, callback);
};