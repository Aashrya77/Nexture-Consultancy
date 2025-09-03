const express = require('express');
const router = express.Router();

const { getAllBlogs, createBlog, deleteBlog, updateBlog } = require('../Controllers/Blog');
const {uploadMiddleware} = require('../middleware/uploads');

// Routes
router.get('/', getAllBlogs);
router.post('/create-blog', uploadMiddleware, createBlog);
router.delete('/:id', deleteBlog);
router.put('/:id', uploadMiddleware, updateBlog);
module.exports = router;