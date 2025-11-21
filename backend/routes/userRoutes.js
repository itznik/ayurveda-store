const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/authController');
const { getUserProfile, updateUserProfile } = require('../controllers/userController'); // Import new
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', authUser);
// New Profile Routes
router.route('/profile')
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile);

module.exports = router;
