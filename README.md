# Cloud-Based Real-Time Monitoring Dashboard

A full-stack monitoring and anomaly detection dashboard that collects real-time infrastructure metrics from AWS CloudWatch (or local system), stores them in MongoDB, runs them through an ML-based anomaly detector, and visualizes everything in a modern React + Tailwind UI.

- **Backend:** Node.js, Express, MongoDB, AWS CloudWatch, ML API integration
- **Frontend:** React 18, Vite, Tailwind CSS, Recharts
- **Features:** Real-time charts, health prediction, alert banner, responsive dashboard UI

---

## ✨ Features

- **Real-time metrics collection** from AWS EC2 via CloudWatch (CPU, disk I/O, network I/O)
- **Background metrics collector** running every 15 seconds using `node-cron`
- **MongoDB persistence** for historical metrics and chart data
- **ML-powered anomaly detection** via external ML API (Python / FastAPI etc.)
- **System health aggregation API** (NORMAL / CRITICAL / NO_DATA)
- **Modern dashboard UI** with:
  - Status cards for CPU, memory, disk, network, and prediction state
  - Multiple interactive charts (CPU, memory, network, disk) using Recharts
  - Alert banner for critical states and anomaly reasons
  - Connection status indicator and auto-refresh
- **Environment-based configuration** via `.env` and Vite env variables

---

## 🧱 Project Structure

```bash
.
├── backend/                  # Node.js + Express API
│   ├── app.js                # Express app setup, routes, middlewares
│   ├── server.js             # Server bootstrap, DB connect, metrics collector
│   ├── cloudwatchapi/        # AWS CloudWatch metrics fetch helpers
│   ├── config/               # DB config (MongoDB)
│   ├── controllers/          # Metrics & prediction controllers
│   ├── jobs/                 # Metrics collector (cron job)
│   ├── middlewares/          # Error handling middleware
│   ├── models/               # Mongoose models (Metric)
│   ├── routes/               # Express routes for metrics & prediction
│   ├── services/             # Metrics + ML service layer
│   └── utils/                # Shared constants
│
├── frontend/                 # React + Vite SPA
│   ├── index.html
│   ├── src/
│   │   ├── App.jsx           # Root app, wraps Home in MetricsProvider
│   │   ├── pages/Home.jsx    # Home page rendering Dashboard
│   │   ├── components/       # Dashboard, charts, cards, alerts
│   │   ├── hooks/useMetrics.js
│   │   ├── context/          # MetricsContext provider
│   │   └── utils/constants.js
│   └── public/
│
├── main.py                   # ML / anomaly model entry (Python side)
├── anomaly_model.pkl         # Trained anomaly model
├── scaler.pkl                # Feature scaler used by the model
├── requirements.txt          # Python dependencies for ML service
└── README.md
```

---

## 🚀 Tech Stack

**Backend**

- Node.js, Express
- MongoDB + Mongoose
- AWS CloudWatch SDK (`@aws-sdk/client-cloudwatch`)
- `node-cron` for scheduled jobs
- `systeminformation` (optional local metrics, currently commented)
- Axios for ML API calls

**Frontend**

- React 18 + Vite
- Tailwind CSS
- Recharts for data visualization
- Axios for API calls

**ML / Anomaly Detection**

- Python (see `main.py`, `requirements.txt`)
- Pretrained model (`anomaly_model.pkl`) + scaler (`scaler.pkl`)

---

## ⚙️ Backend Setup

### 1. Prerequisites

- Node.js (LTS)
- MongoDB running locally or remotely
- AWS credentials with access to CloudWatch
- Python 3.x (for the ML service)

### 2. Environment Variables (`.env` in project root)

Create a `.env` file in the project root (same level as `backend/` and `frontend/`) and configure:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/monitoring-dashboard
NODE_ENV=development

# AWS / CloudWatch
AWS_ACCESS_KEY_ID=YOUR_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET
AWS_REGION=YOUR_REGION
AWS_INSTANCE_ID=your-ec2-instance-id

# ML API
ML_API_URL=http://localhost:8000
POLLING_INTERVAL=15000
ALERT_THRESHOLD=1
LOG_LEVEL=debug
```

> The backend loads env vars from `../.env` in `server.js`, so the `.env` file should be at the project root.

### 3. Install Backend Dependencies

```bash
cd backend
npm install
```

### 4. Run the Backend

```bash
# Development (auto-restart with nodemon)
npm run dev

# or production
npm start
```

By default, the backend listens on `http://localhost:5000`.

---

## 🖥️ Frontend Setup

### 1. Environment Variables (`frontend/.env`)

Create a `.env` file inside `frontend/` to configure API URL and polling interval:

```env
VITE_API_URL=http://localhost:5000
VITE_POLLING_INTERVAL=15000
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3. Run the Frontend (Vite)

```bash
npm run dev
```

Vite will print a local URL (usually `http://localhost:5173`). Open it in the browser.

---

## 🔌 How It Works (End-to-End)

1. **Metrics collection**
   - The metrics collector in `backend/jobs/metricsCollector.js` runs every 15 seconds.
   - It calls AWS CloudWatch via `backend/cloudwatchapi/tm.js` to fetch:
     - CPU utilization
     - Disk read/write
     - Network in/out
   - The collected metrics object looks like:

```js
{
  cpu: <number>,
  memory: 0, // (0 for now when using CloudWatch-only)
  diskRead: <number>,
  diskWrite: <number>,
  networkReceived: <number>,
  networkTransmitted: <number>
}
```

2. **ML prediction & persistence**
   - `metricsService.saveMetrics()` sends these metrics to the ML service via `mlService.getPrediction()`.
   - The ML service returns:
     - `prediction` (e.g., normal vs anomaly numeric code)
     - `finalState` ("Normal" / "Anomaly")
     - `reason` (human-readable explanation)
   - A `Metric` document is saved in MongoDB with metrics + prediction + reason.

3. **API layer**
   - `GET /api/metrics/latest` – latest metric document.
   - `GET /api/metrics/history?limit=N` – recent metrics series.
   - `GET /api/metrics/status` – aggregated system health (NORMAL / CRITICAL / NO_DATA) plus alert text.
   - `GET /api/metrics/chart?limit=N` – timeseries data for charts.
   - `POST /api/prediction/test` – on-demand prediction for posted metrics.
   - `GET /api/prediction/health` – check health of ML service.
   - `GET /api/health` – backend health + metrics collector status.

4. **Frontend dashboard**
   - `useMetrics` hook (frontend) polls the backend at `FRONTEND_CONSTANTS.POLLING_INTERVAL`.
   - It calls:
     - `getChartData`
     - `getLatestMetrics`
     - `getSystemStatus`
   - Data flows through `MetricsContext` into `Dashboard`, which renders:
     - `StatusCard` components for key metrics and prediction state.
     - Multiple `MetricsChart` components for CPU, memory, network, disk.
     - `AlertBanner` for critical states.
     - A connectivity indicator + last updated time.

---

## 📡 Key API Endpoints

Base URL (default): `http://localhost:5000`

### Health

- `GET /api/health`

### Metrics

- `GET /api/metrics/latest`
- `GET /api/metrics/history?limit=100`
- `GET /api/metrics/status`
- `GET /api/metrics/chart?limit=50`

### Prediction / ML

- `POST /api/prediction/test`
- `GET /api/prediction/health`

---

## 🧪 Testing the System

- Ensure MongoDB is running.
- Start the ML API (Python service using `main.py`).
- Start the backend (`npm run dev` in `backend`).
- Start the frontend (`npm run dev` in `frontend`).
- Open the Vite URL in your browser and watch the dashboard update in real time.

You can also hit the backend endpoints directly using:

- Browser (for GETs)
- curl / Postman / Thunder Client (for POST and detailed testing)

---

## 🎨 UI Highlights

- Clean, responsive layout built with Tailwind CSS.
- Card-based summary of current CPU, memory, disk, and network.
- Color-coded health states (normal, warning, danger, success).
- Smooth line/area charts with gradients and tooltips.
- Clear error / connection state handling with a friendly retry UI.

---

## 🛠️ Local System Metrics (Optional)

The metrics collector currently uses AWS CloudWatch metrics. There is commented-out code in `backend/jobs/metricsCollector.js` to switch to **local system metrics** using `systeminformation`:

- Uncomment the local metrics section to:
  - Read local CPU load, memory, disk I/O, and network stats.
  - Store them the same way as CloudWatch metrics.

This is useful for running the dashboard entirely on a laptop without AWS.

---

## 📁 ML Service (Python)

The repository includes:

- `main.py` – likely the entry point for the ML API.
- `anomaly_model.pkl` – trained anomaly detection model.
- `scaler.pkl` – feature scaler.
- `requirements.txt` – Python dependencies.

Basic idea to run (adjust to your implementation):

```bash
# In project root or ML folder
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

Make sure the ML API listens on the URL used in `ML_API_URL`.

---

## ✅ Summary

This project is a complete **cloud-aware, ML-driven monitoring dashboard**:

- Gathers metrics from AWS EC2 (or local system).
- Feeds them through an ML anomaly detector.
- Stores everything in MongoDB.
- Presents a polished, real-time React dashboard for operators.

You can extend it by:

- Adding more metrics (latency, custom app metrics).
- Enhancing the ML model.
- Adding alerting/notification channels (email, Slack, etc.).
