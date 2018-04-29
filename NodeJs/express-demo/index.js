/*jshint esversion: 6 */ 
const Joi = require('joi');
const express = require('express');
const app = express();

// enable passing of json objects on body
app.use(express.json()); // use of middleware in the resourcing pipeline

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
];

app.get('/', (req, res) => {
    res.send('hello world!!!');
});

// define new routes app.get
app.get('/api/courses', (req, res) => { // get list of courses
   // res.send([1, 2, 3]);
   res.send(courses);
});

// get single course, endpoint /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // 404 Not Found //return; // exit the function
    if (!course) return res.status(404).send('The course with the given id was not found.');
        
    res.send(course);
});

// for required values - Route Paramters : demo for blog posts -- 2 parameters :year :month
/*http://localhost:3000/api/posts/2018/1*/
/*app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.params);
});*/

// query String parameters : using ? to sort by name(for additional data for backend purposes- optional values)
/*http://localhost:3000/api/posts/2018/1?sortBy=name*/
app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
});

// handler for creating a new course
app.post('/api/courses', (req, res) => {
    // define schema to shape the objects & parameters: joi
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
       // return; // don't want the rest of the function to be executed.
    
    /*if  (!req.body.name || req.body.name.length < 3) {*/
   /* if  (result.error) { // old way
        // 400 Bad Request
        //res.status(400).send('Name is required and should be a minmum of 3 charaters.');
        res.status(result.error.details[0].message);
        return; // don't want the rest of the function to be executed.
    }*/

    const course = {
        id: courses.length + 1, // manually assign id on server
        name: req.body.name
    };
    //put it in our array
    courses.push(course);
    // return the object in the body of the response
    res.send(course); // client needs to know the id of this new object(resource)
});

// update course
app.put('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    // If not existing, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Validate
    //  const result = validateCourse(req.body); --old way
    // object distructure for mordern JavaScript
    const { error } = validateCourse(req.body); // get result.error
    
    if (error) return res.status(400).send(error.details[0].message); //return; // exit the function { // no need for result.error
        // If invalid, return 400 - Bad request
        
    // Update course
    course.name = req.body.name; // you can set all other properties here.. desc/etc

    // Return the updates 
    res.send(course);

});

// Delete course
app.delete('/api/courses/:id', (req, res) => {
    // Lookup course
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // Not exsiting, return 404
    if (!course) return res.status(404).send('The course with the given ID was not found.');
    // Delete
    const index = courses.indexOf(course); // index of course from the array
    courses.splice(index, 1); // remove 1 object from courses array
    // Return the deleted course to client
    res.send(course);
});

function validateCourse(course) {
    // define schema to shape the objects & parameters: joi
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema); // object
    //console.log(result);
}

// PORT -- to change the port on local -- export PORT=5000 for (mac) for windows set PORT=5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));