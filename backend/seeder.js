const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User'); // Verify this path matches your actual folder structure
const Product = require('./models/Product'); // Add Product model if you want to clear products too
const Order = require('./models/Order'); // Add Order model if you want to clear orders too
const connectDB = require('./config/db');

dotenv.config();

// 1. Connect Database
const importData = async () => {
    try {
        // Wait for connection FIRST
        await connectDB(); 

        // 2. Wipe existing data
        await User.deleteMany();
        await Product.deleteMany(); // Optional: Clear products
        await Order.deleteMany();   // Optional: Clear orders

        // 3. Create the Super Admin
        const adminUser = new User({
            name: 'Nikunj Admin',
            email: 'admin@ayurveda.com',
            password: 'adminpassword123', // Will be hashed by the model
            role: 'admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
        });

        await adminUser.save();

        console.log('✅ SUPER ADMIN CREATED SUCCESSFULLY');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB(); // Wait for connection
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('🔴 Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

// Run
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
