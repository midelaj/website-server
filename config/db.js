const mongoose = require("mongoose");

const mongURL = "mongodb://127.0.0.1:27017/website ";

async function connectDB() {
  try {
    await mongoose.connect(mongURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("Initial MongoDB connection failed:", error);
  }
}

module.exports = connectDB;