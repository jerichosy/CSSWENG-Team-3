// seed mongoDB with sample data

const db = require('../models/db.js');
// const db = require('../config/keys').mongoURI;

const User = require('../models/UserSchema');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
// const Cheque = require('../models/admin/adminChequeSchema.js')

const adminexpenses = require('./adminexpenses.json');
const adminsales = require('./adminsales.json');
const users = require('./users.json');
// const cheques = require('./cheques.json');

db.connect();


function seed(model, doc) {
    model.deleteMany({})
        .then(() => {
            return model.insertMany(doc);
        })
        .then(() => {
            process.exit();
        });
}

seed(User, users);
seed(Sales.Admin, adminsales);
seed(Expense.Admin, adminexpenses);