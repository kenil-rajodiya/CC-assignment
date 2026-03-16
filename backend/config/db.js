import mongoose from "mongoose";
import { CONSTANTS } from "../utils/constants.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(CONSTANTS.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
