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
  console.error('MONGO_DB_URL is not defined in .env');
  process.exit(1);
}


const app = express();


app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);


mongoose
    .connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        maxPoolSize: 10, // Maintain up to 10 socket connections
    })
    .then(result => {
        console.log('Database Connected!')
    })
    .catch(err => {
        console.log('Database connection error:', err);
        process.exit(1);
    });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Connected At Port ${PORT}`);
});