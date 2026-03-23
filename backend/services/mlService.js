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

      const response = await this.client.post(this.predictEndpoint, payload);
      // console.log(response.data);

      if (response.data) {
        if (response.data.final_state) {
          const { final_state, reason } = response.data;
          console.log("ML final_state:", final_state, "reason:", reason);

          const normalizedState = String(final_state).toLowerCase();

          const mappedPrediction = normalizedState === "normal" ? 1 : -1;

          console.log(`Mapped ML Prediction: ${mappedPrediction}`);
          return {
            prediction: mappedPrediction,
            finalState: final_state,
            reason: reason || null,
          };
        }

        let prediction = response.data.Prediction ?? response.data.Predection;

        if (prediction !== undefined && prediction !== null) {
          const parsed = parseInt(prediction, 10);

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
          prediction: 1,
          finalState: "Normal",
          reason: null,
        };
      } else {
        console.warn("Empty ML API response");
        return {
          prediction: 1,
          finalState: "Normal",
          reason: null,
        };
      }
    } catch (error) {
      console.error("Error calling ML API:", error);
      if (error?.message) {
        console.error(" message:", error.message);
      }
      if (error?.code) {
        console.error(" code:", error.code);
      }
      if (error?.response) {
        console.error(
          " status:",
          error.response.status,
          "data:",
          error.response.data,
        );
      }
      if (!error?.message && !error?.response && !error?.code) {
        console.error(error);
      }

      return {
        prediction: 1,
        finalState: "Normal",
        reason: "ML API unavailable",
      };
    }
  }

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
