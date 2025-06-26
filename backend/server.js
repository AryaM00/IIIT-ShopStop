require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { createServer } = require('http');
const path = require('path');

const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const chatRoutes = require('./routes/chat');
const orderRoutes = require('./routes/order');

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
}));

// Logging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/user', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/support', chatRoutes);
app.use('/api/orders', orderRoutes);

// Serve frontend (if fullstack)
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// DB and Server Start
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('DB connection error:', err));

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!', message: err.message });
});
