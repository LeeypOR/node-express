var express = require('express');
var router = express.Router();
var user = require('../controllers/UserController');

/* GET users listing. */
router.post('/sendCode', user.sendCode);
router.post('/codePhoneLogin', user.codePhoneLogin);
router.post('/pwdLogin', user.pwdLogin);

module.exports = router;
