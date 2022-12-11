const db = require('../models/db.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
const Cheque = require('../models/admin/adminChequeSchema.js');
const User = require('../models/userSchema.js');
const ExcelJS = require('exceljs');

const MONTHNAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];


const adminController = {
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

        var branchName = await User.find({ branchID: branchID }).limit(1)
        branchName = branchName[0].branchName.toUpperCase()
        console.log(branchName)

        var dateinput = new Date(date)
        var monthvar = dateinput.getMonth() + 1

        //setting calendar limit
        {
            if (monthvar == 1 || monthvar == 3 || monthvar == 5 || monthvar == 7 || monthvar == 8 || monthvar == 10 || monthvar == 12) {
                callimit = 31
            }
            else if (monthvar == 4 || monthvar == 6 || monthvar == 9 || monthvar == 11) {
                callimit = 30
            }
            else if (monthvar == 2) {
                if ((0 == dateinput.getFullYear() % 4) && (0 != dateinput.getFullYear() % 100) || (0 == dateinput.getFullYear() % 400)) {
                    callimit = 29
                } else {
                    callimit = 28
                }
            }

            if (monthvar < 10) {
                monthvar = "0" + monthvar
            }
        }

        var startdate = dateinput.getFullYear() + "-" + monthvar + "-01T00:00:00.000Z"
        var enddate = dateinput.getFullYear() + "-" + monthvar + "-" + callimit + "T23:59:59.000Z"
        var monthstartdate = new Date(startdate)
        var monthenddate = new Date(enddate)

        //Get expenses, sales, cheques
        {
            var salary = await Expense.Admin.find({ branchID: branchID, category: 'Salary', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var grocery = await Expense.Admin.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var utilities = await Expense.Admin.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var food = await Expense.Admin.find({ branchID: branchID, category: 'Food', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var gasul = await Expense.Admin.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var bakeryitems = await Expense.Admin.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var rent = await Expense.Admin.find({ branchID: branchID, category: 'Rent', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var misc = await Expense.Admin.find({ branchID: branchID, category: 'Misc.', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var taxes = await Expense.Admin.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: monthstartdate, $lt: monthenddate } })

            var csalary = await Cheque.find({ branchID: branchID, category: 'Salary', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cgrocery = await Cheque.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cutilities = await Cheque.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cfood = await Cheque.find({ branchID: branchID, category: 'Food', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cgasul = await Cheque.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cbakeryitems = await Cheque.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var crent = await Cheque.find({ branchID: branchID, category: 'Rent', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cmisc = await Cheque.find({ branchID: branchID, category: 'Misc.', datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var ctaxes = await Cheque.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: monthstartdate, $lt: monthenddate } })

            var sales = await Sales.Admin.find({ branchID: branchID, datetime: { $gte: monthstartdate, $lt: monthenddate } })
            var cheque = await Cheque.find({ branchID: branchID, datetime: { $gte: monthstartdate, $lt: monthenddate } })
        }

        var expense = [salary, grocery, utilities, food, gasul, bakeryitems, rent, misc, taxes]

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

        var salesLast = await Sales.Admin.find().sort({ datetime: -1 }).limit(1)
        var expenseLast = await Expense.Admin.find().sort({ datetime: -1 }).limit(1)

        if (salesLast.length == 0) {
            salesLast = 0;
        }
        else {
            salesLast = salesLast[0].datetime.toISOString().split('-')[2].split('T')[0]
        }

        if (expenseLast.length == 0) {
            expenseLast = 0;
        }
        else {
            expenseLast = expenseLast[0].datetime.toISOString().split('-')[2].split('T')[0]
        }

        maxlimit = Math.max(salesLast, expenseLast, callimit)

        //getting daily record
        for (var i = 1; i <= maxlimit; i++) {
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
                var dailymisc = await Expense.Admin.find({ branchID: branchID, category: 'Misc.', datetime: { $gte: startDate, $lt: endDate } })
                var dailytaxes = await Expense.Admin.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: startDate, $lt: endDate } })
            }

            //get daily sales, expenses, cheques
            {
                var dailysales = await Sales.Admin.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                var dailycheque = await Cheque.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                var dailyexpense = [dailysalary, dailygrocery, dailyutilities, dailyfood, dailygasul, dailybakeryitems, dailyrent, dailymisc, dailytaxes]
            }

            var daily = {
                dsales: 0, dexpense: 0, dcheque: 0, dtotalexpense: 0,
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
                    daily.dcheque += dailycheque[j].amount
                }
                daily.dtotalexpense = daily.dexpense + daily.dcheque
                daily.dnet = daily.dsales - daily.dtotalexpense
            }

            dailyrecord.push(parseInt(day))
            dailyrecord.push(daily.dsales)
            //dailyrecord.push(daily.dcheque)
            dailyrecord.push(daily.dexpense)
            //dailyrecord.push(daily.dtotalexpense)
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



        //Creating Excel Workbook
        const WB = new ExcelJS.Workbook();
        var worksheet = WB.addWorksheet(MONTHNAMES[dateinput.getMonth()]);

        //Formatting
        {
            worksheet.mergeCells('A2:Q2');
            worksheet.mergeCells('A3:Q3');

            worksheet.mergeCells('A4:A5');
            worksheet.mergeCells('B4:B5');
            worksheet.mergeCells('C4:C5');
            worksheet.mergeCells('D4:D5');
            worksheet.mergeCells('N4:Q4');

            worksheet.mergeCells('E4:M4');

            worksheet.getCell('A2').value = branchName
            worksheet.getCell('A3').value = MONTHNAMES[dateinput.getMonth()] + " Transactions"

            worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' }

            worksheet.getCell('A4').value = "Date"
            worksheet.getCell('B4').value = "Gross Sales"
            worksheet.getCell('C4').value = "Cash Expenses"
            worksheet.getCell('D4').value = "Net Sales"
            worksheet.getCell('E4').value = "Cash Payments"
            worksheet.getCell('N4').value = "Cheque Payments"

            worksheet.getCell('E5').value = "Salary"
            worksheet.getCell('F5').value = "Grocery"
            worksheet.getCell('G5').value = "Utilities"
            worksheet.getCell('H5').value = "Food"
            worksheet.getCell('I5').value = "Gasul"
            worksheet.getCell('J5').value = "Bakery Items"
            worksheet.getCell('K5').value = "Rent"
            worksheet.getCell('L5').value = "Misc."
            worksheet.getCell('M5').value = "Taxes"

            worksheet.getCell('N5').value = "Date"
            worksheet.getCell('O5').value = "Account"
            worksheet.getCell('P5').value = "Classification"
            worksheet.getCell('Q5').value = "Amount"

            worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('C4').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('D4').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('E4').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('N4').alignment = { vertical: 'middle', horizontal: 'center' }

            worksheet.getCell('E5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('F5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('G5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('H5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('I5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('J5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('K5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('L5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('M5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('N5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('O5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('P5').alignment = { vertical: 'middle', horizontal: 'center' }
            worksheet.getCell('Q5').alignment = { vertical: 'middle', horizontal: 'center' }
        }

        //Populate Daily
        for (var i = 0; i < callimit; i++) {
            rowVal = []
            if (i < maxlimit) {
                for (var j = 0; j <= reports[i].length; j++) {
                    rowVal[j] = reports[i][j]
                }
            }
            else {
                rowVal[0] = i + 1
                for (var j = 1; j < reports[maxlimit - 1].length; j++) {
                    rowVal[j] = 0
                }
            }
            worksheet.addRow(rowVal);
        }

        //Populate Summary
        for (var i = 0; i < 5; i++) {
            switch (i) {
                case 0:
                    totalval = totals.sales
                    rowVal = ["Total Sales", { formula: `SUM(B6:B${callimit + 5})` }]
                    break;
                case 1:
                    totalval = totals.expense
                    rowVal = ["Total Expense Cash", { formula: `SUM(C6:C${callimit + 5})` }, , , { formula: `SUM(E6:E${callimit + 5})` }, { formula: `SUM(F6:F${callimit + 5})` }
                        , { formula: `SUM(G6:G${callimit + 5})` }, { formula: `SUM(H6:H${callimit + 5})` }, { formula: `SUM(I6:I${callimit + 5})` }
                        , { formula: `SUM(J6:J${callimit + 5})` }, { formula: `SUM(K6:K${callimit + 5})` }, { formula: `SUM(L6:L${callimit + 5})` }
                        , { formula: `SUM(M6:M${callimit + 5})` }]
                    break;
                case 2:
                    totalval = totals.cheque
                    climit = Math.max(callimit, cheque.length)
                    rowVal = ["Total Expense Cheque", { formula: `SUM(Q6:Q${climit + 5})` }, , , { formula: `SUMIF($P$6:$P$${climit + 5},E5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},F5,$Q$6:$Q$${climit + 5})` }
                        , { formula: `SUMIF($P$6:$P$${climit + 5},G5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},H5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},I5,$Q$6:$Q$${climit + 5})` }
                        , { formula: `SUMIF($P$6:$P$${climit + 5},J5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},K5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},L5,$Q$6:$Q$${climit + 5})` }
                        , { formula: `SUMIF($P$6:$P$${climit + 5},M5,$Q$6:$Q$${climit + 5})` }]
                    break;
                case 3:
                    totalval = totals.totalexpense
                    rowVal = ["Total Expenses", { formula: `SUM(B${callimit + 7}:B${callimit + 8})` }, , , { formula: `SUM(E${callimit + 7}:E${callimit + 8})` }, { formula: `SUM(F${callimit + 7}:F${callimit + 8})` }
                        , { formula: `SUM(G${callimit + 7}:G${callimit + 8})` }, { formula: `SUM(H${callimit + 7}:H${callimit + 8})` }, { formula: `SUM(I${callimit + 7}:I${callimit + 8})` }
                        , { formula: `SUM(J${callimit + 7}:J${callimit + 8})` }, { formula: `SUM(K${callimit + 7}:K${callimit + 8})` }, { formula: `SUM(L${callimit + 7}:L${callimit + 8})` }
                        , { formula: `SUM(M${callimit + 7}:M${callimit + 8})` },]
                    break;
                case 4:
                    totalval = totals.net
                    rowVal = ["Net Sales", { formula: `B${callimit + 6}-B${callimit + 9}` }]
                    break;
            }
            worksheet.addRow(rowVal)
        }

        //Populate Cheque
        for (var i = 0; i < cheque.length; i++) {
            cellVal = "N" + (i + 6)
            date = cheque[i].datetime.toISOString().split('-')[2].split('T')[0]
            worksheet.getCell(cellVal).value = date
            cellVal = "O" + (i + 6)
            worksheet.getCell(cellVal).value = cheque[i].account
            cellVal = "P" + (i + 6)
            worksheet.getCell(cellVal).value = cheque[i].category
            cellVal = "Q" + (i + 6)
            worksheet.getCell(cellVal).value = cheque[i].amount
        }

        worksheet.mergeCells(`B${callimit + 6}:D${callimit + 6}`);
        worksheet.mergeCells(`B${callimit + 7}:D${callimit + 7}`);
        worksheet.mergeCells(`B${callimit + 8}:D${callimit + 8}`);
        worksheet.mergeCells(`B${callimit + 9}:D${callimit + 9}`);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=' + 'MonthReport.xlsx');
        WB.xlsx.write(res).then(() => {
            res.end();
        });

    },

    generateQuarterlyReport: async (req, res) => {
        var { branchID, date } = req.body

        var branchName = await User.find({ branchID: branchID }).limit(1)
        branchName = branchName[0].branchName.toUpperCase()

        var reports = []
        var totals = []
        var dateinput = new Date(date)
        var monthvar = dateinput.getMonth() + 1

        if (monthvar != 1 && monthvar != 4 && monthvar != 7 && monthvar != 10) {
            console.log('Invalid Quarter');
            res.status(400).json({ msg: 'Invalid Quarter' })
        }
        else {
            //Creating Excel Workbook
            const WB = new ExcelJS.Workbook();
            var calendar = []

            for (var qrtrmonth = monthvar, ctr = 0; ctr <= 2; qrtrmonth++, ctr++) {
                var monthlyrecord = []
                var monthlytotals = {
                    sales: 0, expense: 0, cheque: 0, totalexpense: 0, net: 0,
                    salary: 0, grocery: 0, utilities: 0,
                    food: 0, gasul: 0, bakeryitems: 0,
                    rent: 0, misc: 0, taxes: 0
                }

                //setting calendar limit
                {
                    if (qrtrmonth == 1 || qrtrmonth == 3 || qrtrmonth == 5 || qrtrmonth == 7 || qrtrmonth == 8 || qrtrmonth == 10 || qrtrmonth == 12) {
                        callimit = 31
                    }
                    else if (qrtrmonth == 4 || qrtrmonth == 6 || qrtrmonth == 9 || qrtrmonth == 11) {
                        callimit = 30
                    }
                    else if (qrtrmonth == 2) {
                        if ((0 == dateinput.getFullYear() % 4) && (0 != dateinput.getFullYear() % 100) || (0 == dateinput.getFullYear() % 400)) {
                            callimit = 29
                        } else {
                            callimit = 28
                        }
                    }
                    calendar.push(callimit)

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

                    //get daily sales, expenses, cheques
                    {
                        var dailysalary = await Expense.Admin.find({ branchID: branchID, category: 'Salary', datetime: { $gte: startDate, $lt: endDate } })
                        var dailygrocery = await Expense.Admin.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyutilities = await Expense.Admin.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyfood = await Expense.Admin.find({ branchID: branchID, category: 'Food', datetime: { $gte: startDate, $lt: endDate } })
                        var dailygasul = await Expense.Admin.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: startDate, $lt: endDate } })
                        var dailybakeryitems = await Expense.Admin.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: startDate, $lt: endDate } })
                        var dailyrent = await Expense.Admin.find({ branchID: branchID, category: 'Rent', datetime: { $gte: startDate, $lt: endDate } })
                        var dailymisc = await Expense.Admin.find({ branchID: branchID, category: 'Misc.', datetime: { $gte: startDate, $lt: endDate } })
                        var dailytaxes = await Expense.Admin.find({ branchID: branchID, category: 'Tax', datetime: { $gte: startDate, $lt: endDate } })

                        var csalary = await Cheque.find({ branchID: branchID, category: 'Salary', datetime: { $gte: startDate, $lt: endDate } })
                        var cgrocery = await Cheque.find({ branchID: branchID, category: 'Grocery', datetime: { $gte: startDate, $lt: endDate } })
                        var cutilities = await Cheque.find({ branchID: branchID, category: 'Utilities', datetime: { $gte: startDate, $lt: endDate } })
                        var cfood = await Cheque.find({ branchID: branchID, category: 'Food', datetime: { $gte: startDate, $lt: endDate } })
                        var cgasul = await Cheque.find({ branchID: branchID, category: 'Gasul', datetime: { $gte: startDate, $lt: endDate } })
                        var cbakeryitems = await Cheque.find({ branchID: branchID, category: 'Bakery Items', datetime: { $gte: startDate, $lt: endDate } })
                        var crent = await Cheque.find({ branchID: branchID, category: 'Rent', datetime: { $gte: startDate, $lt: endDate } })
                        var cmisc = await Cheque.find({ branchID: branchID, category: 'Misc.', datetime: { $gte: startDate, $lt: endDate } })
                        var ctaxes = await Cheque.find({ branchID: branchID, category: 'Taxes', datetime: { $gte: startDate, $lt: endDate } })

                        var dailysales = await Sales.Admin.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                        var dailycheque = await Cheque.find({ branchID: branchID, datetime: { $gte: startDate, $lt: endDate } })
                        var dailyexpense = [dailysalary, dailygrocery, dailyutilities, dailyfood, dailygasul, dailybakeryitems, dailyrent, dailymisc, dailytaxes]

                    }

                    var daily = {
                        dsales: 0, dexpense: 0, dcheque: 0, dtotalexpense: 0,
                        dsalary: 0, dgrocery: 0, dutilities: 0,
                        dfood: 0, dgasul: 0, dbakeryitems: 0,
                        drent: 0, dmisc: 0, dtaxes: 0
                    }

                    var cheques = {
                        salary: 0, grocery: 0, utilities: 0,
                        food: 0, gasul: 0, bakeryitems: 0,
                        rent: 0, misc: 0, taxes: 0
                    }

                    //Populate daily sales, expenses, cheques, net
                    {
                        for (var j = 0; j < dailysales.length; j++) {
                            daily.dsales += dailysales[j].amount
                            monthlytotals.sales += dailysales[j].amount
                        }

                        for (var j = 0; j < dailyexpense.length; j++) {
                            for (var k = 0; k < dailyexpense[j].length; k++) {
                                daily.dexpense += dailyexpense[j][k].amount
                                monthlytotals.expense += dailyexpense[j][k].amount
                            }
                        }

                        for (var j = 0; j < dailycheque.length; j++) {
                            daily.dcheque += dailycheque[j].amount
                            monthlytotals.cheque += dailycheque[j].amount
                        }
                        daily.dtotalexpense = daily.dexpense + daily.dcheque
                        daily.dnet = daily.dsales - daily.dtotalexpense

                        monthlytotals.totalexpense = monthlytotals.expense + monthlytotals.cheque
                        monthlytotals.net = monthlytotals.sales - monthlytotals.totalexpense
                    }

                    dailyrecord.push(parseInt(day))
                    dailyrecord.push(daily.dsales)
                    //dailyrecord.push(daily.dcheque)
                    dailyrecord.push(daily.dexpense)
                    //dailyrecord.push(daily.dtotalexpense)
                    dailyrecord.push(daily.dnet)

                    //Populate expense categories
                    {
                        //Salary
                        for (var j = 0; j < dailysalary.length; j++) {
                            daily.dsalary += dailysalary[j].amount
                            monthlytotals.salary += dailysalary[j].amount
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
                            monthlytotals.utilities += dailyutilities[j].amount
                        }
                        dailyrecord.push(daily.dutilities)

                        //Food
                        for (var j = 0; j < dailyfood.length; j++) {
                            daily.dfood += dailyfood[j].amount
                            monthlytotals.food += dailyfood[j].amount
                        }
                        dailyrecord.push(daily.dfood)

                        //Gasul
                        for (var j = 0; j < dailygasul.length; j++) {
                            daily.dgasul += dailygasul[j].amount
                            monthlytotals.gasul += dailygasul[j].amount
                        }
                        dailyrecord.push(daily.dgasul)

                        //Bakery Items
                        for (var j = 0; j < dailybakeryitems.length; j++) {
                            daily.dbakeryitems += dailybakeryitems[j].amount
                            monthlytotals.bakeryitems += dailybakeryitems[j].amount
                        }
                        dailyrecord.push(daily.dbakeryitems)

                        //Rent
                        for (var j = 0; j < dailyrent.length; j++) {
                            daily.drent += dailyrent[j].amount
                            monthlytotals.rent += dailyrent[j].amount
                        }
                        dailyrecord.push(daily.drent)

                        //Misc
                        for (var j = 0; j < dailymisc.length; j++) {
                            daily.dmisc += dailymisc[j].amount
                            monthlytotals.misc += dailymisc[j].amount
                        }
                        dailyrecord.push(daily.dmisc)

                        //Taxes
                        for (var j = 0; j < dailytaxes.length; j++) {
                            daily.dtaxes += dailytaxes[j].amount
                            monthlytotals.taxes += dailytaxes[j].amount
                        }
                        dailyrecord.push(daily.dtaxes)
                    }

                    //TODO: Check if needed
                    //Populate Cheque Categories
                    {
                        //Salary
                        for (var j = 0; j < csalary.length; j++) {
                            cheques.salary += csalary[j].amount
                        }

                        //Grocery
                        for (var j = 0; j < cgrocery.length; j++) {
                            cheques.grocery += cgrocery[j].amount
                        }

                        //Utilities
                        for (var j = 0; j < cutilities.length; j++) {
                            cheques.utilities += cutilities[j].amount
                        }

                        //Food
                        for (var j = 0; j < cfood.length; j++) {
                            cheques.food += cfood[j].amount
                        }

                        //Gasul
                        for (var j = 0; j < cgasul.length; j++) {
                            cheques.gasul += cgasul[j].amount
                        }

                        //Bakery Items
                        for (var j = 0; j < cbakeryitems.length; j++) {
                            cheques.bakeryitems += cbakeryitems[j].amount
                        }

                        //Rent
                        for (var j = 0; j < crent.length; j++) {
                            cheques.rent += crent[j].amount
                        }

                        //Misc
                        for (var j = 0; j < cmisc.length; j++) {
                            cheques.misc += cmisc[j].amount
                        }

                        //Taxes
                        for (var j = 0; j < ctaxes.length; j++) {
                            cheques.taxes += ctaxes[j].amount
                        }
                    }

                    monthlyrecord.push(dailyrecord)
                }

                reports.push(monthlyrecord)
                totals.push(monthlytotals)

                var worksheet = WB.addWorksheet(MONTHNAMES[qrtrmonth - 1]);

                //Formatting
                {
                    worksheet.mergeCells('A2:Q2');
                    worksheet.mergeCells('A3:Q3');

                    worksheet.mergeCells('A4:A5');
                    worksheet.mergeCells('B4:B5');
                    worksheet.mergeCells('C4:C5');
                    worksheet.mergeCells('D4:D5');
                    worksheet.mergeCells('N4:Q4');

                    worksheet.mergeCells('E4:M4');

                    worksheet.getCell('A2').value = branchName
                    worksheet.getCell('A3').value = MONTHNAMES[qrtrmonth - 1] + " Transactions"

                    worksheet.getCell('A2').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('A3').alignment = { vertical: 'middle', horizontal: 'center' }

                    worksheet.getCell('A4').value = "Date"
                    worksheet.getCell('B4').value = "Gross Sales"
                    worksheet.getCell('C4').value = "Cash Expenses"
                    worksheet.getCell('D4').value = "Net Sales"
                    worksheet.getCell('E4').value = "Cash Payments"
                    worksheet.getCell('N4').value = "Cheque Payments"

                    worksheet.getCell('E5').value = "Salary"
                    worksheet.getCell('F5').value = "Grocery"
                    worksheet.getCell('G5').value = "Utilities"
                    worksheet.getCell('H5').value = "Food"
                    worksheet.getCell('I5').value = "Gasul"
                    worksheet.getCell('J5').value = "Bakery Items"
                    worksheet.getCell('K5').value = "Rent"
                    worksheet.getCell('L5').value = "Misc."
                    worksheet.getCell('M5').value = "Taxes"

                    worksheet.getCell('N5').value = "Date"
                    worksheet.getCell('O5').value = "Account"
                    worksheet.getCell('P5').value = "Classification"
                    worksheet.getCell('Q5').value = "Amount"

                    worksheet.getCell('A4').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('B4').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('C4').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('D4').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('E4').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('N4').alignment = { vertical: 'middle', horizontal: 'center' }

                    worksheet.getCell('E5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('F5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('G5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('H5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('I5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('J5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('K5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('L5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('M5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('N5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('O5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('P5').alignment = { vertical: 'middle', horizontal: 'center' }
                    worksheet.getCell('Q5').alignment = { vertical: 'middle', horizontal: 'center' }
                }

                //date formatting
                {
                    var startdate = dateinput.getFullYear() + "-" + qrtrmonth + "-01T00:00:00.000Z"
                    var enddate = dateinput.getFullYear() + "-" + qrtrmonth + "-" + callimit + "T23:59:59.000Z"
                    var monthstartdate = new Date(startdate)
                    var monthenddate = new Date(enddate)
                }

                var salesLast = await Sales.Admin.find({ datetime: { $gte: monthstartdate, $lt: monthenddate } }).sort({ datetime: -1 }).limit(1)
                var expenseLast = await Expense.Admin.find({ datetime: { $gte: monthstartdate, $lt: monthenddate } }).sort({ datetime: -1 }).limit(1)

                if (salesLast.length == 0) {
                    salesLast = 0;
                }
                else {
                    salesLast = salesLast[0].datetime.toISOString().split('-')[2].split('T')[0]
                }

                if (expenseLast.length == 0) {
                    expenseLast = 0;
                }
                else {
                    expenseLast = expenseLast[0].datetime.toISOString().split('-')[2].split('T')[0]
                }

                maxlimit = Math.max(salesLast, expenseLast, callimit)

                //Populate Daily
                for (var i = 0; i < callimit; i++) {
                    rowVal = []
                    if (i < maxlimit) {
                        for (var j = 0; j <= monthlyrecord[i].length; j++) {
                            rowVal[j] = monthlyrecord[i][j]
                        }
                    }
                    else {
                        rowVal[0] = i + 1
                        for (var j = 1; j < monthlyrecord[maxlimit - 1].length; j++) {
                            rowVal[j] = 0
                        }
                    }
                    worksheet.addRow(rowVal);
                }

                var cheque = await Cheque.find({ branchID: branchID, datetime: { $gte: monthstartdate, $lt: monthenddate } })

                //Populate Summary
                for (var i = 0; i < 5; i++) {
                    switch (i) {
                        case 0:
                            totalval = totals.sales
                            rowVal = ["Total Sales", { formula: `SUM(B6:B${callimit + 5})` }]
                            break;
                        case 1:
                            totalval = totals.expense
                            rowVal = ["Total Expense Cash", { formula: `SUM(C6:C${callimit + 5})` }, , , { formula: `SUM(E6:E${callimit + 5})` }, { formula: `SUM(F6:F${callimit + 5})` }
                                , { formula: `SUM(G6:G${callimit + 5})` }, { formula: `SUM(H6:H${callimit + 5})` }, { formula: `SUM(I6:I${callimit + 5})` }
                                , { formula: `SUM(J6:J${callimit + 5})` }, { formula: `SUM(K6:K${callimit + 5})` }, { formula: `SUM(L6:L${callimit + 5})` }
                                , { formula: `SUM(M6:M${callimit + 5})` }]
                            break;
                        case 2:
                            totalval = totals.cheque

                            climit = Math.max(callimit, cheque.length)
                            rowVal = ["Total Expense Cheque", { formula: `SUM(Q6:Q${climit + 5})` }, , , { formula: `SUMIF($P$6:$P$${climit + 5},E5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},F5,$Q$6:$Q$${climit + 5})` }
                                , { formula: `SUMIF($P$6:$P$${climit + 5},G5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},H5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},I5,$Q$6:$Q$${climit + 5})` }
                                , { formula: `SUMIF($P$6:$P$${climit + 5},J5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},K5,$Q$6:$Q$${climit + 5})` }, { formula: `SUMIF($P$6:$P$${climit + 5},L5,$Q$6:$Q$${climit + 5})` }
                                , { formula: `SUMIF($P$6:$P$${climit + 5},M5,$Q$6:$Q$${climit + 5})` }]
                            break;
                        case 3:
                            totalval = totals.totalexpense
                            rowVal = ["Total Expenses", { formula: `SUM(B${callimit + 7}:B${callimit + 8})` }, , , { formula: `SUM(E${callimit + 7}:E${callimit + 8})` }, { formula: `SUM(F${callimit + 7}:F${callimit + 8})` }
                                , { formula: `SUM(G${callimit + 7}:G${callimit + 8})` }, { formula: `SUM(H${callimit + 7}:H${callimit + 8})` }, { formula: `SUM(I${callimit + 7}:I${callimit + 8})` }
                                , { formula: `SUM(J${callimit + 7}:J${callimit + 8})` }, { formula: `SUM(K${callimit + 7}:K${callimit + 8})` }, { formula: `SUM(L${callimit + 7}:L${callimit + 8})` }
                                , { formula: `SUM(M${callimit + 7}:M${callimit + 8})` },]
                            break;
                        case 4:
                            totalval = totals.net
                            rowVal = ["Net Sales", { formula: `B${callimit + 6}-B${callimit + 9}` }]
                            break;
                    }
                    worksheet.addRow(rowVal)
                }

                //Populate Cheque
                for (var i = 0; i < cheque.length; i++) {
                    cellVal = "N" + (i + 6)
                    date = cheque[i].datetime.toISOString().split('-')[2].split('T')[0]
                    worksheet.getCell(cellVal).value = date
                    cellVal = "O" + (i + 6)
                    worksheet.getCell(cellVal).value = cheque[i].account
                    cellVal = "P" + (i + 6)
                    worksheet.getCell(cellVal).value = cheque[i].category
                    cellVal = "Q" + (i + 6)
                    worksheet.getCell(cellVal).value = cheque[i].amount
                }

                worksheet.mergeCells(`B${callimit + 6}:D${callimit + 6}`);
                worksheet.mergeCells(`B${callimit + 7}:D${callimit + 7}`);
                worksheet.mergeCells(`B${callimit + 8}:D${callimit + 8}`);
                worksheet.mergeCells(`B${callimit + 9}:D${callimit + 9}`);
            }

            //FS Worksheet
            {
                var finstatement = WB.addWorksheet('FS');

                finstatement.mergeCells('B2:J2');
                finstatement.mergeCells('B3:J3');
                finstatement.mergeCells('B4:J4');

                finstatement.getCell('B2').value = branchName
                finstatement.getCell('B3').value = "Income Statement"
                finstatement.getCell('B3').value = "For the Period Ended " + MONTHNAMES[monthvar + 1] + " " + dateinput.getFullYear()
                finstatement.addRow([])

                finstatement.addRow([" ", "Sales", , , , , , { formula: `Summary!F6` }, , { formula: `H6/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", , "Cost of Goods Sold"])
                finstatement.addRow([" ", , , "Grocery/ Softdrinks", , { formula: `Summary!F10` }, , , , { formula: `F9/H6` }])
                finstatement.addRow([" ", , , "Bakery Items", , { formula: `Summary!F14` }, , , , { formula: `F10/H6` }])
                finstatement.addRow([" ", , , "Gasul", , { formula: `Summary!F13` }, , , , { formula: `F11/H6` }])
                finstatement.addRow([" ", , "Total Cost of Goods Sold", , , , , { formula: `SUM(F9:F11)` }, , { formula: `H12/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", "Gross Margin", , , , , , { formula: `H6-H12` }, , { formula: `H14/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", , "Operating Costs"])
                finstatement.addRow([" ", , , "Salary/ Vale", , { formula: `Summary!F9` }, , , , { formula: `F17/H6` }])
                finstatement.addRow([" ", , , "Rent", , { formula: `Summary!F15` }, , , , { formula: `F18/H6` }])
                finstatement.addRow([" ", , , "Food", , { formula: `Summary!F12` }, , , , { formula: `F19/H6` }])
                finstatement.addRow([" ", , , "Utilities", , { formula: `Summary!F11` }, , , , { formula: `F20/H6` }])
                finstatement.addRow([" ", , , "Miscellaneous", , { formula: `Summary!F16` }, , , , { formula: `F21/H6` }])
                finstatement.addRow([" ", , "Total Operating Costs", , , , , { formula: `SUM(F17:F21)` }, , { formula: `H22/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", "Net Margin before taxes", , , , , , { formula: `H14-H12` }, , { formula: `H24/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", , "Taxes", , , , , { formula: `Summary!F17` }, , { formula: `H26/H6` }])
                finstatement.addRow([])

                finstatement.addRow([" ", "Net Margin", , , , , , { formula: `H24-H26` }, , { formula: `H28/H6` }])
            }

            //Summary Worksheet
            {
                var summary = WB.addWorksheet('Summary');

                summary.mergeCells('B2:F2');
                summary.mergeCells('B3:F3');

                summary.getCell('B2').value = branchName
                summary.getCell('B3').value = "Monthly Summary"

                worksheet.getCell('B2').alignment = { vertical: 'middle', horizontal: 'center' }
                worksheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' }

                summary.addRow([" ", , MONTHNAMES[monthvar - 1].toUpperCase(), MONTHNAMES[monthvar].toUpperCase(), MONTHNAMES[monthvar + 1].toUpperCase(), "TOTAL"])
                summary.addRow([])

                summary.addRow([" ", "GROSS SALES", { formula: `${MONTHNAMES[monthvar - 1]}!${`B${calendar[0] + 6}`}` },
                    { formula: `${MONTHNAMES[monthvar]}!${`B${calendar[1] + 6}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`B${calendar[2] + 6}`}` }, { formula: `SUM(C6:E6)` }])

                summary.addRow([" ", "Daily Average", { formula: `C6/${calendar[0]}` }, { formula: `D6/${calendar[1]}` }, { formula: `E6/${calendar[2]}` }])
                summary.addRow([])

                summary.addRow([" ", "Salary", { formula: `${MONTHNAMES[monthvar - 1]}!${`E${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`E${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`E${calendar[2] + 9}`}` }, { formula: `SUM(C9:E9)` }])
                summary.addRow([" ", "Groceries", { formula: `${MONTHNAMES[monthvar - 1]}!${`F${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`F${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`F${calendar[2] + 9}`}` }, { formula: `SUM(C10:E10)` }])
                summary.addRow([" ", "Utilities", { formula: `${MONTHNAMES[monthvar - 1]}!${`G${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`G${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`G${calendar[2] + 9}`}` }, { formula: `SUM(C11:E11)` }])
                summary.addRow([" ", "Food", { formula: `${MONTHNAMES[monthvar - 1]}!${`H${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`H${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`H${calendar[2] + 9}`}` }, { formula: `SUM(C12:E12)` }])
                summary.addRow([" ", "Gasul", { formula: `${MONTHNAMES[monthvar - 1]}!${`I${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`I${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`I${calendar[2] + 9}`}` }, { formula: `SUM(C13:E13)` }])
                summary.addRow([" ", "Bakery Items", { formula: `${MONTHNAMES[monthvar - 1]}!${`J${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`J${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`J${calendar[2] + 9}`}` }, { formula: `SUM(C14:E14)` }])
                summary.addRow([" ", "Rent", { formula: `${MONTHNAMES[monthvar - 1]}!${`K${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`K${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`K${calendar[2] + 9}`}` }, { formula: `SUM(C15:E15)` }])
                summary.addRow([" ", "Misc", { formula: `${MONTHNAMES[monthvar - 1]}!${`L${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`L${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`L${calendar[2] + 9}`}` }, { formula: `SUM(C16:E16)` }])
                summary.addRow([" ", "Taxes", { formula: `${MONTHNAMES[monthvar - 1]}!${`M${calendar[0] + 9}`}` }, { formula: `${MONTHNAMES[monthvar]}!${`M${calendar[1] + 9}`}` }, { formula: `${MONTHNAMES[monthvar + 1]}!${`M${calendar[2] + 9}`}` }, { formula: `SUM(C17:E17)` }])
                summary.addRow([" ", "Total Expenses", { formula: `SUM(C9:C17)` }, { formula: `SUM(D9:D17)` }, { formula: `SUM(E9:E17)` }, { formula: `SUM(C18:E18)` }])
                summary.addRow([])
                summary.addRow([" ", "Net Sales", { formula: `C6-C18` }, { formula: `D6-D18` }, { formula: `E6-E18` }, { formula: `SUM(C20:E20)` }])
            }


            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=' + 'MonthReport.xlsx');
            WB.xlsx.write(res).then(() => {
                res.end();
            });
        }

    }
}


module.exports = adminController;