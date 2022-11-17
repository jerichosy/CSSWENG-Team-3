var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const Expense = require('../models/branch/ExpenseSchema.js');
const Sales = require('../models/branch/SalesSchema.js');
const bcrypt = require('bcrypt');

const controller = {
    getIndex: (req, res) => {
        res.sendFile(path.resolve('./server/views/login.html'))
    },

    login: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)
        db.findOne(User, { branchID: name }, 'branchName branchPassword', (user) => {
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
                        res.status(401).json({ msg: 'The password is incorrect.' });
                    }
                });
            } else {
                console.log('Error 3')
                res.status(404).json({ msg: 'The specified username was not found.' });
            }
        })

    },

    signup: (req, res) => {
        const { name, password, isadmin } = req.body;
        console.log(req.body)

        db.findOne(User, { branchID: name }, '', (result) => {
            if (result) {
                console.log("User already exists");
                res.status(409).json({ msg: 'The specified username already exists.' });  //409 conflict
            }
            else {
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds, function (err, hashed) {
                    if (isadmin) {
                        var user = {
                            branchID: name,
                            branchPassword: hashed,
                            isAdmin: isadmin
                        }
                    }
                    else {
                        var user = {
                            branchID: name,
                            branchPassword: hashed,
                        }
                    }

                    db.insertOne(User, user, function (flag) {
                        if (flag) {
                            console.log('Sign up successful');
                            res.status(201).json({ msg: 'Sign Up Successful' });
                        } else {
                            console.log('Sign up failed');
                            res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                        }
                    })
                })
            }
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
    },

    // FIXME: Does not send a response. 
    // FIXME: Does not filter by branch.
    submitSalesAndExpenses: (req, res) => {
        function transfer(x, y) {
            db.findMany(x.Branch, {}, '', (result) => {
                console.log(y);

                db.insertMany(x.Admin, result, function (flag) {
                    if (flag) {
                        console.log(`${y} added: ${result.length}`);
                        // res.status(201).json({ msg: '201 Created' });  //201 Created

                        // If the transfer is successful, delete all documents from the branch collection
                        db.deleteMany(x.Branch, {}, function (flag) {
                            if (flag) {
                                console.log(`${y} deleted`);
                            } else {
                                console.log(`${y} not deleted`);
                            }
                        })
                    } else {
                        console.log(`${y} not added: ${result.length}`);
                        // res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                    }
                })
            })
        }

        transfer(Sales, "Sales");
        transfer(Expense, "Expense");
    },

    deleteBranch: (req, res) => {
        const { name } = req.body;
        console.log(req.body)
        db.deleteOne(User, { branchID: name }, function (flag) {
            if (flag) {
                console.log(` deleted`);
                res.status(201).json({ msg: 'branch deleted' }) //201 Created
            } else {
                console.log(` not deleted`);
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editBranch: (req, res) => {
        var { branchID, branchName, branchPassword } = req.body;
        console.log(branchPassword)
        const saltRounds = 10;
        bcrypt.hash(branchPassword, saltRounds, function (err, hashed) {
            branchPassword = hashed
            console.log(branchPassword)
            db.updateOne(User, { branchID: branchID }, {
                branchName: branchName,
                branchPassword: branchPassword
            }, function (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            })
        })
    }

}

module.exports = controller;