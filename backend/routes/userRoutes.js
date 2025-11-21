const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/authController');

// Route: POST /api/users/register
// Description: Register a new user & Emit Real-Time Event to Admin
router.post('/register', registerUser);

module.exports = router;
