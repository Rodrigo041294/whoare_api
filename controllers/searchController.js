const express = require('express');
const Facebook = require('../models/facebook.js');
const mongodb = require("mongodb").MongoClient;
const uri = "mongodb://localhost:27017";
const telefono = "526121772500";
const User = require('../models/user.js');

var router = express.Router();

router.post('/find', async function(req, res) {
    const sources = ['facebook', 'telmex', 'users']
    const results = [];
    const client = await mongodb.connect(uri);
    const db = client.db("whoare");
    for (const source of sources) {
        const collection = db.collection(source);
        const result = await db.collection(source).find({ telefono: req.body.telefono }).toArray();
        if (result.length) {
            results.push({[source]: result});
        }
    }
    return res.send(results);
});

module.exports = router;