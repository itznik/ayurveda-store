const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();

const importData = async () => {
    try {
        // 1. Connect
        await connectDB();

        // 2. Wipe Data
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
        console.log('🗑️  Old data cleared.');

        // 3. Create Super Admin
        // FIX: We pass the PLAIN password 'admin123'. 
        // The User Model's "pre-save" hook will automatically hash it for us.
        const adminUser = await User.create({
            name: 'Super Admin',
            email: 'admin@ayurveda.com',
            password: 'admin123', // <--- Sending PLAIN TEXT now
            role: 'admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
        });

        console.log('------------------------------------------------');
        console.log('✅ ADMIN USER CREATED SUCCESSFULLY');
        console.log('👤 Email:    admin@ayurveda.com');
        console.log('🔑 Password: admin123');
        console.log('------------------------------------------------');
        
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await connectDB();
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

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
