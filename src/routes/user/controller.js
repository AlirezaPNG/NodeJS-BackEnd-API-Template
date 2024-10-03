const controller = require('../controller');
const User = require('../../models/user');
const config = require('config');


module.exports = new (class extends controller {
    //dashboard
    async Dashboard(req, res) {
        let user = await User.findById(req.user._id)
        this.response({ res, data: user, message: "ok" })
    }


})();

