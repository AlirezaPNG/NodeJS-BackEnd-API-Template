const express = require('express');
const router = express.Router()
const controller = require('./controller');
const validator = require('./validator');
const isAdminAccess = require('../../middlewares/admin');
const config = require('config');

router.get('/dashboard', controller.Dashboard);




module.exports = router