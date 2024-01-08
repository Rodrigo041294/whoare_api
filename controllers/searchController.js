const express = require('express');
const Facebook = require('../models/facebook.js');
const mongodb = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017";
const telefono = "526121772500";
const User = require('../models/user.js');

var router = express.Router();

router.post('/find', async function(req, res) {
    const client = await mongodb.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db("whoare");
    const collection = db.collection("facebook");
    const result = await collection.find({ telefono: req.body.telefono }).toArray();
    console.log(result);
    res.send(result);
});

module.exports = router;