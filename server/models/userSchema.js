var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    branchID: { type: String, required: true },
    branchName: { type: String, required: true, default: ' ' },
    branchPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, required: true, default: false },  // for soft delete
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);