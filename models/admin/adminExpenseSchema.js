const mongoose = require('mongoose');

const AdminExpenseSchema = new mongoose.Schema({
    branchID:       {type: String, required: true},
    sales:          {type: Number, required: true},
    customercount:  {type: String, required: false},
}, {timestamps: true});

module.exports = AdminExpenseSchema;