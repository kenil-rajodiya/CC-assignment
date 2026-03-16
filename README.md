# Cloud-Based Real-Time Monitoring Dashboard

A complete **MERN stack** (MongoDB, Express.js, React, Node.js) monitoring solution with real-time metrics collection, ML prediction integration, and an interactive dashboard.

## 📋 Project Overview

This system collects system metrics (CPU, memory, disk, network), sends them to an ML prediction API, stores results in MongoDB, and displays them on a real-time React dashboard with automatic polling every 5 seconds.

### Architecture Highlights

- **Modular & Maintainable**: Clean separation of concerns (controllers, services, models)
- **Real-time Updates**: Dashboard polls backend every 5 seconds
- **ML Integration**: Automatic system health predictions
- **Alert System**: Visual alerts for critical system load
- **Production-Ready**: Error handling, logging, CORS support

## 🗂️ Project Structure

```
innovative_assignment/
├── backend/                    # Node.js Express Server
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── metricsController.js
│   │   └── predictionController.js
│   ├── models/
│   │   └── Metric.js          # MongoDB schema
│   ├── routes/
│   │   ├── metricsRoutes.js
│   │   └── predictionRoutes.js
│   ├── services/
│   │   ├── metricsService.js  # Business logic
│   │   └── mlService.js       # ML API integration
│   ├── utils/
│   │   └── constants.js       # Configuration
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   ├── jobs/
│   │   └── metricsCollector.js # Scheduled metrics collection
│   ├── app.js                 # Express app
│   ├── server.js              # Server entry point
│   ├── package.json
│   └── .env
│
└── frontend/                  # React Dashboard
    ├── src/
    │   ├── api/
    │   │   └── api.js         # API client
    │   ├── components/
    │   │   ├── Dashboard.jsx
    │   │   ├── MetricsChart.jsx
    │   │   ├── StatusCard.jsx
    │   │   └── AlertBanner.jsx
    │   ├── hooks/
    │   │   └── useMetrics.js  # Custom hook
    │   ├── pages/
    │   │   └── Home.jsx
    │   ├── context/
    │   │   └── MetricsContext.jsx
    │   ├── utils/
    │   │   └── constants.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css          # Tailwind CSS
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    └── .env
```

## 🚀 Prerequisites

- **Node.js** 16+ and npm
- **MongoDB** running locally or remote URI
- **Python FastAPI** ML service running on `http://localhost:8000`
- **Git** (optional)

## 📦 Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# MONGODB_URI=mongodb://localhost:27017/monitoring-dashboard
# ML_API_URL=http://localhost:8000
# PORT=5000
```

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# VITE_API_URL=http://localhost:5000
```

## ▶️ Running the Application

### Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas with connection string in .env
```

### Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:

```
╔════════════════════════════════════════════╗
║  Monitoring Dashboard Backend              ║
║  Server running on port 5000                    ║
║  Environment: development             ║
║  MongoDB: Connected                         ║
║  Metrics Collector: Running                 ║
╚════════════════════════════════════════════╝
```

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Start Python ML API (in separate terminal)

```bash
# Ensure your FastAPI service is running on port 8000
python main.py  # or your ML service startup command
```

## 📊 Backend API Endpoints

### Health Check

- `GET /api/health` - Server health status and metrics collector status

### Metrics Endpoints

- `GET /api/metrics/latest` - Get latest metric entry
- `GET /api/metrics/history?limit=100` - Get metric history (default: 100 records)
- `GET /api/metrics/status` - Get system health summary with alerts
- `GET /api/metrics/chart?limit=50` - Get chart data (default: 50 records)

### ML Prediction Endpoints

- `POST /api/prediction/test` - Test ML prediction with custom metrics
  ```json
  {
    "cpu": 45.5,
    "memory": 60.2,
    "diskRead": 1024.5,
    "diskWrite": 512.3,
    "networkReceived": 1000000,
    "networkTransmitted": 500000
  }
  ```
- `GET /api/prediction/health` - Check ML API health status

## 🎯 Key Features

### Real-Time Metrics Collection

- Collects CPU, memory, disk, and network metrics
- Runs every **5 seconds** using node-cron
- Automatically sends metrics to ML API for prediction

### ML Integration

- Calls Python FastAPI prediction service
- Stores prediction results in database
- Handles API failures gracefully (defaults to normal state)

### Dashboard

- **Live Charts**: CPU, memory, network, and disk activity
- **Status Cards**: Real-time metric display
- **Alert System**: Critical load warnings
- **Auto-polling**: Updates every 5 seconds
- **Responsive Design**: Works on desktop and mobile

### Error Handling

- Centralized error middleware
- Graceful fallbacks for API failures
- Connection status indicators
- User-friendly error messages

## ⚙️ Configuration

### Backend Configuration (backend/utils/constants.js)

```javascript
{
  PORT: 5000,
  MONGODB_URI: 'mongodb://localhost:27017/monitoring-dashboard',
  ML_API_URL: 'http://localhost:8000',
  METRICS_COLLECTION_INTERVAL: 5000,  // 5 seconds
  POLLING_INTERVAL: 5000,
  CHART_DATA_LIMIT: 50,
  HISTORY_METRICS_LIMIT: 100,
}
```

### Frontend Configuration (frontend/src/utils/constants.js)

```javascript
{
  API_URL: 'http://localhost:5000',
  POLLING_INTERVAL: 5000,  // 5 seconds
  CHART_DATA_LIMIT: 50,
}
```

## 🗄️ MongoDB Schema

**Metric Collection**

```javascript
{
  _id: ObjectId,
  timestamp: Date,
  cpu: Number,           // 0-100
  memory: Number,        // 0-100
  diskRead: Number,      // I/O operations
  diskWrite: Number,     // I/O operations
  networkReceived: Number,
  networkTransmitted: Number,
  prediction: Number,    // 0 = normal, 1 = critical
  createdAt: Date,
  updatedAt: Date
}
```

## 🔧 Technologies Used

### Backend

- **Express.js** - Web framework
- **Mongoose** - MongoDB ODM
- **Axios** - HTTP client for ML API
- **node-cron** - Task scheduling
- **systeminformation** - System metrics collection
- **Morgan** - Request logging
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend

- **React 18** - UI library
- **Vite** - Build tool
- **Recharts** - Chart library
- **Axios** - HTTP client
- **Tailwind CSS** - Styling

## 📝 Development Tips

### Testing Metrics Collector

```bash
# Check backend health endpoint
curl http://localhost:5000/api/health

# Get latest metrics
curl http://localhost:5000/api/metrics/latest

# Get system status
curl http://localhost:5000/api/metrics/status

# Get chart data
curl http://localhost:5000/api/metrics/chart
```

### Testing ML Prediction Endpoint

```bash
curl -X POST http://localhost:5000/api/prediction/test \
  -H "Content-Type: application/json" \
  -d '{
    "cpu": 45.5,
    "memory": 60.2,
    "diskRead": 1024.5,
    "diskWrite": 512.3,
    "networkReceived": 1000000,
    "networkTransmitted": 500000
  }'
```

### Monitoring Logs

Backend logs include:

- Metrics collection status
- ML API calls and responses
- Database operations
- Request/response details (Morgan)

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env
- For MongoDB Atlas, ensure IP is whitelisted

### "ML API unavailable"

- Ensure FastAPI service is running on port 8000
- Check ML_API_URL in backend .env
- Server will gracefully continue with default predictions

### "Frontend can't connect to backend"

- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend .env
- Check CORS is enabled in backend

### No metrics appearing on dashboard

- Check backend `/api/health` endpoint
- Verify MongoDB connection
- Check browser console for errors
- Ensure metrics collection interval is running

## 📈 Production Deployment

### Backend (using PM2)

```bash
npm install -g pm2
pm2 start server.js --name "monitoring-dashboard"
pm2 save
```

### Frontend (build and serve)

```bash
npm run build
npm run preview
```

### Environment Variables

Always set proper values in production:

- Secure MongoDB URI with authentication
- Real ML API URL and endpoints
- Appropriate CORS origins
- Production-level error handling

## 📄 License

MIT

## 👨‍💻 Author

Created as part of innovative assignment

---

For detailed API documentation and advanced configuration, refer to individual file comments.
