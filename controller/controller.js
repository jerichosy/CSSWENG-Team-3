var path = require('path');
const dbUser = require('../models/dbUser.js');
const bcrypt = require('bcrypt');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./views/login.html'))
    },


    login: (req, res) => {


    },
    signup: (req, res) => {
        const { name, password, isadmin } = req.body;
        console.log(req.body)
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function (err, hashed) {
            if (err) {
                console.log(err)
            } else {
                dbUser.User.create({
                    branchName: name,
                    branchPassword: hashed,
                    isAdmin: isadmin,
                })
                res.redirect('/');
            }
        })
    }

}

module.exports = controller;