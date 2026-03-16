import express from "express";
import {
  getLatestMetrics,
  getMetricsHistory,
  getSystemStatus,
  getChartData,
} from "../controllers/metricsController.js";

const router = express.Router();

/**
 * GET /api/metrics/latest
 * Get latest monitoring data
 */
router.get("/latest", getLatestMetrics);

/**
 * GET /api/metrics/history
 * Get metrics history (last 100 entries)
 */
router.get("/history", getMetricsHistory);

/**
 * GET /api/metrics/status
 * Get system health summary
 */
router.get("/status", getSystemStatus);

/**
 * GET /api/metrics/chart
 * Get chart data (last 50 entries)
 */
router.get("/chart", getChartData);

export default router;
