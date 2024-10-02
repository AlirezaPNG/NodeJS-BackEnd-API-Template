const auto_bind = require('auto-bind');
const { validationResult } = require('express-validator');
const User = require('../models/user');

module.exports = class {
    constructor() {
        auto_bind(this)
        this.User = User
    }
    validBody(req, res) {
        const r = validationResult(req)

        if (!r.isEmpty()) {
            const error = r.array()
            const message = []
            error.forEach(err => message.push(err.msg))
            req.flash('errors', message)
            this.response({ res, message : message[0], code: 403, data: null })
            return false
        } else {
            return true
        }
    }


    validdate(req, res, next) {

        if (!this.validBody(req, res)) {
            return
        }
        next()
    }


    response({ res, message, code = 200, data = {}, link = '/' }) {
        res.status(code).json({
            message,
            data,
            link,
        })
    }

}