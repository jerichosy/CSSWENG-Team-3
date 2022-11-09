const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/sweng-admin';
const AdminExpenseSchema = require('./adminExpenseSchema');
const AdminSalesSchema = require('./adminSalesSchema');
const AdminCategorySchema = require('./AdminCategorySchema');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const dbAdmin = {
    createConnect: function () {
        const dbAdmin = mongoose.createConnection(databaseURL, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + databaseURL);
        })
        const AdminExpense = dbAdmin.model('adminexpense', AdminExpenseSchema)
        const AdminSales = dbAdmin.model('adminsales', AdminSalesSchema)
        const AdminCategory = dbAdmin.model('admincategory', AdminCategorySchema)
        exports.AdminExpense = AdminExpense;
        exports.AdminSales = AdminSales;
        exports.AdminCategory = AdminCategory;
        //return {AdminExpense, AdminSales, AdminCategory}
    },
}


// module.exports = dbAdmin;
exports.createConnect = dbAdmin.createConnect