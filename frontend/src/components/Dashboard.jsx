import React from "react";
import StatusCard from "./StatusCard.jsx";
import MetricsChart from "./MetricsChart.jsx";
import AlertBanner from "./AlertBanner.jsx";
import useMetrics from "../hooks/useMetrics.js";
import CONSTANTS from "../utils/constants.js";

export const Dashboard = () => {
  const {
    metrics,
    latestMetric,
    systemHealth,
    loading,
    error,
    isCritical,
    isConnected,
    refetch,
  } = useMetrics();

  if (error && !isConnected) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Connection Error
          </h1>
          <p className="text-gray-600 mb-4">
            {error || "Unable to connect to the monitoring dashboard backend."}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Make sure the backend server is running on http://localhost:5000
          </p>
          <button
            onClick={refetch}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const cpuMetricData = latestMetric
    ? [
        {
          name: "CPU Usage",
          dataKey: "cpu",
          color: CONSTANTS.CHART_COLORS.cpu,
        },
      ]
    : [];

  const memoryMetricData = latestMetric
    ? [
        {
          name: "Memory Usage",
          dataKey: "memory",
          color: CONSTANTS.CHART_COLORS.memory,
        },
      ]
    : [];

  const networkMetricData = latestMetric
    ? [
        {
          name: "Received",
          dataKey: "networkReceived",
          color: CONSTANTS.CHART_COLORS.networkReceived,
        },
        {
          name: "Transmitted",
          dataKey: "networkTransmitted",
          color: CONSTANTS.CHART_COLORS.networkTransmitted,
        },
      ]
    : [];

  const diskMetricData = latestMetric
    ? [
        {
          name: "Disk Read",
          dataKey: "diskRead",
          color: CONSTANTS.CHART_COLORS.diskRead,
        },
        {
          name: "Disk Write",
          dataKey: "diskWrite",
          color: CONSTANTS.CHART_COLORS.diskWrite,
        },
      ]
    : [];

  const cpuVariant =
    latestMetric?.cpu > 80
      ? "danger"
      : latestMetric?.cpu > 50
        ? "warning"
        : "primary";
  const memoryVariant =
    latestMetric?.memory > 80
      ? "danger"
      : latestMetric?.memory > 50
        ? "warning"
        : "primary";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            📊 Monitoring Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Real-time system metrics and performance monitoring
          </p>
        </div>

        {/* Alert Banner */}
        {systemHealth && (
          <AlertBanner isCritical={isCritical} alert={systemHealth.alert} />
        )}

        {/* Status Cards */}
        {latestMetric && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatusCard
              title="CPU Usage"
              value={latestMetric.cpu?.toFixed(2) || 0}
              unit="%"
              variant={cpuVariant}
            />
            <StatusCard
              title="Memory Usage"
              value={latestMetric.memory?.toFixed(2) || 0}
              unit="%"
              variant={memoryVariant}
            />
            <StatusCard
              title="Disk Read"
              value={latestMetric.diskRead?.toFixed(2) || 0}
              unit="IO/s"
              variant="primary"
            />
            <StatusCard
              title="Network Input"
              value={latestMetric.networkReceived || 0}
              unit="bytes"
              variant="success"
            />
          </div>
        )}

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <MetricsChart
            data={metrics}
            title="CPU Usage Over Time"
            type="line"
            metrics={cpuMetricData}
            height={300}
          />
          <MetricsChart
            data={metrics}
            title="Memory Usage Over Time"
            type="area"
            metrics={memoryMetricData}
            height={300}
          />
          <MetricsChart
            data={metrics}
            title="Network Activity"
            type="line"
            metrics={networkMetricData}
            height={300}
          />
          <MetricsChart
            data={metrics}
            title="Disk Activity"
            type="area"
            metrics={diskMetricData}
            height={300}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-gray-600 text-sm">
          <p>
            Last updated:{" "}
            {latestMetric
              ? new Date(latestMetric.timestamp).toLocaleTimeString()
              : "Never"}
          </p>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span>{isConnected ? "Connected" : "Disconnected"}</span>
          </div>
        </div>

        {loading && (
          <div className="text-center text-gray-500 mt-4">Fetching data...</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
