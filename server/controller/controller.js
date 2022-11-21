var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
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

    addExpense: (req, res) => {
        const { branchID, item, category, amount, notes } = req.body;
        console.log(req.body)
        var expense = {
            branchID: branchID,
            item: item,
            category: category,
            amount: amount,
            notes: notes
        }

        db.insertOne(Expense.Branch, expense, function (flag) {
            if (flag) {
                console.log('Expense added');
                res.status(201).json({ msg: 'Expense added. 201 Created' });  //201 Created
            } else {
                console.log('Expense not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    },

    addSales: (req, res) => {
        const { branchID, sales, customercount, timeRangeFrom, timeRangeTo } = req.body;
        console.log(req.body)
        var salesobj = {
            branchID: branchID,
            sales: sales,
            customercount: customercount,
            timeRangeFrom: timeRangeFrom,
            timeRangeTo: timeRangeTo
        }

        db.insertOne(Sales.Branch, salesobj, function (flag) {
            if (flag) {
                console.log('Sales added');
                res.status(201).json({ msg: 'Sales Added. 201 Created' });  //201 Created
            } else {
                console.log('Sales not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    },

    viewExpense: (req, res) => {
        db.findMany(Expense.Branch, {}, '', function (expenses) {
            if (expenses) {
                console.log('Expenses shown');
                res.status(201).json({ expenses });  //201 Created
            } else {
                console.log('Expenses not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    viewSales: (req, res) => {
        db.findMany(Sales.Branch, {}, '', function (sales) {
            if (sales) {
                console.log('Sales shown');
                res.status(201).json({ sales });  //201 Created
            } else {
                console.log('Sales not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editExpense: (req, res) => {
        const { id, branchID, item, category, amount, notes } = req.body;
        var expense = {
            branchID: branchID,
            item: item,
            category: category,
            amount: amount,
            notes: notes
        }
        db.updateOne(Expense.Branch, { branchID: branchID, _id: new Object(id) }, expense, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Expense not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editSales: (req, res) => {
        const { id, branchID, sales, customercount, timeRangeFrom, timeRangeTo } = req.body;
        console.log(req.body)
        var salesobj = {
            branchID: branchID,
            sales: sales,
            customercount: customercount,
            timeRangeFrom: timeRangeFrom,
            timeRangeTo: timeRangeTo
        }

        db.updateOne(Sales.Branch, { branchID: branchID, _id: new Object(id) }, salesobj, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Sales not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    deleteExpense: (req, res) => {
        const { id } = req.body;
        db.deleteOne(Expense.Branch, { _id: new Object(id) }, function (flag) {
            if (flag) {
                console.log('Delete success: ' + flag);
                res.status(201).json({ msg: 'Delete success' })
            } else {
                console.log('Expense not deleted');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    deleteSales: (req, res) => {
        const { id } = req.body;
        db.deleteOne(Sales.Branch, { _id: new Object(id) }, function (flag) {
            if (flag) {
                console.log('Delete success: ' + flag);
                res.status(201).json({ msg: 'Delete success' })
            } else {
                console.log('Sales not deleted');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    // FIXME: Does not send a response. 
    // FIXME: Does not filter by branch.
    submitSalesAndExpenses: (req, res) => {
        function transfer(x, y) {
            db.findMany(x.Branch, {}, '', (result) => {
                console.log(y);
                if (result.length >= 1) {
                    db.insertMany(x.Admin, result, (flag) => {
                        if (flag) {
                            console.log(`${y} added: ${result.length}`);
                            // If the transfer is successful, delete all documents from the branch collection
                            db.deleteMany(x.Branch, {}, function (flag) {
                                if (flag) {
                                    console.log(`${y} deleted`);
                                    //res.status(201).json({ msg: '201 Created' });  //201 Created
                                } else {
                                    console.log(`${y} not deleted`);
                                    //res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                                }
                            })
                        } else {
                            console.log(`${y} not added: ${result.length}`);
                            //res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                        }
                    })
                } else {
                    console.log(`No result found`);
                }

            })
        }

        transfer(Sales, "Sales");
        transfer(Expense, "Expense");
        res.status(201).json({ msg: 'Done' });
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
    },

    viewBranch: (req, res) => {
        db.findMany(User, {}, '', function (branch) {
            if (branch) {
                console.log('Branch shown');
                res.status(201).json({ branch });  //201 Created
            } else {
                console.log('Branch not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    viewSalesFilter: (req, res) => {
        var { dateRangeFrom, dateRangeTo, timeRangeFrom, timeRangeTo, branches } = req.body;
        console.log(req.body);
        var dateRangeFrom = new Date(dateRangeFrom)
        var dateRangeTo = new Date(dateRangeTo)
        dateRangeTo.setDate(dateRangeTo.getDate() + 1)

        var filter = {
            createdAt: { $gte: dateRangeFrom, $lte: dateRangeTo },
            timeRangeFrom: { $gte: timeRangeFrom },
            timeRangeTo: { $lte: timeRangeTo },
            branchID: branches
        }
        console.log(filter)
        //change to admin
        db.findMany(Sales.Branch, filter, '', function (result) {
            if (result) {
                console.log('Result shown');
                res.status(201).json({ result });  //201 Created
            } else {
                console.log('Result not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    viewExpenseFilter: (req, res) => {

    }
}

module.exports = controller;