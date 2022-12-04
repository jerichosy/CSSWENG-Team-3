// seed mongoDB with sample data

const mongoose = require('mongoose');
// const db = require('../config/keys').mongoURI;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/CSSWENG-Team-3';

const User = require('../models/UserSchema');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
const Cheque = require('../models/admin/adminChequeSchema.js')

const adminexpenses = require('./adminexpenses.json');
const adminsales = require('./adminsales.json');
const users = require('./users.json');
const cheques = require('./cheques.json');


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

mongoose.connect(url, options, function (error) {
    if (error) throw error;
    console.log('Connected to: ' + url + '\n');

    async function seed(model, doc) {
        await model.deleteMany({});
        await model.insertMany(doc);
        console.log("Insert done")
    }

    async function seedAll() {
        await seed(User, users);
        console.log("Users seeded\n")
        await seed(Sales.Admin, adminsales);
        console.log("Admin Sales seeded\n")
        await seed(Expense.Admin, adminexpenses);
        console.log("Admin Expenses seeded\n")
        await seed(Cheque, cheques);
        console.log("Cheques seeded\n")
    }

    seedAll().then(() => {
        console.log("DONE SEEDING")
        process.exit();
    })
});
