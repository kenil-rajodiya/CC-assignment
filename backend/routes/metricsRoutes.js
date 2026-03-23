import express from "express";
import {
  getLatestMetrics,
  getMetricsHistory,
  getSystemStatus,
  getChartData,
} from "../controllers/metricsController.js";

const router = express.Router();

router.get("/latest", getLatestMetrics);

router.get("/history", getMetricsHistory);

router.get("/status", getSystemStatus);


router.get("/chart", getChartData);

export default router;
