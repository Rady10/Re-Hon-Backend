require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');
const cartRoutes = require('./routes/cart');
const wishlistRoutes = require('./routes/wishlist');

const MONGODB_URI = process.env.MONGO_DB_URL;

const app = express();

let connected = false;
app.use(async (req, res, next) => {
  if (!connected) {
    await mongoose.connect(MONGODB_URI);
    connected = true;
  }
  next();
});

app.use(express.json());
app.use(authRoutes);
app.use(userRoutes);
app.use(bookRoutes);
app.use(cartRoutes);
app.use(wishlistRoutes);

if (process.env.VERCEL !== '1') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '0.0.0.0', () => console.log(`Connected At Port ${PORT}`));
}

module.exports = app;