const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    content: { type: String, required: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String, enum: ['published', 'draft', 'scheduled'], default: 'published' },
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
module.exports = Blog;