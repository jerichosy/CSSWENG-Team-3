const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getIndex);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.get('/viewbranch', controller.viewBranch);
router.post('/editbranch', controller.editBranch);
router.post('/deletebranch', controller.deleteBranch);
router.post('/addsales', controller.addSales);
router.post('/addexpense', controller.addExpense);
router.post('/editsales', controller.editSales)
router.post('/editexpense', controller.editExpense)
router.post('/deletesales', controller.deleteSales);
router.post('/deleteexpense', controller.deleteExpense);
router.get('/submit', controller.submitSalesAndExpenses);

router.get('/adminviewsales', controller.adminViewSales);
router.get('/adminviewexpense', controller.adminViewExpense);
router.get('/adminviewcheque', controller.viewCheque);

router.post('/adminaddsales', controller.adminAddSales);
router.post('/adminaddexpense', controller.adminAddExpense);
router.post('/adminaddcheque', controller.addCheque);

router.post('/admineditsales', controller.adminEditSales);
router.post('/admineditexpense', controller.adminEditExpense);
router.post('/admineditcheque', controller.editCheque);

router.post('/admindeletesales', controller.adminDeleteSales);
router.post('/admindeleteexpense', controller.adminDeleteExpense);
router.post('/admindeletecheque', controller.deleteCheque);

router.post('/adminviewsalesfilter', controller.adminViewSalesFilter);
router.post('/addcheque', controller.addCheque);
router.post('/editcheque', controller.editCheque);
router.post('/deletecheque', controller.deleteCheque);
// router.post('/adminviewexpensefilter', controller.adminViewExpenseFilter);
router.post('/genreport', controller.generateReport)
router.post('/genqrtr', controller.generateQuarterlyReport);
module.exports = router;