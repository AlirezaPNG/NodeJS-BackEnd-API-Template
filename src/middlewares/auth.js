const Admin = require('../models/admin');
const config = require('config');
async function logged_in(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(403).json({ status: false, message: "access access denied please login and try again", link: '/' })
    }

    if (!req.user.status.active) {
        return res.status(403).json({ status: false, message: "Your account is suspended", link: '/' })
    }

    next()
}



async function IsAdmin(req, res, next) {
    let roles = config.get("role.admin")
    try {
        let admin = await Admin.findById(req.user.adminId);

        if (!admin) {
            return res.status(403).json({ status: false, message: "Your not admin", link: '/' });
        }
        if (!admin.role.verify) {
            return res.status(403).json({ status: false, message: "You are not verified", link: '/' });
        }

        if (!roles.includes(admin.role.admin)) {
            return res.status(403).json({ status: false, message: "You don't have enough access", link: '/' });
        }
        
        if (!admin.active) {
            return res.status(403).json({ status: false, message: "Your account is suspended", link: '/' });
        }

        req.admin = admin
        next();
    } catch (error) {
        console.error("Error fetching admin data:", error);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
}





module.exports = {
    logged_in,
    IsAdmin,
}
