const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController'); // Import from the NEW file
const { protect } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Profile Routes (Protected)
router.route('/profile')
    .get(protect, getUserProfile)    // Fetch Profile
    .put(protect, updateUserProfile); // Update Profile

module.exports = router;
