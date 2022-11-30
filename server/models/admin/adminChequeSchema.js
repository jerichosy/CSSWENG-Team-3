const mongoose = require('mongoose');

const AdminChequeSchema = new mongoose.Schema({
    datetime: { type: Date, required: true },
    account: { type: String, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    branchID: { type: String, required: true },
    branchName: { type: String, required: true, default: ' ' }
}, { timestamps: true });

module.exports = mongoose.model('AdminCheque', AdminChequeSchema);