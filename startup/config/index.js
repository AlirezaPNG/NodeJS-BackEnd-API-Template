const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const config = require('config');
const passport = require('passport');
const methodOverride = require('method-override');
const cors = require('cors');
const devlog = require('debug')('dev');
module.exports = function (express, app) {
    app.set("trust proxy", 1);
    app.use(cors({
        origin: config.get("cookie.client"),
        credentials: true
    }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser(config.get('cookie.sessionSecret')));

    app.use(session({
        secret: config.get('cookie.sessionSecret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: config.get("cookie.secure"),  // if true https only else if false http only
            sameSite: config.get("cookie.sameSite"), // if in host none else if lax
            expires: new Date(Date.now() + 1000 * 3600 * 24 * 30),  // 30 days
            maxAge: 1000 * 3600 * 24 * 30  // 30 days
        },
        store: MongoStore.create({
            mongoUrl: config.get('db.address'),
            ttl: 14 * 24 * 60 * 60,  // 14 days
            autoRemove: 'native'  // Default
        })
    }));

    app.use(flash());
    require('../../src/passport/passport-local');
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(methodOverride("mt"));
    app.use(express.static('public'));
    app.use((req, res, next) => {
        req.session.save((err) => {
            if (err) {
                devlog('Error saving session: ' + err);
            } else {
                // devlog(req.session)
                devlog('Session saved successfully');
            }
        });
        next();
    });
};
