const express = require('express');
const router = express.Router()
const controller = require('./controller');
const validator = require('./validator');


router.post('/register', validator.regiserValid(), controller.validdate, controller.register)
router.post('/login', validator.loginValid(), controller.validdate, controller.login)




module.exports = router