const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 30000, // ✅ increase timeout for Render
      socketTimeoutMS: 45000,          // ✅ increase socket timeout
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
