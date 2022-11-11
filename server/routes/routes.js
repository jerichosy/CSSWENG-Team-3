const express = require('express');
const router = express.Router();
const controller = require('../controller/controller.js');

router.get('/', controller.getIndex);

router.post('/login', controller.login);
router.post('/signup', controller.signup);

// For debugging HTTP Requests, delete in prod
router.get('/displayusers', controller.displayusers);

module.exports = router;