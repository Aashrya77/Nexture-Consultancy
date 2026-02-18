const PopupImage = require('../models/PopupImage');
const path = require('path');
const fs = require('fs');

// Upload popup image
exports.uploadPopupImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image uploaded' });
    }
    // Remove previous popup image if exists
    const existing = await PopupImage.findOne();
    if (existing) {
      // Optionally delete old file from disk
      if (fs.existsSync(existing.imageUrl)) {
        fs.unlinkSync(existing.imageUrl);
      }
      await PopupImage.deleteMany();
    }
    let imageUrl = `uploads/${req.file.filename}`;
    imageUrl = imageUrl.replace(/\\/g, '/');
    const popupImage = new PopupImage({ imageUrl });
    await popupImage.save();
    res.status(201).json({ success: true, data: popupImage });
  } catch (error) {
    console.error('Error uploading popup image:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get popup image
exports.getPopupImage = async (req, res) => {
  try {
    const image = await PopupImage.findOne();
    if (!image) {
      return res.status(404).json({ success: false, message: 'No popup image found' });
    }
    res.status(200).json({ success: true, data: image });
  } catch (error) {
    console.error('Error fetching popup image:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
  uploadPopupImage: exports.uploadPopupImage,
  getPopupImage: exports.getPopupImage
};
