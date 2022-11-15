// TODO:
// This might not be needed since we can just do "multiple module.exports" in the ExpenseSchema.js file. 
// After all, they are exactly same schema, just diff. collection.

const mongoose = require('mongoose');

const AdminSalesSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    item: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    notes: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('AdminSales', AdminSalesSchema);