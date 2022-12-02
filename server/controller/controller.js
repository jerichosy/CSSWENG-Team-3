var path = require('path');
const db = require('../models/db.js');
const User = require('../models/UserSchema.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
const Cheque = require('../models/admin/adminChequeSchema.js')
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

    // FIXME: Rename to createBranch?
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

    viewBranch: (req, res) => {
        db.findMany(User, {}, '', function (branch) {
            if (branch) {
                console.log('Branch shown');
                res.status(201).json(branch);  //201 Created
            } else {
                console.log('Branch not shown');
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
    },

    adminViewSales: (req, res) => {
        db.findMany(Sales.Admin, {}, 'branchID branchName amount customerCount datetime', function (sales) {
            if (sales) {
                console.log('Sales shown');
                // console.log(typeof (sales));
                salescopy = JSON.parse(JSON.stringify(sales))
                for (var i = 0; i < sales.length; i++) {
                    salescopy[i].date = sales[i].datetime.toISOString().split('T')[0]
                    salescopy[i].time = sales[i].datetime.toISOString().split('T')[1].split('.')[0].slice(0, -3)
                    delete salescopy[i].datetime
                }
                res.status(200).json(salescopy);  //200 OK
            } else {
                console.log('Sales not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })  //400 Bad Request
            }
        })
    },

    adminViewExpense: (req, res) => {
        db.findMany(Expense.Admin, {}, '', function (expenses) {
            if (expenses) {
                console.log('Expenses shown');
                expensescopy = JSON.parse(JSON.stringify(expenses))
                for (var i = 0; i < expenses.length; i++) {
                    expensescopy[i].date = expenses[i].datetime.toISOString().split('T')[0]
                    delete expensescopy[i].datetime
                }

                res.status(201).json(expensescopy);  //201 Created
            } else {
                console.log('Expenses not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    adminAddSales: (req, res) => {
        // const { branchID, sales, customercount, time } = req.body;
        console.log(req.body)
        // var salesobj = {
        //     branchID: branchID,
        //     sales: sales,
        //     customercount: customercount,
        //     time: time
        // }

        db.insertOne(Sales.Admin, req.body, function (flag) {
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

    adminAddExpense: (req, res) => {
        // const { branchID, item, category, amount, notes } = req.body;
        console.log(req.body)
        // var expense = {
        //     branchID: branchID,
        //     item: item,
        //     category: category,
        //     amount: amount,
        //     notes: notes
        // }

        db.insertOne(Expense.Admin, req.body, function (flag) {
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

    adminEditSales: (req, res) => {
        const { id, branchID, branchName, amount, customerCount, datetime } = req.body;
        console.log(req.body)
        var sales = {
            branchID: branchID,
            branchName: branchName,
            amount: amount,
            customerCount: customerCount,
            datetime: datetime
        }

        db.updateOne(Sales.Admin, { _id: new Object(id) }, sales, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Sales not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    adminEditExpense: (req, res) => {
        const { id, branchID, branchName, amount, item, category, notes, datetime } = req.body;
        var expense = {
            branchID: branchID,
            branchName: branchName,
            amount: amount,
            item: item,
            category: category,
            notes: notes,
            datetime: datetime
        }

        db.updateOne(Expense.Admin, { _id: new Object(id) }, expense, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Expense not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    adminDeleteSales: (req, res) => {
        const { id } = req.body;
        db.deleteOne(Sales.Admin, { _id: new Object(id) }, function (flag) {
            if (flag) {
                console.log('Delete success: ' + flag);
                res.status(201).json({ msg: 'Delete success' })
            } else {
                console.log('Sales not deleted');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    adminDeleteExpense: (req, res) => {
        const { id } = req.body;
        db.deleteOne(Expense.Admin, { _id: new Object(id) }, function (flag) {
            if (flag) {
                console.log('Delete success: ' + flag);
                res.status(201).json({ msg: 'Delete success' })
            } else {
                console.log('Expense not deleted');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    // TODO: Finalize decision on this. 
    // One problem is that by doing client side filtering in conjunction with limit,
    // the filter only acts on the first 100 records for example. Thereby possibly neccessating a backend request still.
    // Unless ofc, that's down to whether the user selects "Show All" or not.
    adminViewSalesFilter: (req, res) => {
        var { dateRangeFrom, dateRangeTo, timeRangeFrom, timeRangeTo, branches } = req.body;
        console.log(req.body);
        var dateRangeFrom = new Date(dateRangeFrom)
        var dateRangeTo = new Date(dateRangeTo)
        dateRangeTo.setDate(dateRangeTo.getDate() + 1)

        var filter = {
            createdAt: { $gte: dateRangeFrom, $lte: dateRangeTo },
            time: { $gte: timeRangeFrom, $lte: timeRangeTo },
            branchID: branches
        }
        console.log(filter)
        //change to admin
        db.findMany(Sales.Admin, filter, '', function (result) {
            if (result) {
                console.log('Result shown');
                res.status(201).json({ result });  //201 Created
            } else {
                console.log('Result not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    // TODO: Same as above
    adminViewExpenseFilter: (req, res) => {

    },

    addCheque: (req, res) => {
        db.insertOne(Cheque, req.body, function (flag) {
            if (flag) {
                console.log('Cheque added');
                res.status(201).json({ msg: 'Cheque Added. 201 Created' });  //201 Created
            } else {
                console.log('Cheque not added');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    viewCheque: (req, res) => {
        db.findMany(Cheque, {}, '', function (cheque) {
            if (cheque) {
                console.log('Cheque shown');
                chequescopy = JSON.parse(JSON.stringify(cheque))
                for (var i = 0; i < cheque.length; i++) {
                    chequescopy[i].date = cheque[i].datetime.toISOString().split('T')[0]
                    delete chequescopy[i].datetime
                }
                res.status(200).json(chequescopy);  //200 OK
            } else {
                console.log('Sales not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })  //400 Bad Request
            }
        })
    },

    editCheque: (req, res) => {
        const { id, datetime, account, category, amount } = req.body;
        console.log(req.body)
        var cheque = {
            datetime: datetime,
            account: account,
            category: category,
            amount: amount
        }
        db.updateOne(Cheque, { _id: new Object(id) }, cheque, function (flag) {
            if (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            } else {
                console.log('Cheque not edited');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    deleteCheque: (req, res) => {
        const { id } = req.body;
        db.deleteOne(Cheque, { _id: new Object(id) }, function (flag) {
            if (flag) {
                console.log('Delete success: ' + flag);
                res.status(201).json({ msg: 'Delete success' })
            } else {
                console.log('Sales not deleted');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    generateReport: async (req, res) => {
        var { branchID, date } = req.body

        //Get expenses, sales, cheques
        {
            var salary = await Expense.Admin.find({ branchID: branchID, category: 'Salary' })
            var grocery = await Expense.Admin.find({ branchID: branchID, category: 'Grocery' })
            var utilities = await Expense.Admin.find({ branchID: branchID, category: 'Utilities' })
            var food = await Expense.Admin.find({ branchID: branchID, category: 'Food' })
            var gasul = await Expense.Admin.find({ branchID: branchID, category: 'Gasul' })
            var bakeryitems = await Expense.Admin.find({ branchID: branchID, category: 'Bakery Items' })
            var rent = await Expense.Admin.find({ branchID: branchID, category: 'Rent' })
            var misc = await Expense.Admin.find({ branchID: branchID, category: 'Misc' })
            var taxes = await Expense.Admin.find({ branchID: branchID, category: 'Taxes' })

            var csalary = await Cheque.find({ branchID: branchID, category: 'Salary' })
            var cgrocery = await Cheque.find({ branchID: branchID, category: 'Grocery' })
            var cutilities = await Cheque.find({ branchID: branchID, category: 'Utilities' })
            var cfood = await Cheque.find({ branchID: branchID, category: 'Food' })
            var cgasul = await Cheque.find({ branchID: branchID, category: 'Gasul' })
            var cbakeryitems = await Cheque.find({ branchID: branchID, category: 'Bakery Items' })
            var crent = await Cheque.find({ branchID: branchID, category: 'Rent' })
            var cmisc = await Cheque.find({ branchID: branchID, category: 'Misc' })
            var ctaxes = await Cheque.find({ branchID: branchID, category: 'Taxes' })

            var sales = await Sales.Admin.find({ branchID: branchID })
            var cheque = await Cheque.find({ branchID: branchID })
        }

        const expense = [salary, grocery, utilities, food, gasul, bakeryitems, rent, misc, taxes]

        var totals = {
            sales: 0, expense: 0, cheque: 0, totalexpense: 0, net: 0,
            salary: 0, grocery: 0, utilities: 0,
            food: 0, gasul: 0, bakeryitems: 0,
            rent: 0, misc: 0, taxes: 0
        }

        var cheques = {
            salary: 0, grocery: 0, utilities: 0,
            food: 0, gasul: 0, bakeryitems: 0,
            rent: 0, misc: 0, taxes: 0
        }

        //Populate Sales, Expense, Cheque, Net
        {
            //Populate Total Sales
            for (var i = 0; i < sales.length; i++) {
                totals.sales += sales[i].amount
            }
            console.log("total sales: " + totals.sales)

            //Populate Total Expense
            for (var i = 0; i < expense.length; i++) {
                console.log(i + "  count   " + + expense[i].length)
                for (var j = 0; j < expense[i].length; j++) {
                    totals.expense += expense[i][j].amount
                    console.log(expense[i][j].amount)
                }
            }
            console.log("total expense: " + totals.expense)

            //Populate Total Cheque
            for (var i = 0; i < cheque.length; i++) {
                totals.cheque += cheque[i].amount
            }
            console.log("total cheque: " + totals.cheque)

            totals.totalexpense = totals.expense + totals.cheque
            console.log("final expense: " + totals.totalexpense)

            totals.net = totals.sales - totals.totalexpense
            console.log("final net: " + totals.net)
        }
        //Populate Expense Categories
        {
            //Salary
            for (var i = 0; i < salary.length; i++) {
                totals.salary += salary[i].amount
            }

            //Grocery
            for (var i = 0; i < grocery.length; i++) {
                totals.grocery += grocery[i].amount
            }

            //Utilities
            for (var i = 0; i < utilities.length; i++) {
                totals.utilities += utilities[i].amount
            }

            //Food
            for (var i = 0; i < food.length; i++) {
                totals.food += food[i].amount
            }

            //Gasul
            for (var i = 0; i < gasul.length; i++) {
                totals.gasul += gasul[i].amount
            }

            //Bakery Items
            for (var i = 0; i < bakeryitems.length; i++) {
                totals.bakeryitems += bakeryitems[i].amount
            }

            //Rent
            for (var i = 0; i < rent.length; i++) {
                totals.rent += rent[i].amount
            }

            //Misc
            for (var i = 0; i < misc.length; i++) {
                totals.misc += misc[i].amount
            }

            //Taxes
            for (var i = 0; i < taxes.length; i++) {
                totals.taxes += taxes[i].amount
            }
        }

        //Populate Cheque Categories
        {
            //Salary
            for (var i = 0; i < csalary.length; i++) {
                cheques.salary += csalary[i].amount
            }

            //Grocery
            for (var i = 0; i < cgrocery.length; i++) {
                cheques.grocery += cgrocery[i].amount
            }

            //Utilities
            for (var i = 0; i < cutilities.length; i++) {
                cheques.utilities += cutilities[i].amount
            }

            //Food
            for (var i = 0; i < cfood.length; i++) {
                cheques.food += cfood[i].amount
            }

            //Gasul
            for (var i = 0; i < cgasul.length; i++) {
                cheques.gasul += cgasul[i].amount
            }

            //Bakery Items
            for (var i = 0; i < cbakeryitems.length; i++) {
                cheques.bakeryitems += cbakeryitems[i].amount
            }

            //Rent
            for (var i = 0; i < crent.length; i++) {
                cheques.rent += crent[i].amount
            }

            //Misc
            for (var i = 0; i < cmisc.length; i++) {
                cheques.misc += cmisc[i].amount
            }

            //Taxes
            for (var i = 0; i < ctaxes.length; i++) {
                cheques.taxes += ctaxes[i].amount
            }
        }

        console.log(totals)

        var reports = []
        var dateinput = new Date(date)
        var monthvar = dateinput.getMonth() + 1

        //change bruteforce
        //account for leap years
        {
            if (monthvar == 1 || monthvar == 3 || monthvar == 5 || monthvar == 7 || monthvar == 8 || monthvar == 10 || monthvar == 12) {
                callimit = 31
            }
            else if (monthvar == 4 || monthvar == 6 || monthvar == 9 || monthvar == 11) {
                callimit = 30
            }
            else if (monthvar == 2) {
                callimit = 28
            }

            if (monthvar < 10) {
                monthvar = "0" + monthvar
            }
        }


        //getting daily record
        for (var i = 1; i <= callimit; i++) {
            var dailyrecord = []
            if (i < 10) {
                var day = "0" + i
            }
            else {
                day = i
            }

            //date formatting
            {
                var newstartdate = dateinput.getFullYear() + "-" + monthvar + "-" + day + "T00:00:00.000Z"
                var newenddate = dateinput.getFullYear() + "-" + monthvar + "-" + day + "T23:59:59.000Z"
                var startDate = new Date(newstartdate)
                var endDate = new Date(newenddate)
            }

            //get daily expenses
            {
                var dailysalary = await Expense.Admin.find({ branchID: branchID, category: 'Salary', datetime: { $gte: startDate, $lt: endDate } })
                var dailygrocery = await Expense.Admin.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: startDate, $lt: endDate } })
                var dailyutilities = await Expense.Admin.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: startDate, $lt: endDate } })
                var dailyfood = await Expense.Admin.find({ branchID: branchID, category: 'Food', datetime: { $gte: startDate, $lt: endDate } })
                var dailygasul = await Expense.Admin.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: startDate, $lt: endDate } })
                var dailybakeryitems = await Expense.Admin.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: startDate, $lt: endDate } })
                var dailyrent = await Expense.Admin.find({ branchID: branchID, category: 'Rent', datetime: { $gte: startDate, $lt: endDate } })
                var dailymisc = await Expense.Admin.find({ branchID: branchID, category: 'Misc', datetime: { $gte: startDate, $lt: endDate } })
                var dailytaxes = await Expense.Admin.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: startDate, $lt: endDate } })
            }

            //get daily sales, expenses, cheques
            {
                var dailysales = await Sales.Admin.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                var dailycheque = await Cheque.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                var dailyexpense = [dailysalary, dailygrocery, dailyutilities, dailyfood, dailygasul, dailybakeryitems, dailyrent, dailymisc, dailytaxes]
            }

            var daily = {
                dsales: 0, dexpense: 0, dcheque: 0,
                dsalary: 0, dgrocery: 0, dutilities: 0,
                dfood: 0, dgasul: 0, dbakeryitems: 0,
                drent: 0, dmisc: 0, dtaxes: 0
            }

            //Populate daily sales, expenses, cheques, net
            {
                for (var j = 0; j < dailysales.length; j++) {
                    daily.dsales += dailysales[j].amount
                }

                for (var j = 0; j < dailyexpense.length; j++) {
                    for (var k = 0; k < dailyexpense[j].length; k++) {
                        daily.dexpense += dailyexpense[j][k].amount
                    }
                }

                for (var j = 0; j < dailycheque.length; j++) {
                    daily.dcheque += dailycheque[i].amount
                }
                daily.dexpense = daily.dexpense + daily.dcheque
                daily.dnet = daily.dsales - daily.dexpense
            }

            dailyrecord.push(parseInt(day))
            dailyrecord.push(daily.dsales)
            dailyrecord.push(daily.dcheque)
            dailyrecord.push(daily.dexpense)
            dailyrecord.push(daily.dnet)

            //Populate expense categories
            {
                //Salary
                for (var j = 0; j < dailysalary.length; j++) {
                    daily.dsalary += dailysalary[j].amount
                }
                dailyrecord.push(daily.dsalary)

                //Grocery
                for (var j = 0; j < dailygrocery.length; j++) {
                    daily.dgrocery += dailygrocery[j].amount
                }
                dailyrecord.push(daily.dgrocery)

                //Utilities
                for (var j = 0; j < dailyutilities.length; j++) {
                    daily.dutilities += dailyutilities[j].amount
                }
                dailyrecord.push(daily.dutilities)

                //Food
                for (var j = 0; j < dailyfood.length; j++) {
                    daily.dfood += dailyfood[j].amount
                }
                dailyrecord.push(daily.dfood)

                //Gasul
                for (var j = 0; j < dailygasul.length; j++) {
                    daily.dgasul += dailygasul[j].amount
                }
                dailyrecord.push(daily.dgasul)

                //Bakery Items
                for (var j = 0; j < dailybakeryitems.length; j++) {
                    daily.dbakeryitems += dailybakeryitems[j].amount
                }
                dailyrecord.push(daily.dbakeryitems)

                //Rent
                for (var j = 0; j < dailyrent.length; j++) {
                    daily.drent += dailyrent[j].amount
                }
                dailyrecord.push(daily.drent)

                //Misc
                for (var j = 0; j < dailymisc.length; j++) {
                    daily.dmisc += dailymisc[j].amount
                }
                dailyrecord.push(daily.dmisc)

                //Taxes
                for (var j = 0; j < dailytaxes.length; j++) {
                    daily.dtaxes += dailytaxes[j].amount
                }
                dailyrecord.push(daily.dtaxes)
            }

            reports.push(dailyrecord)

        }

        //console.log(reports)
        res.status(201).json({ msg: 'Done' });

    },

    generateQuarterlyReport: async (req, res) => {
        var { branchID, date } = req.body
        var reports = []
        var dateinput = new Date(date)
        var monthvar = dateinput.getMonth() + 1

        if (monthvar != 1 && monthvar != 4 && monthvar != 7 && monthvar != 10) {
            console.log('Invalid Quarter');
        }
        else {
            for (var qrtrmonth = monthvar, ctr = 0; ctr <= 2; qrtrmonth++, ctr++) {
                var monthlyrecord = []
                //change bruteforce
                //account for leap years
                {
                    if (qrtrmonth == 1 || qrtrmonth == 3 || qrtrmonth == 5 || qrtrmonth == 7 || qrtrmonth == 8 || qrtrmonth == 10 || qrtrmonth == 12) {
                        callimit = 31
                    }
                    else if (qrtrmonth == 4 || qrtrmonth == 6 || qrtrmonth == 9 || qrtrmonth == 11) {
                        callimit = 30
                    }
                    else if (qrtrmonth == 2) {
                        callimit = 28
                    }

                    if (qrtrmonth < 10) {
                        qrtrmonth = "0" + qrtrmonth
                    }
                }


                //getting daily record
                for (var i = 1; i <= callimit; i++) {
                    var dailyrecord = []
                    if (i < 10) {
                        var day = "0" + i
                    }
                    else {
                        day = i
                    }

                    //date formatting
                    {
                        var newstartdate = dateinput.getFullYear() + "-" + qrtrmonth + "-" + day + "T00:00:00.000Z"
                        var newenddate = dateinput.getFullYear() + "-" + qrtrmonth + "-" + day + "T23:59:59.000Z"
                        var startDate = new Date(newstartdate)
                        var endDate = new Date(newenddate)
                    }

                    //get daily expenses
                    {
                        var dailysalary = await Expense.Admin.find({ branchID: branchID, category: 'Salary', datetime: { $gte: startDate, $lt: endDate } })
                        var dailygrocery = await Expense.Admin.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyutilities = await Expense.Admin.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyfood = await Expense.Admin.find({ branchID: branchID, category: 'Food', datetime: { $gte: startDate, $lt: endDate } })
                        var dailygasul = await Expense.Admin.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: startDate, $lt: endDate } })
                        var dailybakeryitems = await Expense.Admin.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyrent = await Expense.Admin.find({ branchID: branchID, category: 'Rent', datetime: { $gte: startDate, $lt: endDate } })
                        var dailymisc = await Expense.Admin.find({ branchID: branchID, category: 'Misc', datetime: { $gte: startDate, $lt: endDate } })
                        var dailytaxes = await Expense.Admin.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: startDate, $lt: endDate } })
                    }

                    //get daily sales, expenses, cheques
                    {
                        var dailysales = await Sales.Admin.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                        var dailycheque = await Cheque.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                        var dailyexpense = [dailysalary, dailygrocery, dailyutilities, dailyfood, dailygasul, dailybakeryitems, dailyrent, dailymisc, dailytaxes]
                    }

                    var daily = {
                        dsales: 0, dexpense: 0, dcheque: 0,
                        dsalary: 0, dgrocery: 0, dutilities: 0,
                        dfood: 0, dgasul: 0, dbakeryitems: 0,
                        drent: 0, dmisc: 0, dtaxes: 0
                    }

                    //Populate daily sales, expenses, cheques, net
                    {
                        for (var j = 0; j < dailysales.length; j++) {
                            daily.dsales += dailysales[j].amount
                        }

                        for (var j = 0; j < dailyexpense.length; j++) {
                            for (var k = 0; k < dailyexpense[j].length; k++) {
                                daily.dexpense += dailyexpense[j][k].amount
                            }
                        }

                        for (var j = 0; j < dailycheque.length; j++) {
                            daily.dcheque += dailycheque[i].amount
                        }
                        daily.dexpense = daily.dexpense + daily.dcheque
                        daily.dnet = daily.dsales - daily.dexpense
                    }

                    dailyrecord.push(parseInt(day))
                    dailyrecord.push(daily.dsales)
                    dailyrecord.push(daily.dcheque)
                    dailyrecord.push(daily.dexpense)
                    dailyrecord.push(daily.dnet)

                    //Populate expense categories
                    {
                        //Salary
                        for (var j = 0; j < dailysalary.length; j++) {
                            daily.dsalary += dailysalary[j].amount
                        }
                        dailyrecord.push(daily.dsalary)

                        //Grocery
                        for (var j = 0; j < dailygrocery.length; j++) {
                            daily.dgrocery += dailygrocery[j].amount
                        }
                        dailyrecord.push(daily.dgrocery)

                        //Utilities
                        for (var j = 0; j < dailyutilities.length; j++) {
                            daily.dutilities += dailyutilities[j].amount
                        }
                        dailyrecord.push(daily.dutilities)

                        //Food
                        for (var j = 0; j < dailyfood.length; j++) {
                            daily.dfood += dailyfood[j].amount
                        }
                        dailyrecord.push(daily.dfood)

                        //Gasul
                        for (var j = 0; j < dailygasul.length; j++) {
                            daily.dgasul += dailygasul[j].amount
                        }
                        dailyrecord.push(daily.dgasul)

                        //Bakery Items
                        for (var j = 0; j < dailybakeryitems.length; j++) {
                            daily.dbakeryitems += dailybakeryitems[j].amount
                        }
                        dailyrecord.push(daily.dbakeryitems)

                        //Rent
                        for (var j = 0; j < dailyrent.length; j++) {
                            daily.drent += dailyrent[j].amount
                        }
                        dailyrecord.push(daily.drent)

                        //Misc
                        for (var j = 0; j < dailymisc.length; j++) {
                            daily.dmisc += dailymisc[j].amount
                        }
                        dailyrecord.push(daily.dmisc)

                        //Taxes
                        for (var j = 0; j < dailytaxes.length; j++) {
                            daily.dtaxes += dailytaxes[j].amount
                        }
                        dailyrecord.push(daily.dtaxes)
                    }
                    monthlyrecord.push(dailyrecord)
                }
                reports.push(monthlyrecord)
            }
        }

        //console.log(reports)
        res.status(201).json({ msg: 'Done' });
    }




}

module.exports = controller;