const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const adminEmail = 'admin@ayurveda.com'; // Change this for production if you want
    
    // 1. Check if Admin already exists
    const userExists = await User.findOne({ email: adminEmail });

    if (userExists) {
      console.log('⚠️  Admin user already exists. No changes made.');
      process.exit();
    }

    // 2. Create Admin safely
    const adminUser = new User({
      name: 'Super Admin',
      email: adminEmail,
      password: 'adminpassword123', // Change this!
      role: 'admin',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
    });

    await adminUser.save();

    console.log('-----------------------------------');
    console.log('✅ PRODUCTION ADMIN CREATED');
    console.log(`📧 Email: ${adminEmail}`);
    console.log('-----------------------------------');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

createAdmin();
