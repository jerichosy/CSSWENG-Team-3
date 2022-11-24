const mongoose = require('mongoose');

const SalesSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    branchName: { type: String, required: true, default: ' ' },  // Need for display in front-end
    amount: { type: Number, required: true },  // FIXME: This might be needed to be changed to Decimal128 for more precision
    customerCount: { type: Number, required: false },
    datetime: { type: Date, required: true },  // TODO: Verify no timezone issues
}, { timestamps: true });

module.exports = {
    Branch: mongoose.model('Sales', SalesSchema),
    Admin: mongoose.model('AdminSales', SalesSchema)
};
