const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Security
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

// Socket.io
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Inject socket into request
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
