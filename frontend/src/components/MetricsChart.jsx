import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CONSTANTS from "../utils/constants.js";

export const MetricsChart = ({
  data,
  title,
  type = "line",
  metrics = [],
  height = 300,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  const formattedData = data.map((item) => ({
    ...item,
    time: formatTimestamp(item.timestamp),
  }));

  const chartComponent =
    type === "area" ? (
      <AreaChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          {metrics.map((metric) => (
            <linearGradient
              key={metric.dataKey}
              id={`color${metric.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={metric.color} stopOpacity={0.8} />
              <stop offset="95%" stopColor={metric.color} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        />
        <Legend wrapperStyle={{ color: "#6b7280" }} />
        {metrics.map((metric) => (
          <Area
            key={metric.dataKey}
            type="monotone"
            dataKey={metric.dataKey}
            name={metric.name}
            stroke={metric.color}
            fillOpacity={1}
            fill={`url(#color${metric.dataKey})`}
          />
        ))}
      </AreaChart>
    ) : (
      <LineChart
        data={formattedData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="time" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#f9fafb",
            border: "1px solid #e5e7eb",
          }}
        />
        <Legend wrapperStyle={{ color: "#6b7280" }} />
        {metrics.map((metric) => (
          <Line
            key={metric.dataKey}
            type="monotone"
            dataKey={metric.dataKey}
            name={metric.name}
            stroke={metric.color}
            dot={false}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    );

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        {chartComponent}
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
