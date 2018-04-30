/*jshint esversion: 6 */ 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// middleware for body-parser
app.use(bodyParser.json());

// class objects
Genre = require('./models/genre');
Book = require('./models/book');

// connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

app.get('/', (req, res) => {
    res.send("Please use /api/books or /api/genre");
});

app.get('/api/genres', (req, res) => {
    Genre.getGenres((err, genres) => {
        if (err) throw err;
        res.json(genres);
    });
});

// add genre
app.post('/api/genres', (req, res) => {
    const genre = req.body; // use of body-parser

    Genre.addGenre(genre, (err, genre) => {
        if (err) throw err;
        res.json(genre);
    });
});

// update genre
app.put('/api/genres/:_id', (req, res) => {

    const id = req.params._id;
    const genre = req.body; // use of body-parser

    Genre.updateGenre(id, genre, {}, (err, genre) => { // {} blank param
        if (err) throw err;
        res.json(genre);
    });
});

// Delete genre
app.delete('/api/genres/:_id', (req, res) => {
    
    const id = req.params._id;

    Genre.removeGenre(id, (err, genre) => { // {} blank param
        if (err) throw err;
        res.json(genre);
    });
});

/********************************************/

app.get('/api/books', (req, res) => {
    Book.getBooks((err, books) => {
        if (err) throw err;
        res.json(books);
    });
});

app.get('/api/books/:_id', (req, res) => {
    Book.getBookById(req.params._id, (err, book) => {
        if (err) throw err;
        res.json(book);
    });
});

// add book
app.post('/api/books', (req, res) => {
    const book = req.body; // use of body-parser

    Book.addBook(book, (err, genre) => {
        if (err) throw err;
        res.json(book);
    });
});

// update book
app.put('/api/books/:_id', (req, res) => {
    
    const id = req.params._id;
    const book = req.body; // use of body-parser

    Book.updateBook(id, book, {}, (err, book) => { // {} blank param
        if (err) throw err;
        res.json(book);
    });
});

// Delete book
app.delete('/api/books/:_id', (req, res) => {
    
    const id = req.params._id;

    Book.removeBook(id, (err, book) => { // {} blank param
        if (err) throw err;
        res.json(book);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));