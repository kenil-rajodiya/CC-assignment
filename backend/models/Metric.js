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
      enum: [-1, 1],
      required: true,
    },
    finalState: {
      type: String,
      default: null,
    },
    reason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

metricSchema.index({ timestamp: -1 });
metricSchema.index({ prediction: 1 });

const Metric = mongoose.model("Metric", metricSchema);

export default Metric;
