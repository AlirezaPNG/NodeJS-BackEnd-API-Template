require('express-async-errors');
const express = require('express');
const app = express()
const mainlog = require('debug')('main');
const devlog = require('debug')('dev');
const config = require('config');
const router = require('./src/routes/index');

require('./startup/config/index')(express, app);
require('./startup/db/mongo')(config, mainlog);
require('./startup/log/index')();

app.use((req, res, next) => {
    let e = req.flash("errors").toString()
    let s = req.flash("ok").toString()
    res.locals = { errNotif: e, okNotif: s, req };
    next();
})

app.use('/', router)

app.listen(config.get('port'), r => {
    devlog("app start in dev mode")
    mainlog(`server is running on port ${config.get('port')}`)
})


