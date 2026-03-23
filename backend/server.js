import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import app from "./app.js";
import connectDB from "./config/db.js";
import metricsCollector from "./jobs/metricsCollector.js";
import { CONSTANTS } from "./utils/constants.js";

const PORT = CONSTANTS.PORT;

const startServer = async () => {
  try {
    await connectDB();

    await metricsCollector.start();

    app.listen(PORT, () => {
      console.log(`Monitoring Dashboard Backend\nServer running on port ${PORT}\nMongoDB: Connected
      `);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

process.on("SIGINT", () => {
  console.log("\nShutting down gracefully...");
  metricsCollector.stop();
  process.exit(0);
});

startServer();
