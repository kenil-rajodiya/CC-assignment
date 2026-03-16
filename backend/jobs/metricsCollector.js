import si from "systeminformation";
import cron from "node-cron";
import metricsService from "../services/metricsService.js";
import { CONSTANTS } from "../utils/constants.js";

class MetricsCollector {
  constructor() {
    this.isRunning = false;
    this.task = null;
  }

  /**
   * Collect system metrics
   * @returns {Promise<Object>} System metrics
   */
  async collectMetrics() {
    try {
      console.log("Collecting system metrics...");

      // Get CPU usage
      const cpu = await si.currentLoad();
      const cpuUsage = cpu.currentLoad;

      // Get memory usage
      const mem = await si.mem();
      const memoryUsage = (mem.used / mem.total) * 100;

      // Get disk I/O
      const diskIO = await si.disksIO();
      const diskRead = diskIO ? diskIO.rIO || 0 : 0;
      const diskWrite = diskIO ? diskIO.wIO || 0 : 0;

      // Get network stats
      const netStats = await si.networkStats();
      const networkReceived = netStats.reduce(
        (sum, net) => sum + net.rx_bytes,
        0,
      );
      const networkTransmitted = netStats.reduce(
        (sum, net) => sum + net.tx_bytes,
        0,
      );

      const metrics = {
        cpu: Math.round(cpuUsage * 100) / 100,
        memory: Math.round(memoryUsage * 100) / 100,
        diskRead: Math.round(diskRead * 100) / 100,
        diskWrite: Math.round(diskWrite * 100) / 100,
        networkReceived,
        networkTransmitted,
      };

      console.log("Metrics collected:", metrics);
      return metrics;
    } catch (error) {
      console.error("Error collecting metrics:", error.message);
      throw error;
    }
  }

  /**
   * Process: Collect metrics -> Call ML API -> Store in DB
   */
  async processMetrics() {
    try {
      const metrics = await this.collectMetrics();
      await metricsService.saveMetrics(metrics);
      console.log(`✓ Metrics processed at ${new Date().toISOString()}`);
    } catch (error) {
      console.error("Error processing metrics:", error.message);
    }
  }

  /**
   * Start collecting metrics every 5 seconds
   */
  async start() {
    if (this.isRunning) {
      console.log("Metrics collector is already running");
      return;
    }

    console.log("Starting metrics collector...");

    try {
      // Run immediately on startup
      await this.processMetrics();

      // Schedule to run every 5 seconds using node-cron
      // */5 * * * * * means every 5 seconds
      this.task = cron.schedule("*/5 * * * * *", async () => {
        await this.processMetrics();
      });

      this.isRunning = true;
      console.log("✓ Metrics collector started");
      console.log(`✓ Collecting metrics every 5 seconds`);
    } catch (error) {
      console.error("Error starting metrics collector:", error.message);
      throw error;
    }
  }

  /**
   * Stop collecting metrics
   */
  stop() {
    if (!this.isRunning) {
      console.log("Metrics collector is not running");
      return;
    }

    if (this.task) {
      this.task.stop();
    }

    this.isRunning = false;
    console.log("✓ Metrics collector stopped");
  }

  /**
   * Get collector status
   */
  getStatus() {
    return {
      isRunning: this.isRunning,
      interval: `${CONSTANTS.METRICS_COLLECTION_INTERVAL}ms`,
    };
  }
}

export default new MetricsCollector();
