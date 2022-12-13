const db = require('../models/db.js');
const User = require('../models/userSchema.js');
const Sales = require('../models/branch/salesSchema.js');
const Expense = require('../models/branch/expenseSchema.js');
const Cheque = require('../models/admin/adminChequeSchema.js')

const bcrypt = require('bcrypt');


// Note: user CRUDs should not be able to modify admin doc. Only admin can modify admin doc.
// FIXME: Remove console.log() on passwords

const authController = {
    login: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)
        db.findOne(User, { branchID: name }, 'branchID branchName branchPassword isAdmin isDeleted', (user) => {
            if (user) {
                console.log(user);

                // check that we're not logging into deleted account
                // For security, this check should actually be done after the password check succeeds.
                // However, to make troubleshooting easier, we're doing it here for now.
                if (user.isDeleted) {
                    res.status(401).json({ msg: 'The account is deleted.' });
                    return;
                }

                bcrypt.compare(password, user.branchPassword, (err, result) => {
                    console.log(result);
                    if (result) {
                        console.log('Congrats')

                        req.session.regenerate(function (err) {
                            if (err) next(err);

                            req.session.branchID = user.branchID;

                            req.session.save(function (err) {
                                if (err) next(err);
                                res.status(200).json({ msg: 'Logged in successfully!', isAdmin: user.isAdmin });
                            });
                        });
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
                            res.status(400).json({ reason: 'newPassword', msg: 'The new password must be different from the old password.' });
                        } else {
                            bcrypt.hash(newPassword, 10, (err, hash) => {
                                db.updateOne(User, { isAdmin: true }, { branchPassword: hash }, (result) => {
                                    if (result) {
                                        res.status(200).json({ msg: 'Password successfully changed!' });
                                    } else {
                                        res.status(400).json({ reason: 'generic', msg: 'An error occured.' });
                                    }
                                })
                            })
                        }
                    } else {
                        res.status(401).json({ reason: 'oldPassword', msg: 'The password is incorrect.' });
                    }
                });
            }
            else {
                res.status(404).json({ reason: 'generic', msg: 'The specified username was not found.' });
            }
        })
    },

    createBranch: (req, res) => {
        const { name, password } = req.body;
        console.log(req.body)

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
    },

    viewBranch: (req, res) => {
        query = { isAdmin: false, isDeleted: false };
        if (req.query.showDeleted === 'true') {
            console.log('showing deleted branches');
            delete query.isDeleted;
        }

        db.findMany(User, query, 'branchID branchName', function (branch) {
            if (branch) {
                console.log('Branch shown');
                res.status(201).json(branch);  //201 Created
            } else {
                console.log('Branch not shown');
                res.status(400).json({ msg: 'Something went wrong. Please try again.' })
            }
        })
    },

    editBranchName: (req, res) => {
        var { _id, newBranchName } = req.body;
        console.log(newBranchName)

        db.findOne(User, { _id: _id, isDeleted: false }, 'branchID', (result) => {
            if (result) {
                var branchID = result.branchID;
                db.updateOne(User, { _id: _id }, { branchName: newBranchName }, (result) => {
                    if (result) {
                        res.status(200).json({ msg: 'Branch name successfully changed!' });

                        // update the branch name in the collections
                        db.updateMany(Sales.Admin, { branchID: branchID }, { branchName: newBranchName }, (result) => {
                            if (result) { console.log('Branch name successfully changed in the collection!'); }
                        })
                        db.updateMany(Expense.Admin, { branchID: branchID }, { branchName: newBranchName }, (result) => {
                            if (result) { console.log('Branch name successfully changed in the collection!'); }
                        })
                        db.updateMany(Sales.Branch, { branchID: branchID }, { branchName: newBranchName }, (result) => {
                            if (result) { console.log('Branch name successfully changed in the collection!'); }
                        })
                        db.updateMany(Expense.Branch, { branchID: branchID }, { branchName: newBranchName }, (result) => {
                            if (result) { console.log('Branch name successfully changed in the collection!'); }
                        })
                        db.updateMany(Cheque, { branchID: branchID }, { branchName: newBranchName }, (result) => {
                            if (result) { console.log('Branch name successfully changed in the collection!'); }
                        })

                    } else {
                        res.status(400).json({ msg: 'An error occured.' });
                    }
                })
            } else {
                res.status(404).json({ msg: 'The specified username was not found.' });
            }
        })
    },

    editBranchPassword: (req, res) => {
        var { _id, newBranchPassword, adminPassword } = req.body;
        console.log(newBranchPassword)

        // check if the admin password is correct
        db.findOne(User, { isAdmin: true }, 'branchPassword', (user) => {
            if (user) {
                bcrypt.compare(adminPassword, user.branchPassword, (err, result) => {
                    if (result) {
                        // passed the admin password check

                        // check that the new password is not the same as the old password
                        db.findOne(User, { _id: _id, isDeleted: false }, 'branchPassword', (user) => {
                            //TODO: Adopt the ff. better error handling strategy for all the other functions and routes

                            // check that the branch exists
                            if (!user) {
                                res.status(404).json({ reason: '_id', msg: 'The specified username was not found.' });
                                return;
                            }

                            bcrypt.compare(newBranchPassword, user.branchPassword, (err, result) => {
                                if (result) {
                                    res.status(400).json({ reason: 'newBranchPassword', msg: 'The new password must be different from the old password.' });
                                } else {
                                    bcrypt.hash(newBranchPassword, 10, (err, hash) => {
                                        db.updateOne(User, { _id: _id }, { branchPassword: hash }, (result) => {
                                            if (result) {
                                                res.status(200).json({ msg: 'Password successfully changed!' });
                                            } else {
                                                res.status(400).json({ reason: 'generic', msg: 'An error occured.' });
                                            }
                                        })
                                    })
                                }
                            })
                        })
                    } else {
                        res.status(401).json({ reason: 'adminPassword', msg: 'The admin password is incorrect.' });
                    }
                });
            }
            else {
                // THIS SHOULD NEVER HAPPEN
                res.status(404).json({ msg: 'The admin doc was not found.' });
            }
        })
    },

    deleteBranch: (req, res) => {
        const { _id, adminPassword } = req.body;
        console.log(req.body)

        // confirm admin password
        db.findOne(User, { isAdmin: true }, 'branchPassword', (user) => {
            if (user) {
                bcrypt.compare(adminPassword, user.branchPassword, (err, result) => {
                    if (result) {
                        // passed the admin password check

                        // check that the branch exists
                        db.findOne(User, { _id: _id }, '', (user) => {
                            if (!user) {
                                res.status(404).json({ reason: '_id', msg: 'The specified ObjectId was not found.' });
                                return;
                            }
                            // check that the branch has already been deleted
                            if (user.isDeleted) {
                                res.status(400).json({ reason: '_id', msg: 'The specified branch has already been deleted.' });
                                return;
                            }

                            // do soft delete
                            db.updateOne(User, { _id: _id }, { isDeleted: true }, (result) => {
                                if (result) {
                                    res.status(200).json({ msg: 'Branch successfully deleted!' });
                                } else {
                                    res.status(400).json({ reason: 'generic', msg: 'An error occured.' });
                                }
                            })
                        })
                    } else {
                        res.status(401).json({ reason: 'adminPassword', msg: 'The admin password is incorrect.' });
                    }
                });
            }
            else {
                // THIS SHOULD NEVER HAPPEN
                res.status(404).json({ msg: 'The admin doc was not found.' });
            }
        })
    }
}


module.exports = authController;