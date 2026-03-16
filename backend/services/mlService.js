import axios from "axios";
import { CONSTANTS } from "../utils/constants.js";

class MLService {
  constructor() {
    this.mlApiUrl = CONSTANTS.ML_API_URL;
    this.predictEndpoint = CONSTANTS.ML_PREDICT_ENDPOINT;
    this.client = axios.create({
      baseURL: this.mlApiUrl,
      timeout: 5000,
    });
  }

  /**
   * Call ML API to get prediction
   * @param {Object} metrics - System metrics
   * @param {number} metrics.cpu - CPU usage percentage
   * @param {number} metrics.memory - Memory usage percentage
   * @param {number} metrics.diskRead - Disk read throughput
   * @param {number} metrics.diskWrite - Disk write throughput
   * @param {number} metrics.networkReceived - Network received bytes
   * @param {number} metrics.networkTransmitted - Network transmitted bytes
   * @returns {Promise<number>} Prediction value (0 or 1)
   */
  async getPrediction(metrics) {
    try {
      const payload = {
        CPU: metrics.cpu,
        Memory: metrics.memory,
        Disk_read: metrics.diskRead,
        Disk_write: metrics.diskWrite,
        Network_recieved: metrics.networkReceived,
        Network_transmitted: metrics.networkTransmitted,
      };

      console.log("Calling ML API with payload:", payload);

      const response = await this.client.post(this.predictEndpoint, payload);

      if (response.data) {
        // Handle both correct spelling "Prediction" and typo "Predection"
        let prediction = response.data.Prediction ?? response.data.Predection;

        if (prediction !== undefined && prediction !== null) {
          const parsed = parseInt(prediction, 10);

          // Validate prediction is 0 or 1, default to 0 if invalid
          if (parsed === 0 || parsed === 1) {
            console.log(`ML Prediction: ${parsed}`);
            return parsed;
          } else {
            console.warn(
              `Invalid prediction value: ${parsed}. Defaulting to 0 (normal)`,
            );
            return 0;
          }
        } else {
          console.warn("Unexpected ML API response format:", response.data);
          return 0; // Default to normal if response is malformed
        }
      } else {
        console.warn("Empty ML API response");
        return 0; // Default to normal if response is malformed
      }
    } catch (error) {
      console.error("Error calling ML API:", error.message);
      // Return 0 (normal) as fallback if ML API is unavailable
      return 0;
    }
  }

  /**
   * Check if ML API is healthy
   * @returns {Promise<boolean>} True if API is accessible
   */
  async isHealthy() {
    try {
      await this.client.get("/");
      return true;
    } catch (error) {
      console.warn("ML API health check failed:", error.message);
      return false;
    }
  }
}

export default new MLService();
