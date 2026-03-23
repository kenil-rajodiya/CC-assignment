import mlService from "../services/mlService.js";

/**
 * Test ML prediction API
 * POST /api/prediction/test
 */
export const testPrediction = async (req, res, next) => {
  try {
    const metrics = req.body;

    // Validate required fields
    const requiredFields = [
      "cpu",
      "memory",
      "diskRead",
      "diskWrite",
      "networkReceived",
      "networkTransmitted",
    ];

    for (const field of requiredFields) {
      if (metrics[field] === undefined) {
        return res.status(400).json({
          success: false,
          message: `Missing required field: ${field}`,
        });
      }
    }

    const { prediction, finalState, reason } =
      await mlService.getPrediction(metrics);

    res.status(200).json({
      success: true,
      message: "Prediction retrieved successfully",
      data: {
        prediction,
        finalState,
        reason,
        metrics,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Check ML API health
 * GET /api/prediction/health
 */
export const checkMLHealth = async (req, res, next) => {
  try {
    const isHealthy = await mlService.isHealthy();

    res.status(isHealthy ? 200 : 503).json({
      success: isHealthy,
      message: isHealthy ? "ML API is healthy" : "ML API is unavailable",
      mlApiUrl: process.env.ML_API_URL || "http://localhost:8000",
    });
  } catch (error) {
    next(error);
  }
};
