
const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const config = require('config');

const AdminSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    active: { type: Boolean, default: true },
    media: {
        instagram: { type: String, required: true },
        discord: { type: String, required: true },
    },
    role: {
        verify: { type: Boolean, default: false },
        admin: { type: String, default: "no role" },
        work: { type: String, default: "no role" },
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
})

AdminSchema.plugin(timestamp)

const Admin = mongoose.model('Admin', AdminSchema)
module.exports = Admin