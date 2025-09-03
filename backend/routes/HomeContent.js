const express = require('express');
const { createContent, getContent, updateContent } = require('../Controllers/Homecontent');
const { uploadMiddleware } = require('../middleware/uploads.js');
const router = express.Router();

// Route to get home content
router.get('/', getContent);

// Route to create home content
router.post('/create', uploadMiddleware, createContent);
// Route to update home content
router.put('/update/:id', uploadMiddleware, updateContent);


module.exports = router;