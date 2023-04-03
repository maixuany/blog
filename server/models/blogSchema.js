const mongoose = require('mongoose')
const schema = mongoose.Schema;

const blogSchema = new schema({
    title: { type: String },
    description: { type: String },
    added_by: { type: schema.Types.ObjectId, ref: 'users' },
    added_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    slug_url: { type: String },
    summary: { type: String },
    image: { type: String },
})

module.exports = Blog = mongoose.model('blog', blogSchema);