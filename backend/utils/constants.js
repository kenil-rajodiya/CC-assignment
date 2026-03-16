export const CONSTANTS = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/monitoring-dashboard",

  // ML Service
  ML_API_URL: process.env.ML_API_URL || "http://localhost:8000",
  ML_PREDICT_ENDPOINT: "/predict",

  // Metrics
  METRICS_COLLECTION_INTERVAL: 10000, // 5 seconds in milliseconds
  POLLING_INTERVAL: process.env.POLLING_INTERVAL || 10000,

  // Alert
  ALERT_THRESHOLD: process.env.ALERT_THRESHOLD || 1,
  CRITICAL_PREDICTION: 1,

  // Database Query Limits
  LATEST_METRICS_LIMIT: 1,
  HISTORY_METRICS_LIMIT: 100,
  CHART_DATA_LIMIT: 50,

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};

export default CONSTANTS;
