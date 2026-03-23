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
   * @returns {Promise<{prediction: number, finalState: (string|null), reason: (string|null)}>} Prediction details
   */
  async getPrediction(metrics) {
    try {
      const payload = {
        CPU_cores: 2,
        CPU: metrics.cpu,
        Disk_read: metrics.diskRead,
        Disk_write: metrics.diskWrite,
        Network_received: metrics.networkReceived,
        Network_transmitted: metrics.networkTransmitted,
      };

      // console.log("Calling ML API with payload:", payload);

      const response = await this.client.post(this.predictEndpoint, payload);
      // console.log(response.data);

      if (response.data) {
        // New response format: { final_state: string, reason: string }
        if (response.data.final_state) {
          const { final_state, reason } = response.data;
          console.log("ML final_state:", final_state, "reason:", reason);

          const normalizedState = String(final_state).toLowerCase();

          // Map final_state to numeric prediction used by the app
          // Treat "normal" explicitly as healthy (1), everything else as critical (-1)
          const mappedPrediction = normalizedState === "normal" ? 1 : -1;

          console.log(`Mapped ML Prediction: ${mappedPrediction}`);
          return {
            prediction: mappedPrediction,
            finalState: final_state,
            reason: reason || null,
          };
        }

        // Backwards compatibility: handle numeric Prediction / Predection fields
        let prediction = response.data.Prediction ?? response.data.Predection;

        if (prediction !== undefined && prediction !== null) {
          const parsed = parseInt(prediction, 10);

          // Validate prediction is -1 or 1, default to 1 (normal) if invalid
          if (parsed === -1 || parsed === 1) {
            console.log(`ML Prediction: ${parsed}`);
            return {
              prediction: parsed,
              finalState: parsed === -1 ? "Anomaly" : "Normal",
              reason: null,
            };
          } else {
            console.warn(
              `Invalid prediction value: ${parsed}. Defaulting to 1 (normal)`,
            );
            return {
              prediction: 1,
              finalState: "Normal",
              reason: null,
            };
          }
        }

        console.warn("Unexpected ML API response format:", response.data);
        return {
          prediction: 1, // Default to normal if response is malformed
          finalState: "Normal",
          reason: null,
        };
      } else {
        console.warn("Empty ML API response");
        return {
          prediction: 1, // Default to normal if response is malformed
          finalState: "Normal",
          reason: null,
        };
      }
    } catch (error) {
      console.error("Error calling ML API:", error.message);
      // Return 1 (normal) as fallback if ML API is unavailable
      return {
        prediction: 1,
        finalState: "Normal",
        reason: "ML API unavailable",
      };
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
