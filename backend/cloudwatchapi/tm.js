import {
  CloudWatchClient,
  GetMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";

const client = new CloudWatchClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: "AKIAWAWNC4NLEWZ3WQ5V",
    secretAccessKey: "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",
  },
});

async function getCloudMetrics(instanceId) {
  const startTime = new Date(Date.now() - 15 * 60 * 1000);
  const endTime = new Date();

  const command = new GetMetricDataCommand({
    StartTime: startTime,
    EndTime: endTime,
    MetricDataQueries: [
      {
        Id: "cpu",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "CPUUtilization",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 300,
          Stat: "Average",
        },
      },
      {
        Id: "networkIn",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "NetworkIn",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 300,
          Stat: "Sum",
        },
      },
      {
        Id: "networkOut",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "NetworkOut",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 300,
          Stat: "Sum",
        },
      },
      {
        Id: "diskRead",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "DiskReadOps",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 300,
          Stat: "Sum",
        },
      },
      {
        Id: "diskWrite",
        MetricStat: {
          Metric: {
            Namespace: "AWS/EC2",
            MetricName: "DiskWriteOps",
            Dimensions: [{ Name: "InstanceId", Value: instanceId }],
          },
          Period: 300,
          Stat: "Sum",
        },
      },
    ],
  });

  try {
    const response = await client.send(command);

    const result = {};

    response.MetricDataResults.forEach((metric) => {
      if (metric.Values.length > 0) {
        result[metric.Id] = metric.Values[metric.Values.length - 1];
      } else {
        result[metric.Id] = null;
      }
    });

    return {
      cpu: result.cpu,
      networkReceived: result.networkIn,
      networkTransmitted: result.networkOut,
      diskRead: result.diskRead,
      diskWrite: result.diskWrite,
    };
  } catch (error) {
    console.error("CloudWatch error:", error);
    return null;
  }
}

export { getCloudMetrics };
