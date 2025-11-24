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
const settingsRoutes = require('./routes/settingsRoutes');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Security
app.use(helmet());
app.use(mongoSanitize());
app.use(express.json());

// DYNAMIC CORS: Allow Localhost OR Your Production Frontend
const allowedOrigins = [
    "http://localhost:3000",
    process.env.CLIENT_URL // We will set this in Render/Heroku settings
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            // If specific blocking is needed, uncomment next line. For now, allow flexible dev.
            // return callback(new Error('CORS Policy Error'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

const io = new Server(server, {
    cors: {
        origin: "*", // Allow sockets from anywhere (safe for this setup)
        methods: ["GET", "POST"]
    }
});

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/settings', settingsRoutes);

app.get('/', (req, res) => res.send('✅ API is Live'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
