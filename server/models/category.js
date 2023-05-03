const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CategorySchema = new schema({
    name: { type: String, required: true, unique: true },
    posts: { type: [schema.Types.ObjectId], default: [], ref: "post" }
})

module.exports = Category = mongoose.model("category", CategorySchema);