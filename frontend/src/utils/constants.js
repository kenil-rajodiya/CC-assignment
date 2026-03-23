export const FRONTEND_CONSTANTS = {
  // API
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  API_ENDPOINTS: {
    METRICS_LATEST: "/api/metrics/latest",
    METRICS_HISTORY: "/api/metrics/history",
    METRICS_STATUS: "/api/metrics/status",
    METRICS_CHART: "/api/metrics/chart",
    PREDICTION_TEST: "/api/prediction/test",
    PREDICTION_HEALTH: "/api/prediction/health",
    HEALTH: "/api/health",
  },

  // Polling
  POLLING_INTERVAL: parseInt(
    import.meta.env.VITE_POLLING_INTERVAL || "15000",
    10,
  ),

  // Chart
  CHART_DATA_LIMIT: 50,
  CHART_COLORS: {
    cpu: "#ef4444",
    memory: "#3b82f6",
    diskRead: "#8b5cf6",
    diskWrite: "#ec4899",
    networkReceived: "#10b981",
    networkTransmitted: "#f59e0b",
  },

  // Alert
  CRITICAL_PREDICTION: -1,
  ALERT_THRESHOLD: 1,
};

export default FRONTEND_CONSTANTS;
