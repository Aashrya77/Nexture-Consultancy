const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadPopupImage, getPopupImage } = require('../Controllers/PopupImage');

// Storage config for single popup image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Admin uploads popup image
router.post('/upload', upload.single('image'), uploadPopupImage);
// Get current popup image
router.get('/', getPopupImage);

module.exports = router;
