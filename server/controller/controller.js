var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const bcrypt = require('bcrypt');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./views/login.html'))
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
                        res.redirect('/');
                    }
                    else {
                        console.log('Error 2 Wrong pass')
                        res.redirect('/');
                    }
                });
            } else {
                console.log('Error 3')
                res.redirect('/');
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
                } else {
                    console.log('Sign up failed');
                }
            })
            res.redirect('/');
        })
    }

}

module.exports = controller;