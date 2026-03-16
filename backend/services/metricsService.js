import Metric from "../models/Metric.js";
import mlService from "./mlService.js";
import { CONSTANTS } from "../utils/constants.js";

class MetricsService {
  /**
   * Save metrics to database with ML prediction
   * @param {Object} metrics - Raw system metrics
   * @returns {Promise<Object>} Saved metric document
   */
  async saveMetrics(metrics) {
    try {
      // Get prediction from ML service
      const prediction = await mlService.getPrediction(metrics);

      // Create metric document
      const metricData = {
        timestamp: new Date(),
        cpu: metrics.cpu,
        memory: metrics.memory,
        diskRead: metrics.diskRead,
        diskWrite: metrics.diskWrite,
        networkReceived: metrics.networkReceived,
        networkTransmitted: metrics.networkTransmitted,
        prediction,
      };

      // Save to MongoDB
      const savedMetric = await Metric.create(metricData);
      console.log("Metric saved:", savedMetric._id);
      return savedMetric;
    } catch (error) {
      console.error("Error saving metric:", error.message);
      throw error;
    }
  }

  /**
   * Get latest metric
   * @returns {Promise<Object>} Latest metric document
   */
  async getLatestMetric() {
    try {
      const metric = await Metric.findOne().sort({ timestamp: -1 }).lean();
      return metric;
    } catch (error) {
      console.error("Error fetching latest metric:", error.message);
      throw error;
    }
  }

  /**
   * Get metric history
   * @param {number} limit - Number of records to fetch (default: 100)
   * @returns {Promise<Array>} Array of metric documents
   */
  async getMetricsHistory(limit = CONSTANTS.HISTORY_METRICS_LIMIT) {
    try {
      const metrics = await Metric.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .lean();
      return metrics.reverse(); // Return in ascending order for charts
    } catch (error) {
      console.error("Error fetching metrics history:", error.message);
      throw error;
    }
  }

  /**
   * Get system health summary
   * @returns {Promise<Object>} Health summary with current metrics and status
   */
  async getSystemHealth() {
    try {
      const latestMetric = await this.getLatestMetric();

      if (!latestMetric) {
        return {
          status: "NO_DATA",
          message: "No metrics found",
          metrics: null,
        };
      }

      const isCritical =
        latestMetric.prediction === CONSTANTS.CRITICAL_PREDICTION;
      const status = isCritical ? "CRITICAL" : "NORMAL";

      return {
        status,
        timestamp: latestMetric.timestamp,
        metrics: {
          cpu: latestMetric.cpu,
          memory: latestMetric.memory,
          diskRead: latestMetric.diskRead,
          diskWrite: latestMetric.diskWrite,
          networkReceived: latestMetric.networkReceived,
          networkTransmitted: latestMetric.networkTransmitted,
        },
        prediction: latestMetric.prediction,
        alert: isCritical ? "⚠ High system load detected" : null,
      };
    } catch (error) {
      console.error("Error getting system health:", error.message);
      throw error;
    }
  }

  /**
   * Get chart data (last N records)
   * @param {number} limit - Number of records to fetch (default: 50)
   * @returns {Promise<Array>} Array of metrics for chart display
   */
  async getChartData(limit = CONSTANTS.CHART_DATA_LIMIT) {
    try {
      const metrics = await Metric.find()
        .sort({ timestamp: -1 })
        .limit(limit)
        .select(
          "timestamp cpu memory diskRead diskWrite networkReceived networkTransmitted prediction",
        )
        .lean();
      return metrics.reverse(); // Return in ascending order for charts
    } catch (error) {
      console.error("Error fetching chart data:", error.message);
      throw error;
    }
  }
}

export default new MetricsService();
