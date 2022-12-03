const db = require('../models/db.js');
const User = require('../models/userSchema.js');

const bcrypt = require('bcrypt');


const authController = {
    login: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)
        db.findOne(User, { branchID: name }, 'branchName branchPassword', (user) => {
            if (user) {
                console.log(user);
                bcrypt.compare(password, user.branchPassword, (err, result) => {
                    console.log(result);
                    if (result) {
                        console.log('Congrats')
                        res.status(200).json({ msg: 'Logged in successfully!' });
                    }
                    else {
                        console.log('Error 2 Wrong password')
                        res.status(401).json({ msg: 'The password is incorrect.' });
                    }
                });
            } else {
                console.log('Error 3')
                res.status(404).json({ msg: 'The specified username was not found.' });
            }
        })
    },

    editAdminPassword: (req, res) => {
        const { oldPassword, newPassword } = req.body;
        console.log(req.body)
        db.findOne(User, { isAdmin: true }, 'branchPassword', (user) => {
            if (user) {
                bcrypt.compare(oldPassword, user.branchPassword, (err, result) => {
                    if (result) {
                        // check that the new password is not the same as the old password
                        if (oldPassword === newPassword) {
                            res.status(400).json({ msg: 'The new password must be different from the old password.' });
                        } else {
                            bcrypt.hash(newPassword, 10, (err, hash) => {
                                db.updateOne(User, { isAdmin: true }, { branchPassword: hash }, (result) => {
                                    if (result) {
                                        res.status(200).json({ msg: 'Password successfully changed!' });
                                    } else {
                                        res.status(400).json({ msg: 'An error occured.' });
                                    }
                                })
                            })
                        }
                    } else {
                        res.status(401).json({ msg: 'The password is incorrect.' });
                    }
                });
            }
            else {
                res.status(404).json({ msg: 'The specified username was not found.' });
            }
        })
    },

    createBranch: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)

        db.findOne(User, { branchID: name }, '', (result) => {
            if (result) {
                console.log("User already exists");
                res.status(409).json({ msg: 'The specified username already exists.' });  //409 conflict
            }
            else {
                // FIXME: Finalize issues with branchID numbering
                // find the last branchID and increment it by 1
                // this assumes that the branchIDs are in ascending order 
                // db.findMany(User, {}, 'branchID', { sort: { branchID: -1 }, limit: 1 }, (result) => {
                db.findMany(User, {}, 'branchID', (result) => {
                    console.log(result);
                    var branchID = 1;
                    if (result.length >= 1) {
                        branchID = parseInt(result[result.length - 1].branchID) + 1;
                    }

                    const saltRounds = 10;
                    bcrypt.hash(password, saltRounds, function (err, hashed) {
                        var user = {
                            branchID: branchID,
                            branchName: name,
                            branchPassword: hashed,
                        }

                        db.insertOne(User, user, function (flag) {
                            if (flag) {
                                console.log('Sign up successful');
                                res.status(201).json({ msg: 'Sign Up Successful' });
                            } else {
                                console.log('Sign up failed');
                                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
                            }
                        })
                    })
                })
            }
        })
    },

    viewBranch: (req, res) => {
        db.findMany(User, { isAdmin: false }, '', function (branch) {
            if (branch) {
                console.log('Branch shown');
                res.status(201).json(branch);  //201 Created
            } else {
                console.log('Branch not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editBranch: (req, res) => {
        var { branchID, branchName, branchPassword } = req.body;
        console.log(branchPassword)
        const saltRounds = 10;
        bcrypt.hash(branchPassword, saltRounds, function (err, hashed) {
            branchPassword = hashed
            console.log(branchPassword)
            db.updateOne(User, { branchID: branchID }, {
                branchName: branchName,
                branchPassword: branchPassword
            }, function (flag) {
                console.log('Edit success: ' + flag);
                res.status(201).json({ msg: 'Edit success' })
            })
        })
    },

    deleteBranch: (req, res) => {
        const { name } = req.body;
        console.log(req.body)
        db.deleteOne(User, { branchID: name }, function (flag) {
            if (flag) {
                console.log(` deleted`);
                res.status(201).json({ msg: 'branch deleted' }) //201 Created
            } else {
                console.log(` not deleted`);
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    }
}


module.exports = authController;