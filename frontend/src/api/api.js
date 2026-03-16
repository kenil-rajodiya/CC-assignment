import axios from "axios";
import CONSTANTS from "../utils/constants.js";

const api = axios.create({
  baseURL: CONSTANTS.API_URL,
  timeout: 10000,
});

// API endpoints
export const apiClient = {
  // Metrics endpoints
  getLatestMetrics: () => api.get(CONSTANTS.API_ENDPOINTS.METRICS_LATEST),
  getMetricsHistory: (limit = 100) =>
    api.get(CONSTANTS.API_ENDPOINTS.METRICS_HISTORY, { params: { limit } }),
  getSystemStatus: () => api.get(CONSTANTS.API_ENDPOINTS.METRICS_STATUS),
  getChartData: (limit = 50) =>
    api.get(CONSTANTS.API_ENDPOINTS.METRICS_CHART, { params: { limit } }),

  // Prediction endpoints
  testPrediction: (metrics) =>
    api.post(CONSTANTS.API_ENDPOINTS.PREDICTION_TEST, metrics),
  checkMLHealth: () => api.get(CONSTANTS.API_ENDPOINTS.PREDICTION_HEALTH),

  // Health check
  checkBackendHealth: () => api.get(CONSTANTS.API_ENDPOINTS.HEALTH),
};

export default apiClient;
