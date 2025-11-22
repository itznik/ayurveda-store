const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

// Security Packages
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// REMOVED: const xss = require('xss-clean'); <-- This was causing the crash

// Configuration
const connectDB = require('./config/db'); // Ensure this matches your file path
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// --- 1. SECURITY LAYER ---
app.use(helmet()); // Protects HTTP Headers
// REMOVED: app.use(xss()); <-- This was causing the crash
app.use(mongoSanitize()); // Prevents SQL/NoSQL Injection
app.use(express.json({ limit: '10kb' })); // Prevent DoS by limiting body size
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

// --- 2. REAL-TIME SYNC ENGINE ---
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

app.use((req, res, next) => {
    req.io = io; 
    next();
});

io.on('connection', (socket) => {
    console.log(`⚡ Client Connected: ${socket.id}`);
    socket.on('disconnect', () => console.log('Client Disconnected'));
});

// --- 3. ROUTES ---
// Import Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('Ayurveda Backend Secure & Live'));

// --- 4. START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});
