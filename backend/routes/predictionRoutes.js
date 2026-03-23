import express from "express";
import {
  testPrediction,
  checkMLHealth,
} from "../controllers/predictionController.js";

const router = express.Router();

router.post("/test", testPrediction);

router.get("/health", checkMLHealth);

export default router;
