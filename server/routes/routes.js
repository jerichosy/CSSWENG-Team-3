const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController.js');
const branchController = require('../controller/branchController.js');
const accountController = require('../controller/accountController.js');

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
router.get('/submit', branchController.submitSalesAndExpenses);

router.post('/adminaddsales', adminController.adminAddSales);
router.post('/adminaddexpense', adminController.adminAddExpense);
router.get('/adminviewsales', adminController.adminViewSales);
router.get('/adminviewexpense', adminController.adminViewExpense);
router.post('/adminviewsalesfilter', adminController.adminViewSalesFilter);
// router.post('/adminviewexpensefilter', controller.adminViewExpenseFilter);
router.post('/admineditsales', adminController.adminEditSales);
router.post('/admineditexpense', adminController.adminEditExpense);
router.post('/admindeletesales', adminController.adminDeleteSales);
router.post('/admindeleteexpense', adminController.adminDeleteExpense);
router.post('/addcheque', adminController.addCheque);
router.get('/viewcheque', adminController.viewCheque);
router.post('/editcheque', adminController.editCheque);
router.post('/deletecheque', adminController.deleteCheque);
router.post('/genreport', adminController.generateReport)
router.post('/genqrtr', adminController.generateQuarterlyReport);

module.exports = router;