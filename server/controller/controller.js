var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const Expense = require('../models/branch/ExpenseSchema.js');
const Sales = require('../models/branch/SalesSchema.js');
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

    addSales: (req, res) => {
        const { branchID, item, category, amount, notes } = req.body;
        console.log(req.body)
        var sales = {
            branchID: branchID,
            item: item,
            category: category,
            amount: amount,
            notes: notes
        }

        db.insertOne(Sales.Branch, sales, function (flag) {
            if (flag) {
                console.log('Sales added');
                res.status(201).json({ msg: '201 Created' });  //201 Created
            } else {
                console.log('Sales not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    },

    addExpense: (req, res) => {
        const { branchID, sales, customercount } = req.body;
        console.log(req.body)
        var expense = {
            branchID: branchID,
            sales: sales,
            customercount: customercount
        }

        db.insertOne(Expense.Branch, expense, function (flag) {
            if (flag) {
                console.log('Expense added');
                res.status(201).json({ msg: '201 Created' });  //201 Created
            } else {
                console.log('Expense not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    }
}

module.exports = controller;