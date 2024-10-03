const controller = require('../controller');
const Admin = require('../../models/admin');
const config = require('config');


module.exports = new (class extends controller {
    //get data
    async Dashboard(req, res) {
        let getAdmin = await Admin.findById(req.admin._id).populate('userId')
        this.response({ res, data: getAdmin, message: "ok" })
    }




})();

