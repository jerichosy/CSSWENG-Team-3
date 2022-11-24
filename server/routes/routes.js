const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getIndex);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
<<<<<<< HEAD
=======
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
router.post('/adminviewsalesfilter', controller.adminViewSalesFilter);
// router.post('/adminviewexpensefilter', controller.adminViewExpenseFilter);
>>>>>>> backend-dev

module.exports = router;