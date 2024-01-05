const express = require('express');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const User = require('../models/user.js');
 
var router = express.Router();

const saltRounds = 10;
router.post('/user', function(req, res) {
    User.findOne({ email: req.body.email })
        .then(existingUser => {
            if (existingUser) {
                return res.status(409).send({ message: 'User with the same userId already exists' });
            }
            const user = new User({
                userId: uuid.v4(),
                name: req.body.name,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                password: '',
                role: req.body.role,
                status: 'active'
            });
            console.log(user);

            bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
                if (err) {
                    return res.status(500).send({ message: `Error hashing password: ${err.message}` });
                }
                user.password = hash;

                user.save()
                    .then(data => {
                        res.send({ message: "Successfully added user " + data.name });
                    })
                    .catch(err => {
                        res.status(500).send({ message: `Error creating user ${err.message}` });
                    });
            });
        })
        .catch(err => {
            res.status(500).send({ message: `Error checking existing user: ${err.message}` });
        });
});

router.get('/user/:id', function(req,res){
    User.find({userId:req.params.id})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {         
        return res.status(500).send({
            message: `Error retrieving user : ${err.message}`
        });
    });
});

router.put('/user', function(req, res) {
    const updatedUser = {
        userId: req.body.userId,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        status: req.body.status
    };
    if (req.body.password) {
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            if (err) {
                return res.status(500).send({ message: `Error hashing password: ${err.message}` });
            }
            updatedUser.password = hash;
            updateUser(updatedUser);
        });
    } else {
        updateUser(updatedUser);
    }

    function updateUser(userToUpdate) {
        User.findOneAndUpdate({ userId: req.body.userId }, userToUpdate, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found"
                    });
                }
                res.send(user);
            })
            .catch(err => {
                return res.status(500).send({
                    message: `Error updating user: ${err.message}`
                });
            });
    }
});

router.delete('/user/:id',function (req,res){
    User.findOneAndDelete({userId:req.params.id})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found "
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {         
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
});

module.exports = router;
