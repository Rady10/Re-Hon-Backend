require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_DB_URL;

if (!MONGODB_URI) {
  console.error('MONGO_DB_URL is not defined. Please check your Vercel Environment Variables.');
}


const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);

// Connect to MongoDB without exiting the process on failure
mongoose
    .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
    })
    .then(() => {
        console.log('Database Connected!');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

// Only listen if not running as a serverless function (Vercel sets VERCEL=1)
if (process.env.VERCEL !== '1') {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Connected At Port ${PORT}`);
    });
}

module.exports = app;