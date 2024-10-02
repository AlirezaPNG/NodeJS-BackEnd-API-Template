const mainlog = require('debug')('main');
const devlog = require('debug')('dev');
const winston = require('winston');

module.exports = function () {

  process.on('uncaughtException', ex => {
    mainlog(ex.message)
    devlog(ex.message)
    winston.error(ex.message, ex)
    process.exit(1)
  })
  process.on('unhandledRejection', ex => {
    mainlog(ex.message)
    devlog(ex.message)
    winston.error(ex.message, ex)
    process.exit(1)
  })

  winston.add(new winston.transports.File({ filename: "file.log" }))
}