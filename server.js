const express = require('express');
const mongoose = require('mongoose');
const authcontroller = require('./controllers/authController');
const searchcontroller = require('./controllers/searchController');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(authcontroller);
app.use(searchcontroller);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/whoare', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("Successfully connected to the database");
    })
    .catch(error => {
        console.log('Could not connect to the database.', error);
        process.exit();
    });

app.listen(8100);
console.log('🚀 Listening on port 8100');