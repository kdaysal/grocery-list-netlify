/* global require, module */ //this prevents eslint from marking these undefined vars as errors

const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {

})

// Get one user
router.get('/:id', (req, res) => {

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