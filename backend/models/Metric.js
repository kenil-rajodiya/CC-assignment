import mongoose from "mongoose";

const metricSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now,
      index: true,
    },
    cpu: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    memory: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    diskRead: {
      type: Number,
      required: true,
      min: 0,
    },
    diskWrite: {
      type: Number,
      required: true,
      min: 0,
    },
    networkReceived: {
      type: Number,
      required: true,
      min: 0,
    },
    networkTransmitted: {
      type: Number,
      required: true,
      min: 0,
    },
    prediction: {
      type: Number,
      enum: [0, 1],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Create index for better query performance
metricSchema.index({ timestamp: -1 });
metricSchema.index({ prediction: 1 });

const Metric = mongoose.model("Metric", metricSchema);

export default Metric;
