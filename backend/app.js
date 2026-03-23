import express from "express";
import cors from "cors";
import morgan from "morgan";
import { CONSTANTS } from "./utils/constants.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middlewares/errorMiddleware.js";
import metricsRoutes from "./routes/metricsRoutes.js";
import predictionRoutes from "./routes/predictionRoutes.js";
import metricsCollector from "./jobs/metricsCollector.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend server is running",
    timestamp: new Date().toISOString(),
    metricsCollector: metricsCollector.getStatus(),
  });
});

app.use("/api/metrics", metricsRoutes);
app.use("/api/prediction", predictionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Cloud-Based Real-Time Monitoring Dashboard API",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      metrics: {
        latest: "/api/metrics/latest",
        history: "/api/metrics/history",
        status: "/api/metrics/status",
        chart: "/api/metrics/chart",
      },
      prediction: {
        test: "/api/prediction/test",
        health: "/api/prediction/health",
      },
    },
  });
});

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
