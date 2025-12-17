import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://Anamika:Anamika123@cluster0.vmpgzzd.mongodb.net/blog-app";

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};
