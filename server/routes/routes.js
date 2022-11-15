const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getIndex);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
router.post('/addexpense', controller.addExpense);
router.post('/addsales', controller.addSales);

module.exports = router;