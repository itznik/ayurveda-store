const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db'); // Ensure this path matches your actual db file

dotenv.config();

// Manually connect since we are running this script standalone
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected for Seeding...'))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });

const importData = async () => {
    try {
        // 1. Wipe existing users (Optional: Remove this line if you want to keep data)
        await User.deleteMany();

        // 2. Create the Super Admin
        const adminUser = new User({
            name: 'Nikunj Admin',
            email: 'admin@ayurveda.com',
            password: 'adminpassword123', // Will be encrypted automatically by your Model
            role: 'admin',
            avatar: 'https://cdn-icons-png.flaticon.com/512/2206/2206368.png'
        });

        await adminUser.save();

        console.log('✅ Super Admin Created!');
        console.log('📧 Email: admin@ayurveda.com');
        console.log('🔑 Pass: adminpassword123');
        process.exit();
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1);
    }
};

importData();
