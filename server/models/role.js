const mongoose = require('mongoose');
const schema = mongoose.Schema;

const RoleSchema = new schema({
    role_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
})

module.exports = Role = mongoose.model("role", RoleSchema);