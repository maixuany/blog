const mongoose = require('mongoose');
const schema = mongoose.Schema;

const UserSchema = new schema({
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    access_tokens: { type: [String], default: [] },
    posts: { type: [schema.Types.ObjectId], default: [], ref: "post" },
    roles: { type: [schema.Types.ObjectId], ref: "role" }
})

module.exports = User = mongoose.model("user", UserSchema);