// seed mongoDB with sample data

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const db = require('../config/keys').mongoURI;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/CSSWENG-Team-3';

const User = require('../models/userSchema.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
const Cheque = require('../models/admin/adminChequeSchema.js')

// Source data
// Converf from Excel to JSON using https://www.convertcsv.com/csv-to-json.htm
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

    async function seed(model, doc, isUsers) {
        await model.deleteMany({});
        if (isUsers) {
            // Perform hashing on passwords
            for (let i = 0; i < doc.length; i++) {
                doc[i].branchPassword = await bcrypt.hash(doc[i].branchPassword, 10);
            }
        }
        await model.insertMany(doc);
        console.log("Insert done")
    }

    async function seedAll() {
        await seed(User, users, true);
        console.log("Users seeded\n")
        await seed(Sales.Admin, adminsales, false);
        console.log("Admin Sales seeded\n")
        await seed(Expense.Admin, adminexpenses, false);
        console.log("Admin Expenses seeded\n")
        await seed(Cheque, cheques, false);
        console.log("Cheques seeded\n")
    }

    seedAll().then(() => {
        console.log("DONE SEEDING")
        process.exit();
    })
});
