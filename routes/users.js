/* global require, module */ //this prevents eslint from marking these undefined vars as errors

const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
// to test with Postman, run a GET call on url: http://localhost:3000/users
router.get('/', async (req, res) => {
  //res.send('Hello World from my /users route') // here the '/' is actually my '/users' route due to: <app.use('/users', usersRouter)> in my server.js file;
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Get one user
router.get('/:id', (req, res) => {
  res.send(`fetching details for user id: ${req.params.id}`);
})

// Create one user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    groceryListItems: req.body.groceryListItems
  })

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

// Update one user
router.patch('/:id', (req, res) => {

})

// Delete one user
router.delete('/:id', (req, res) => {

})

module.exports = router;