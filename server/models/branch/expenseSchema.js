const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    branchName: { type: String, required: true, default: ' ' },  // Need for display in front-end
    item: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },  // FIXME: This might be needed to be changed to Decimal128 for more precision
    notes: { type: String, required: false },
    datetime: { type: Date, required: true }
}, { timestamps: true });

module.exports = {
    Branch: mongoose.model('Expense', ExpenseSchema),
    Admin: mongoose.model('AdminExpense', ExpenseSchema)
};
