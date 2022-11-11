// deprecated, delete when not needed anymore

const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/sweng-user';

const UserSchema = new mongoose.Schema({
    branchID: { type: String, required: true, default: ' ' },
    branchName: { type: String, required: true },
    branchPassword: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { timestamps: true });

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const dbUser = {
    createConnect: function () {
        const dbUser = mongoose.createConnection(databaseURL, options, function (error) {
            if (error) throw error;
            console.log('Connected to: ' + databaseURL);
        })
        const User = dbUser.model('User', UserSchema);
        exports.User = User;
        //return User
    },
}

// module.exports = dbUser;
exports.createConnect = dbUser.createConnect