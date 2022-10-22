const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.listen(3000, () => console.log(`server is running`));

mongoose.connect('mongodb://localhost/grocery-list', { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database, yay!'));

