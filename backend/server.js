const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io'); // The Real-Time Engine
const mongoose = require('mongoose');
const cors = require('cors');

// Security Packages (Req #4)
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');

// Configuration
dotenv.config();
const app = express();
const server = http.createServer(app); // Required for Socket.io

// --- 1. SECURITY LAYER (Req #4) ---
app.use(helmet()); // Protects HTTP Headers
app.use(xss()); // Prevents Cross-Site Scripting
app.use(mongoSanitize()); // Prevents SQL/NoSQL Injection
app.use(express.json({ limit: '10kb' })); // Prevent DoS by limiting body size
app.use(cors({
    origin: "http://localhost:3000", // Only allow your Frontend
    credentials: true
}));

// --- 2. DATABASE CONNECTION (Req #2) ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB Connected (Real-Time Ready)'))
    .catch((err) => {
        console.error('❌ DB Connection Error:', err);
        process.exit(1);
    });

// --- 3. REAL-TIME SYNC ENGINE (Req #1, #2, #3) ---
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"]
    }
});

// This allows us to trigger "Screen Updates" from any file in our backend
app.use((req, res, next) => {
    req.io = io; 
    next();
});

io.on('connection', (socket) => {
    console.log(`⚡ Admin/User Connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

// --- 4. ROUTES ---
app.get('/', (req, res) => res.send('Ayurveda Backend Secure & Live'));

// --- 5. START SERVER ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on Port ${PORT}`);
});
