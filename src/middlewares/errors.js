const winston = require('winston');
const mainlog = require('debug')('main');
const devlog = require('debug')('dev');
module.exports = function (err, req, res, next) {
    mainlog(err.message)
    devlog(err.message)
    res.status(500).json({ message: "(server error) something failed", errors: err.message, link: "/" })
    winston.error(err.message, err)
}