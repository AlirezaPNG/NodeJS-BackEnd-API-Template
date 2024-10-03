const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    profile: { type: String, default: "/img/profile/user.png" },
    status: {
        verify_email: { type: Boolean, default: false },
        active: { type: Boolean, default: true },
    },
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
})


userSchema.plugin(timestamp)

const User = mongoose.model('User', userSchema)
module.exports = User
