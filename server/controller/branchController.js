const db = require('../models/db.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');


const branchController = {
    addSales: (req, res) => {
        const { amount, customerCount, datetime } = req.body;
        console.log(req.body)
        var salesobj = {
            branchID: req.session.branchID,
            branchName: req.session.branchName,
            amount: amount,
            customerCount: customerCount,
            datetime: datetime
        }
        db.findOne(Sales.Branch, { datetime: datetime }, '', function (flag) {
            if (flag) {
                res.status(400).json({ reason: 'datetime', msg: 'Duplicate time record found!' });
            }
            else {
                db.insertOne(Sales.Branch, salesobj, function (flag) {
                    if (flag) {
                        console.log('Sales added');
                        res.status(201).json({ msg: 'Sales Added. 201 Created' });  //201 Created
                    } else {
                        // Will trigger if req.body format does not match schema
                        console.log('Sales not added');
                        res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                    }
                })
            }
        })

        // res.redirect('/');
    },

    addExpense: (req, res) => {
        const { item, category, amount, notes, datetime } = req.body;
        console.log(req.body)
        var expense = {
            branchID: req.session.branchID,
            branchName: req.session.branchName,
            item: item,
            category: category,
            amount: amount,
            notes: notes,
            datetime: datetime
        }

        db.insertOne(Expense.Branch, expense, function (flag) {
            if (flag) {
                console.log('Expense added');
                res.status(201).json({ msg: 'Expense added. 201 Created' });  //201 Created
            } else {
                // Will trigger if req.body format does not match schema
                console.log('Expense not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    },

    viewSales: (req, res) => {
        const branchID = req.session.branchID;  // TODO: Change to req.session.branchID when session is implemented
        // console.log(branchID)
        // console.log(req.session)
        // console.log(JSON.stringify(req.headers));
        db.findMany(Sales.Branch, { branchID: branchID }, 'branchID branchName amount customerCount datetime', function (result) {
            if (result) {
                console.log('Sales found');
                res.status(200).json(result);
            } else {
                console.log('Sales not found');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    viewExpense: (req, res) => {
        const branchID = req.session.branchID;  // TODO: Change to req.session.branchID when session is implemented
        // console.log(branchID)
        // console.log(req.session)
        // console.log(JSON.stringify(req.headers));
        db.findMany(Expense.Branch, { branchID: branchID }, 'branchID branchName item category amount notes datetime', function (result) {
            if (result) {
                console.log('Expense found');
                res.status(200).json(result);
            } else {
                console.log('Expense not found');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editSales: (req, res) => {
        const { id, branchID, amount, customerCount, datetime } = req.body;
        console.log(req.body)
        var sales = {
            branchID: branchID,
            amount: amount,
            customerCount: customerCount,
            datetime: datetime
        }

        db.updateOne(Sales.Branch, { _id: new Object(id) }, sales, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Sales not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editExpense: (req, res) => {
        const { id, branchID, amount, item, category, notes, datetime } = req.body;
        var expense = {
            branchID: branchID,
            amount: amount,
            item: item,
            category: category,
            notes: notes,
            datetime: datetime
        }

        db.updateOne(Expense.Branch, { _id: new Object(id) }, expense, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Expense not edited');
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

    submitSalesAndExpenses: (req, res) => {
        const branchID = req.session.branchID;
        function transfer(x, y) {
            db.findMany(x.Branch, { branchID: branchID }, '', (result) => {
                console.log(y);
                if (result.length >= 1) {
                    db.insertMany(x.Admin, result, (flag) => {
                        if (flag) {
                            console.log(`${y} added: ${result.length}`);
                            // If the transfer is successful, delete all documents from the branch collection
                            db.deleteMany(x.Branch, { branchID: branchID }, function (flag) {
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
    }
}


module.exports = branchController;