const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    sales: { type: Number, required: true },
    customercount: { type: String, required: false },
    time: { type: String, required: true },
}, { timestamps: true });

module.exports = {
    Branch: mongoose.model('Sales', SalesSchema),
    Admin: mongoose.model('AdminSales', SalesSchema)
};