import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

export default async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("🔁 Already connected to MongoDB");
    return mongoose.connection;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB via Mongoose");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw error;
  }
}
