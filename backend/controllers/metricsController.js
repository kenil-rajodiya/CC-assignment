import metricsService from "../services/metricsService.js";

/**
 * Get latest metrics
 * GET /api/metrics/latest
 */
export const getLatestMetrics = async (req, res, next) => {
  try {
    const metric = await metricsService.getLatestMetric();

    if (!metric) {
      return res.status(404).json({
        success: false,
        message: "No metrics found",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Latest metrics retrieved successfully",
      data: metric,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get metrics history
 * GET /api/metrics/history
 */
export const getMetricsHistory = async (req, res, next) => {
  try {
    const { limit = 100 } = req.query;
    const metrics = await metricsService.getMetricsHistory(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      message: "Metrics history retrieved successfully",
      count: metrics.length,
      data: metrics,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get system health status
 * GET /api/metrics/status
 */
export const getSystemStatus = async (req, res, next) => {
  try {
    const health = await metricsService.getSystemHealth();

    res.status(200).json({
      success: true,
      message: "System health status retrieved successfully",
      data: health,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get chart data
 * GET /api/metrics/chart
 */
export const getChartData = async (req, res, next) => {
  try {
    const { limit = 50 } = req.query;
    const chartData = await metricsService.getChartData(parseInt(limit, 10));

    res.status(200).json({
      success: true,
      message: "Chart data retrieved successfully",
      count: chartData.length,
      data: chartData,
    });
  } catch (error) {
    next(error);
  }
};
