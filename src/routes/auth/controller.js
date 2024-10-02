const controller = require('./../controller');
const config = require('config');
const passport = require('passport');

module.exports = new (class extends controller {
    //post
    async register(req, res) {
        passport.authenticate("local.register", (err, user, info) => {
            if (err) return this.response({ res, code: 500, message: err.message, link: "/account/register", data: null })
            if (!user) return this.response({ res, code: 400, message: info.message, link: "/account/login", data: null })
            req.logIn(user, (err) => {
                if (err) return this.response({ code: 500, res, message: err.message, link: "/account/register", data: null })
                return this.response({ res, message: "ok", link: "/user/profile", data: null })
            });
        })(req, res)
    }

    async login(req, res) {

        passport.authenticate('local.login', (err, user, info) => {
            if (err) return this.response({ res, code: 500, message: err.message, link: "/account/register", data: null })
            if (!user) return this.response({ res, code: 400, message: info.message, link: "/account/login", data: null })
            req.logIn(user, (err) => {
                if (err) returnthis.response({ code: 500, res, message: err.message, link: "/account/register", data: null })
                return this.response({ res, message: "ok", link: "/user/profile", data: null })
            });
        })(req, res);
    }

})();