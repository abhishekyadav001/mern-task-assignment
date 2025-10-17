const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();  

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
}

module.exports = { connectDB };
