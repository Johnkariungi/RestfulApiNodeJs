/*jshint esversion: 6 */ 
const mongoose = require('mongoose');

// Book Schema, not for the database but the application
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String
    },
    pages: {
        type: String
    },
    image_url: {
        type: String
    },
    buy_url: {
        type: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});
// make genre acessible from anywhere
const Book = module.exports = mongoose.model('Book', bookSchema);

// Get Books
module.exports.getBooks = (callback, limit) => { // limit returns multiple books
    Book.find(callback).limit(limit);
};

// Get Book
module.exports.getBookById = (id, callback) => { 
    Book.findById(id, callback);
};

// Add Book
module.exports.addBook = (book, callback) => {
    Book.create(book, callback);
};

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
    const query = { _id: id };

    const update = {
        title : book.title,
        genre : book.genre,
        description : book.description,
        author : book.author,
        publisher : book.publisher,
        pages : book.pages,
        image_url : book.image_url,
        buy_url : book.buy_url 
    };

    Book.findOneAndUpdate(query, update, options, callback);
};

// Delete Book

module.exports.removeBook = (id, callback) => {
    const query = { _id : id };
    Book.remove(query, callback);
};