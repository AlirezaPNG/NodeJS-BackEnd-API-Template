const express = require('express');
const router = express.Router()
const { logged_in, IsAdmin } = require('../middlewares/auth');
const authRouter = require('./auth'); // = ./auht/index
// const userRouter = require('./user'); // = ./user/index
const adminRouter = require('./admin'); // = ./admin/index

const errors = require('../middlewares/errors');



// router.use('/user', logged_in, userRouter)
router.use('/admin', logged_in, IsAdmin, adminRouter)

// router.all("*", (req, res) => {
//     req.flash('errors', "صفحه مورد نظرتان پیدا نشد شما به صفحه اصلی منتقل شدید")
//     // res.redirect("/")
// })


router.use(errors)

module.exports = router


