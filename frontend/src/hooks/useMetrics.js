import { useState, useEffect, useCallback, useContext } from "react";
import apiClient from "../api/api.js";
import MetricsContext from "../context/MetricsContext.jsx";
import CONSTANTS from "../utils/constants.js";

export const useMetrics = () => {
  const context = useContext(MetricsContext);
  if (!context) {
    throw new Error("useMetrics must be used within MetricsProvider");
  }

  const {
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
  } = context;

  const [isConnected, setIsConnected] = useState(false);

  const fetchChartData = useCallback(async () => {
    try {
      setLoadingState(true);
      const response = await apiClient.getChartData(CONSTANTS.CHART_DATA_LIMIT);
      if (response.data.success) {
        updateMetrics(response.data.data);
      }
      setErrorState(null);
      setIsConnected(true);
    } catch (err) {
      console.error("Error fetching chart data:", err.message);
      setErrorState(err.message);
      setIsConnected(false);
    } finally {
      setLoadingState(false);
    }
  }, [updateMetrics, setErrorState, setLoadingState]);

  const fetchLatestMetric = useCallback(async () => {
    try {
      const response = await apiClient.getLatestMetrics();
      if (response.data.success) {
        updateLatestMetric(response.data.data);
      }
      setErrorState(null);
      setIsConnected(true);
    } catch (err) {
      console.error("Error fetching latest metric:", err.message);
      setErrorState(err.message);
      setIsConnected(false);
    }
  }, [updateLatestMetric, setErrorState]);

  const fetchSystemHealth = useCallback(async () => {
    try {
      const response = await apiClient.getSystemStatus();
      if (response.data.success) {
        updateSystemHealth(response.data.data);
      }
      setErrorState(null);
      setIsConnected(true);
    } catch (err) {
      console.error("Error fetching system health:", err.message);
      setErrorState(err.message);
      setIsConnected(false);
    }
  }, [updateSystemHealth, setErrorState]);

  const fetchAllMetrics = useCallback(async () => {
    try {
      setLoadingState(true);
      await Promise.all([
        fetchChartData(),
        fetchLatestMetric(),
        fetchSystemHealth(),
      ]);
      setErrorState(null);
      setIsConnected(true);
    } catch (err) {
      console.error("Error fetching metrics:", err.message);
      setErrorState(err.message);
      setIsConnected(false);
    } finally {
      setLoadingState(false);
    }
  }, [
    fetchChartData,
    fetchLatestMetric,
    fetchSystemHealth,
    setErrorState,
    setLoadingState,
  ]);

  useEffect(() => {
    fetchAllMetrics();

    const interval = setInterval(fetchAllMetrics, CONSTANTS.POLLING_INTERVAL);

    return () => {
      clearInterval(interval);
    };
  }, [fetchAllMetrics]);

  return {
    metrics,
    latestMetric,
    systemHealth,
    loading,
    error,
    isCritical,
    isConnected,
    refetch: fetchAllMetrics,
  };
};

export default useMetrics;
