const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getSettings) // Public can read (for frontend text)
    .put(protect, admin, updateSettings); // Only admin can update

module.exports = router;
