import { createContext, useState, useCallback } from "react";
import CONSTANTS from "../utils/constants.js";

export const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState([]);
  const [latestMetric, setLatestMetric] = useState(null);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCritical, setIsCritical] = useState(false);

  const updateMetrics = useCallback((newMetrics) => {
    setMetrics(newMetrics);
  }, []);

  const updateLatestMetric = useCallback((metric) => {
    setLatestMetric(metric);
    if (metric) {
      setIsCritical(metric.prediction === CONSTANTS.CRITICAL_PREDICTION);
    }
  }, []);

  const updateSystemHealth = useCallback((health) => {
    setSystemHealth(health);
    if (health) {
      setIsCritical(health.prediction === CONSTANTS.CRITICAL_PREDICTION);
    }
  }, []);

  const setErrorState = useCallback((err) => {
    setError(err);
  }, []);

  const setLoadingState = useCallback((isLoading) => {
    setLoading(isLoading);
  }, []);

  const value = {
    metrics,
    latestMetric,
    systemHealth,
    loading,
    error,
    isCritical,
    updateMetrics,
    updateLatestMetric,
    updateSystemHealth,
    setErrorState,
    setLoadingState,
  };

  return (
    <MetricsContext.Provider value={value}>{children}</MetricsContext.Provider>
  );
};

export default MetricsContext;
