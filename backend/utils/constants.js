export const CONSTANTS = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/monitoring-dashboard",

  ML_API_URL: process.env.ML_API_URL || "http://localhost:8000",
  ML_PREDICT_ENDPOINT: "/predict",

  METRICS_COLLECTION_INTERVAL: 15000,
  POLLING_INTERVAL: process.env.POLLING_INTERVAL || 15000,

  ALERT_THRESHOLD: process.env.ALERT_THRESHOLD || 1,
  CRITICAL_PREDICTION: -1,

  LATEST_METRICS_LIMIT: 1,
  HISTORY_METRICS_LIMIT: 100,
  CHART_DATA_LIMIT: 50,

  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
};

export default CONSTANTS;
