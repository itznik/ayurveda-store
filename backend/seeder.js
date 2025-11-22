const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Ensure path to User model is correct
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Clear existing users (Comment this out if you want to keep old users)
    await User.deleteMany();

    // 2. Create the Super Admin
    const adminUser = new User({
      name: 'Nikunj Admin',
      email: 'admin@wellixir.com',
      // Password will be hashed automatically by your User model's pre-save hook
      password: 'admin', 
      role: 'admin',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
    });

    await adminUser.save();

    console.log('-----------------------------------');
    console.log('✅ SUPER ADMIN CREATED SUCCESSFULLY');
    console.log('📧 Email: admin@wellixir.com');
    console.log('🔑 Pass:  admin');
    console.log('-----------------------------------');
    
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    console.log('🔴 Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Run logic based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
