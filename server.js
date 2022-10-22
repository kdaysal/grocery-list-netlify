require('dotenv').config(); //load all environment variables from the .env file

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.listen(3000, () => console.log(`server is running`));

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }); //see '.env' file for corresponding DATABASE_URL
const db = mongoose.connection;
db.on('error', (error) => console.error(error)); //if there is an error connecting to my db, log the error
db.once('open', () => console.log('connected to database, yay!')); //if I successfully connect, log this message (will only run once)

