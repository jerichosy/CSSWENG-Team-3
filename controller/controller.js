var path = require('path');
const dbUser = require('../models/dbUser.js');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./views/login.html'))
    },
    
    
    login: (req, res) => {

       
    },
    signup: (req,res) => {
        const {name, password, isadmin} = req.body;
        console.log(req.body)
        dbUser.User.create({
             
            branchName:     name,
            branchPassword: password,
            isAdmin:        isadmin,
        })
        res.redirect('/');
        
    }

}

module.exports = controller;