const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PostSchema = new schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    author: { type: schema.Types.ObjectId, ref: "user", required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    image_url: { type: String },
    content: { type: String },
    category: { type: schema.Types.ObjectId, required: true, ref: "category" },
})

module.exports = Post = mongoose.model("post", PostSchema);