var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
<<<<<<< HEAD
    branchID: { type: String, required: true, default: ' ' },
    branchName: { type: String, required: true },
    branchPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
=======
    branchID: { type: String, required: true },
    branchName: { type: String, required: true, default: ' ' },
    branchPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
>>>>>>> backend-dev
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);