const config = require("config");
const Admin = require("../models/admin");
const { default: mongoose } = require("mongoose");


function isAdminAccess(role, CantSelf) {
    return async function (req, res, next) {
        if (!req.admin) {
            return res.status(403).json({ message: "دسترسی ناکافی", data: null })
        }
        let admin = await Admin.findById(req.admin._id)
        if (admin.role.admin == config.get("role.admin")[2] || admin.role.more == "key") {
            return next()
        }
        if (CantSelf) {
            let id = req.params.id || req.body.id;
            if (new mongoose.Types.ObjectId(id).equals(req.admin._id)) {
                return res.status(403).json({ message: "این عملیات بر روی خودتان غیر قابل مشاهده وتغییر است", data: null });
            }
        }
        if (!role.includes(admin.role.admin)) {
            return res.status(403).json({ message: "شما دسترسی به این بخش را ندارید", data: null })
        }
        next()
    }
}

module.exports = isAdminAccess;


