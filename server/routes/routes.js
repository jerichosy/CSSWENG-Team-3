const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController.js');
const branchController = require('../controller/branchController.js');
const accountController = require('../controller/accountController.js');

// Note: RFC 9110 Section 9.3.1. GET specifies that GET requests should not make changes in the server state (e.g., generate content).
// https://www.rfc-editor.org/rfc/rfc9110.html#name-get

router.post('/login', accountController.login);
router.post('/editadminpassword', accountController.editAdminPassword);
router.post('/createbranch', accountController.createBranch);
router.get('/viewbranch', accountController.viewBranch);
router.post('/editbranch', accountController.editBranch);
router.post('/deletebranch', accountController.deleteBranch);

router.post('/addsales', branchController.addSales);
router.post('/addexpense', branchController.addExpense);
router.post('/editsales', branchController.editSales)
router.post('/editexpense', branchController.editExpense)
router.post('/deletesales', branchController.deleteSales);
router.post('/deleteexpense', branchController.deleteExpense);
router.get('/submit', branchController.submitSalesAndExpenses);  //FIXME: Change this to POST

router.post('/adminaddsales', adminController.adminAddSales);
router.post('/adminaddexpense', adminController.adminAddExpense);
router.get('/adminviewsales', adminController.adminViewSales);
router.get('/adminviewexpense', adminController.adminViewExpense);
router.post('/admineditsales', adminController.adminEditSales);
router.post('/admineditexpense', adminController.adminEditExpense);
router.post('/admindeletesales', adminController.adminDeleteSales);
router.post('/admindeleteexpense', adminController.adminDeleteExpense);
router.post('/addcheque', adminController.addCheque);
router.get('/viewcheque', adminController.viewCheque);
router.post('/editcheque', adminController.editCheque);
router.post('/deletecheque', adminController.deleteCheque);
router.post('/genreport', adminController.generateReport)  //FIXME: Can this be changed to GET?
router.post('/genqrtr', adminController.generateQuarterlyReport);  //FIXME: Can this be changed to GET?

module.exports = router;
