const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const settingsRoutes = require('./routes/settingsRoutes'); // <--- ADD THIS

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// --- 1. SECURITY LAYER ---
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json()); 
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

// --- 2. SOCKET.IO SETUP ---
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

// --- 3. ROUTES ---
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes); // <--- ADD THIS

// --- 4. HEALTH CHECK ---
app.get('/', (req, res) => {
    res.send('✅ API is Running Successfully');
});

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
