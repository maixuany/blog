const mongoose = require('mongoose')
const schema = mongoose.Schema;

const userSchema = new schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'other'] },
    avatar: { type: String },
    list_blog: { type: [schema.Types.ObjectId], default: [], ref: 'blog' },
})

module.exports = User = mongoose.model('user', userSchema);