const db = require('../models/db.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');


const branchController = {
    addSales: (req, res) => {
        // const { branchID, sales, customercount, time } = req.body;
        console.log(req.body)
        // var salesobj = {
        //     branchID: branchID,
        //     sales: sales,
        //     customercount: customercount,
        //     time: time
        // }

        db.insertOne(Sales.Branch, req.body, function (flag) {
            if (flag) {
                console.log('Sales added');
                res.status(201).json({ msg: 'Sales Added. 201 Created' });  //201 Created
            } else {
                // Will trigger if req.body format does not match schema
                console.log('Sales not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
        // res.redirect('/');
    },

    addExpense: (req, res) => {
        // const { branchID, item, category, amount, notes } = req.body;
        console.log(req.body)
        // var expense = {
        //     branchID: branchID,
        //     item: item,
        //     category: category,
        //     amount: amount,
        //     notes: notes
        // }

        db.insertOne(Expense.Branch, req.body, function (flag) {
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

    editSales: (req, res) => {
        const { id, branchID, sales, customercount, time } = req.body;
        console.log(req.body)
        var salesobj = {
            branchID: branchID,
            sales: sales,
            customercount: customercount,
            time: time
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

    // TODO:: Verify response status codes 
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
    }
}


module.exports = branchController;