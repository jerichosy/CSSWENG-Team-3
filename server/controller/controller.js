var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const bcrypt = require('bcrypt');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./server/views/login.html'))
    },

    login: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)
        db.findOne(User, { branchName: name }, 'branchName branchPassword', (user) => {
            if (user) {
                console.log(user);
                bcrypt.compare(password, user.branchPassword, (err, result) => {
                    console.log(result);
                    if (result) {
                        console.log('Congrats')
                        res.status(200).json({ msg: 'Logged in successfully!' });
                    }
                    else {
                        console.log('Error 2 Wrong password')
                        res.json({ msg: 'The password is incorrect.' }).status(401);
                    }
                });
            } else {
                console.log('Error 3')
                res.json({ msg: 'The specified username was not found.' }).status(404)
            }
        })

    },

    signup: (req, res) => {
        const { name, password, isadmin } = req.body;
        console.log(req.body)
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function (err, hashed) {
            var user = {
                branchName: name,
                branchPassword: hashed,
                isAdmin: isadmin
            }

            db.insertOne(User, user, function (flag) {
                if (flag) {
                    console.log('Sign up successful');
                    res.status(201);
                } else {
                    console.log('Sign up failed');
                    res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                }
            })
            res.redirect('/');
        })
    },

    // For debugging HTTP Requests, delete in prod
    displayusers: (req, res) => {
        db.findMany(User, {}, 'branchName branchPassword', (user) => {
            if (user) {
                console.log(user);
                res.send(user);
            } else {
                console.log('Error 3')
            }
        })
    }

}

module.exports = controller;