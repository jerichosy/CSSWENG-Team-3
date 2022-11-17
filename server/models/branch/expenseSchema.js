const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    item: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    notes: { type: String, required: false },
}, { timestamps: true });

module.exports = {
    Branch: mongoose.model('Expense', ExpenseSchema),
    Admin: mongoose.model('AdminExpense', ExpenseSchema)
};