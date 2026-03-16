import express from "express";
import {
  testPrediction,
  checkMLHealth,
} from "../controllers/predictionController.js";

const router = express.Router();

/**
 * POST /api/prediction/test
 * Test ML prediction with custom metrics
 */
router.post("/test", testPrediction);

/**
 * GET /api/prediction/health
 * Check ML API health
 */
router.get("/health", checkMLHealth);

export default router;
