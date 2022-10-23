/* global require, module */ //this prevents eslint from marking these undefined vars as errors

const mongoose = require('mongoose');

// creating a "user" schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  groceryListItems: {
    itemName: "pizza",
    aisle: String, // note - aisle could be a number OR a department, such as "deli", so I will make it into a String, and any actual numbers can be passed as strings like "3"
    reminder: false
  }
})