/* global require, module */ //this prevents eslint from marking these undefined vars as errors

const express = require('express');
const router = express.Router();

// Get all users
// to test with Postman, run a GET call on url: http://localhost:3000/users
router.get('/', (req, res) => {
  res.send('Hello World from my /users route') // here the '/' is actually my '/users' route due to: <app.use('/users', usersRouter)> in my server.js file;

})

// Get one user
router.get('/:id', (req, res) => {
  res.send(`fetching details for user id: ${req.params.id}`);
})

// Create one user
router.post('/', (req, res) => {

})

// Update one user
router.patch('/:id', (req, res) => {

})

// Delete one user
router.delete('/:id', (req, res) => {

})

module.exports = router;