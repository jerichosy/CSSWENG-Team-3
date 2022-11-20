const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getIndex);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/addexpense', controller.addExpense);
router.post('/addsales', controller.addSales);
router.post('/editexpense', controller.editExpense)
router.post('/editsales', controller.editSales)

router.get('/submit', controller.submitSalesAndExpenses);
router.get('/viewexpense', controller.viewExpense);
router.get('/viewsales', controller.viewSales);

router.post('/deletebranch', controller.deleteBranch);
router.post('/editbranch', controller.editBranch);
module.exports = router;