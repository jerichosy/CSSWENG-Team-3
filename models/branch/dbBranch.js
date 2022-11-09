const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/sweng-branch';
const ExpenseSchema = require('./expenseSchema');
const SalesSchema = require('./salesSchema');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const dbBranch = {
    createConnect: function () {
        const dbBranch = mongoose.createConnection(databaseURL, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + databaseURL);
        })
        const Expense = dbBranch.model('expense', ExpenseSchema)
        const Sales = dbBranch.model('sales', SalesSchema)
        exports.Expense = Expense;
        exports.Sales = Sales;
        // return {Expense, Sales}
    },
}

// module.exports = dbBranch;
exports.createConnect = dbBranch.createConnect