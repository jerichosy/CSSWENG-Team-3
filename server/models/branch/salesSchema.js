const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    item: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    notes: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('Sales', SalesSchema);