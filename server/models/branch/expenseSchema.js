const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    sales: { type: Number, required: true },
    customercount: { type: String, required: false },
}, { timestamps: true });

module.exports = {
    Branch: mongoose.model('Expense', ExpenseSchema),
    Admin: mongoose.model('AdminExpense', ExpenseSchema)
};