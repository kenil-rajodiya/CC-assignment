# Complete Project Documentation

## Project Summary

Successfully created a **Cloud-Based Real-Time Monitoring Dashboard** using MERN stack with:

- ✅ Production-grade Node.js/Express backend
- ✅ MongoDB data persistence
- ✅ Real-time React dashboard
- ✅ ML prediction integration
- ✅ Automatic metrics collection (every 5 seconds)
- ✅ Alert system for critical loads
- ✅ Modular, maintainable architecture

---

## 📁 Complete File Structure

### Backend Files Created

**Configuration & Setup**

- `backend/.env` - Environment variables
- `backend/.env.example` - Example environment file
- `backend/.gitignore` - Git ignore rules
- `backend/package.json` - Dependencies and scripts
- `backend/README.md` - Backend documentation

**Core Application**

- `backend/server.js` - Application entry point
- `backend/app.js` - Express app configuration

**Configuration**

- `backend/config/db.js` - MongoDB connection setup

**Database**

- `backend/models/Metric.js` - MongoDB metric schema with validation

**API Endpoints**

- `backend/routes/metricsRoutes.js` - Metrics endpoints (GET)
- `backend/routes/predictionRoutes.js` - ML prediction endpoints
- `backend/controllers/metricsController.js` - Metrics business logic
- `backend/controllers/predictionController.js` - Prediction logic

**Business Logic**

- `backend/services/metricsService.js` - Metrics CRUD operations
- `backend/services/mlService.js` - ML API integration

**Background Jobs**

- `backend/jobs/metricsCollector.js` - Scheduled metrics collection (5 seconds)

**Middleware & Utilities**

- `backend/middlewares/errorMiddleware.js` - Error handling and 404
- `backend/utils/constants.js` - Configuration constants

### Frontend Files Created

**Configuration & Setup**

- `frontend/.env` - Environment variables
- `frontend/.env.example` - Example environment file
- `frontend/.gitignore` - Git ignore rules
- `frontend/package.json` - Dependencies and scripts
- `frontend/README.md` - Frontend documentation

**Core Application**

- `frontend/index.html` - HTML entry point
- `frontend/src/main.jsx` - React app initialization
- `frontend/src/App.jsx` - Main App component

**Styling & Build**

- `frontend/src/index.css` - Global styles with Tailwind
- `frontend/vite.config.js` - Vite configuration
- `frontend/tailwind.config.js` - Tailwind CSS configuration
- `frontend/postcss.config.js` - PostCSS configuration

**API Integration**

- `frontend/src/api/api.js` - Axios client and API endpoints

**State Management**

- `frontend/src/context/MetricsContext.jsx` - React Context for metrics
- `frontend/src/hooks/useMetrics.js` - Custom hook with polling logic

**Components**

- `frontend/src/components/Dashboard.jsx` - Main dashboard layout
- `frontend/src/components/MetricsChart.jsx` - Reusable chart component
- `frontend/src/components/StatusCard.jsx` - Metric status cards
- `frontend/src/components/AlertBanner.jsx` - Alert notifications

**Pages & Utils**

- `frontend/src/pages/Home.jsx` - Home page wrapper
- `frontend/src/utils/constants.js` - Frontend constants

**Documentation**

- `frontend/public/` - Public assets directory

### Project Root Files

- `README.md` - Complete project overview
- `SETUP.md` - Detailed setup guide
- `ARCHITECTURE.md` - This file

---

## 🏗️ Architecture Overview

### Backend Architecture

```
Request → CORS Middleware
         ↓
      Router
         ↓
    Controller (Validate input)
         ↓
    Service (Business logic)
         ↓
    MongooseSave/Query
         ↓
   MLService (If needed)
         ↓
   Response/Error Handler
```

### Frontend Architecture

```
React App
    ↓
MetricsProvider (Context)
    ↓
Dashboard Component
    ↓
useMetrics Hook (Polling + API)
    ↓
Axios API Client
    ↓
Backend Server
```

### Data Flow

```
System Metrics → MetricsCollector (5s interval)
                      ↓
                 MLService (Prediction)
                      ↓
                 MongoDB (Storage)
                      ↓
                Frontend Polling (5s)
                      ↓
                   Dashboard Update
```

---

## 🔧 Key Technologies

### Backend

| Technology        | Version | Purpose            |
| ----------------- | ------- | ------------------ |
| Node.js           | 16+     | Runtime            |
| Express.js        | 4.18+   | Web framework      |
| MongoDB           | Latest  | Database           |
| Mongoose          | 7.7+    | ODM                |
| Axios             | 1.6+    | HTTP client        |
| node-cron         | 3.0+    | Task scheduling    |
| systeminformation | 5.17+   | Metrics collection |
| Morgan            | 1.10+   | Logging            |
| CORS              | 2.8+    | Cross-origin       |
| dotenv            | 16.3+   | Config             |

### Frontend

| Technology   | Version | Purpose     |
| ------------ | ------- | ----------- |
| React        | 18.2+   | UI library  |
| Vite         | 5.0+    | Build tool  |
| Axios        | 1.6+    | HTTP client |
| Recharts     | 2.10+   | Charts      |
| Tailwind CSS | 3.3+    | Styling     |

---

## 📊 API Endpoints Detail

### Health Check (Public)

```
GET /api/health
Response:
{
  "success": true,
  "message": "Backend server is running",
  "timestamp": "2024-...",
  "metricsCollector": {
    "isRunning": true,
    "interval": "5000ms"
  }
}
```

### Metrics - Latest (Public)

```
GET /api/metrics/latest
Response:
{
  "success": true,
  "message": "Latest metrics retrieved successfully",
  "data": {
    "_id": "...",
    "timestamp": "2024-...",
    "cpu": 45.5,
    "memory": 60.2,
    "diskRead": 1024.5,
    "diskWrite": 512.3,
    "networkReceived": 1000000,
    "networkTransmitted": 500000,
    "prediction": 0
  }
}
```

### Metrics - History (Public)

```
GET /api/metrics/history?limit=100
Response: Array of last 100 metrics

### Metrics - Status (Public)
```

GET /api/metrics/status
Response:
{
"success": true,
"data": {
"status": "NORMAL",
"timestamp": "...",
"metrics": {
"cpu": 45.5,
"memory": 60.2,
...
},
"prediction": 0,
"alert": null // "⚠ High system load detected" if critical
}
}

```

### Metrics - Chart (Public)
```

GET /api/metrics/chart?limit=50
Response: Array of last 50 metrics (formatted for charts)

```

### Prediction - Test (POST)
```

POST /api/prediction/test
Content-Type: application/json

Request:
{
"cpu": 45.5,
"memory": 60.2,
"diskRead": 1024.5,
"diskWrite": 512.3,
"networkReceived": 1000000,
"networkTransmitted": 500000
}

Response:
{
"success": true,
"data": {
"prediction": 0 or 1,
"metrics": {...}
}
}

```

### Prediction - Health (Public)
```

GET /api/prediction/health
Response: ML API status and URL

````

---

## 🗄️ Database Schema

### Metric Collection

```javascript
{
  _id: ObjectId,                  // Auto-generated
  timestamp: Date,                // Set on creation
  cpu: Number,                    // 0-100 (%)
  memory: Number,                 // 0-100 (%)
  diskRead: Number,               // I/O operations/sec
  diskWrite: Number,              // I/O operations/sec
  networkReceived: Number,        // Bytes
  networkTransmitted: Number,     // Bytes
  prediction: Number,             // 0 (normal) or 1 (critical)
  createdAt: Date,                // Auto-generated
  updatedAt: Date                 // Auto-generated
}
````

**Indexes:**

- `timestamp: -1` - For fast queries
- `prediction: 1` - For filtering alerts

---

## ⚙️ Configuration Files

### Backend Configuration (`backend/utils/constants.js`)

```javascript
{
  // Server Settings
  PORT: 5000,
  NODE_ENV: 'development',

  // Database
  MONGODB_URI: 'mongodb://localhost:27017/...',

  // ML Service
  ML_API_URL: 'http://localhost:8000',
  ML_PREDICT_ENDPOINT: '/predict',

  // Timing
  METRICS_COLLECTION_INTERVAL: 5000,
  POLLING_INTERVAL: 5000,

  // Data Limits
  LATEST_METRICS_LIMIT: 1,
  HISTORY_METRICS_LIMIT: 100,
  CHART_DATA_LIMIT: 50,

  // Alerts
  ALERT_THRESHOLD: 1,
  CRITICAL_PREDICTION: 1
}
```

### Frontend Configuration (`frontend/src/utils/constants.js`)

```javascript
{
  // API Configuration
  API_URL: 'http://localhost:5000',
  API_ENDPOINTS: { /* all endpoints */ },

  // Polling
  POLLING_INTERVAL: 5000,

  // Chart Settings
  CHART_DATA_LIMIT: 50,
  CHART_COLORS: { /* colors for each metric */ },

  // Alerts
  CRITICAL_PREDICTION: 1,
  ALERT_THRESHOLD: 1
}
```

---

## 🚀 Startup Sequence

### Backend Startup (`backend/server.js`)

1. Import all dependencies
2. Connect to MongoDB
3. Start metrics collector
   - Collect metrics immediately
   - Call ML API for prediction
   - Save to database
   - Schedule to repeat every 5 seconds
4. Start Express server on PORT
5. Ready to accept requests

### Frontend Startup (`frontend/src/main.jsx`)

1. Initialize React app
2. Mount MetricsProvider (Context)
3. Render Dashboard component
4. useMetrics hook:
   - Fetch initial data
   - Set up polling (5s interval)
   - Update state on responses
5. Dashboard renders charts and cards
6. Auto-updates every 5 seconds

---

## 🔌 Integration Points

### ML API Integration

**File:** `backend/services/mlService.js`

- HTTP client configured with 5-second timeout
- Automatic error handling
- Fallback to prediction = 0 if API unavailable
- Formats metrics to ML API schema

**ML API Expected Input:**

```json
{
  "CPU": number,
  "Memory": number,
  "Disk_read": number,
  "Disk_write": number,
  "Network_recieved": number,
  "Network_transmitted": number
}
```

**ML API Expected Output:**

```json
{
  "Prediction": 0 or 1
}
```

### Metrics Collection

**File:** `backend/jobs/metricsCollector.js`

Uses `systeminformation` package to collect:

- CPU load percentage
- Memory usage percentage
- Disk I/O throughput
- Network statistics

Runs via node-cron: `*/5 * * * * *` (every 5 seconds)

---

## 🎯 Development Guide

### Adding a New Metric

1. **Collect it:**
   - Add to `metricsCollector.js`
   - Use systeminformation APIs

2. **Store it:**
   - Add field to `Metric.js` schema
   - Add to metric in `metricsService.js`

3. **Expose it:**
   - Pass to ML API in `mlService.js`
   - Add to API response in controller

4. **Display it:**
   - Add chart in `Dashboard.jsx`
   - Update constants for colors

### Adding New API Endpoint

1. **Create handler:**

   ```javascript
   // controller/...Controller.js
   export const myHandler = async (req, res, next) => { ... }
   ```

2. **Add route:**

   ```javascript
   // routes/...Routes.js
   router.get("/endpoint", myHandler);
   ```

3. **Use in frontend:**
   ```javascript
   // api/api.js
   getMyData: () => api.get("/api/...");
   ```

---

## 📈 Performance Considerations

### Backend

- **Indexes:** Metrics collection indexed on timestamp and prediction
- **Polling:** 5-second interval with cron (CPU efficient)
- **ML API:** Async/await with 5s timeout
- **Database:** Connection pooling via Mongoose

### Frontend

- **Polling:** 5-second fetch cycle with Promise.all
- **Charts:** Limited to last 50 records (performance)
- **Re-renders:** Context API for efficient updates
- **Charts:** Recharts with optional animations

---

## 🔒 Security Considerations

### Current Security

- CORS enabled for development
- Error messages don't expose internals
- Environment variables for secrets
- No authentication (development mode)

### For Production

- Add API authentication (JWT or API keys)
- Restrict CORS to specific origins
- Use HTTPS/TLS
- Implement rate limiting
- Add request validation
- Sanitize user inputs
- Use secure MongoDB URI
- Enable database authentication

---

## 🐛 Common Issues & Solutions

| Issue                  | Cause                          | Solution                       |
| ---------------------- | ------------------------------ | ------------------------------ |
| No data on dashboard   | MongoDB not running            | Start MongoDB service          |
| ML API error           | FastAPI not running            | Start Python ML service        |
| Port 5000 in use       | Another app using port         | Change PORT in .env            |
| No CORS error          | Frontend-backend host mismatch | Verify URLs in .env files      |
| Metrics not collecting | Job failed                     | Check MongoDB connection       |
| Charts not showing     | Data format issue              | Check API response in DevTools |

---

## 📦 Building for Production

### Backend Build

```bash
cd backend
npm install --production
npm run start  # Instead of npm run dev
```

Use PM2 for process management:

```bash
pm2 start server.js -i max
```

### Frontend Build

```bash
cd frontend
npm run build  # Creates dist/
npm run preview  # Test build locally
```

Deploy `dist/` folder to web server (Nginx, Apache, Vercel, etc.)

---

## 🔄 Continuous Improvement

### Potential Enhancements

1. **Database**
   - Add data retention policy
   - Archive old metrics
   - Add aggregations

2. **Metrics**
   - Process-level metrics
   - Application-level metrics
   - Custom metrics

3. **UI**
   - Dark mode
   - Custom time ranges
   - Export reports
   - Historical comparisons

4. **ML**
   - Multiple prediction models
   - Confidence scores
   - Training data integration

5. **API**
   - GraphQL support
   - WebSocket for real-time
   - Batch operations
   - Advanced filtering

---

## 📝 File-by-File Summary

### Backend Files

**server.js (20 lines)**

- Entry point
- Connects DB, starts collector, starts server

**app.js (45 lines)**

- Express app setup
- Routes, middleware, error handlers

**config/db.js (17 lines)**

- MongoDB connection function

**models/Metric.js (59 lines)**

- Metric schema with indexes

**services/mlService.js (66 lines)**

- ML API integration
- Error handling

**services/metricsService.js (116 lines)**

- CRUD operations
- Health summary
- Chart data formatting

**controllers/metricsController.js (66 lines)**

- Route handlers
- Response formatting

**controllers/predictionController.js (47 lines)**

- ML testing endpoint
- ML health check

**routes/metricsRoutes.js (23 lines)**

- 4 metrics endpoints

**routes/predictionRoutes.js (17 lines)**

- 2 prediction endpoints

**jobs/metricsCollector.js (119 lines)**

- Metrics collection
- Cron scheduling
- Process coordination

**middlewares/errorMiddleware.js (33 lines)**

- Error handling
- 404 handling

**utils/constants.js (41 lines)**

- All configuration

### Frontend Files

**App.jsx (11 lines)**

- App wrapper with context

**src/main.jsx (8 lines)**

- React DOM mount

**src/api/api.js (27 lines)**

- Axios client
- All API endpoints

**src/context/MetricsContext.jsx (63 lines)**

- Context setup
- State management

**src/hooks/useMetrics.js (108 lines)**

- Polling logic
- API calls
- Error handling

**src/components/Dashboard.jsx (202 lines)**

- Main UI
- Status cards
- Charts

**src/components/MetricsChart.jsx (90 lines)**

- Reusable chart
- Line and area types

**src/components/StatusCard.jsx (43 lines)**

- Status display
- Color variants

**src/components/AlertBanner.jsx (31 lines)**

- Alert notification

**src/pages/Home.jsx (11 lines)**

- Page wrapper

---

## ✅ Quality Checklist

- ✅ All files created
- ✅ Modular architecture
- ✅ Error handling implemented
- ✅ Environment variables configured
- ✅ Documentation complete
- ✅ Configuration centralized
- ✅ CORS enabled
- ✅ Logging with Morgan
- ✅ Custom hookimplemented
- ✅ Context API integrated
- ✅ Real-time polling
- ✅ Alert system
- ✅ Responsive design
- ✅ Chart components
- ✅ API integration
- ✅ MongoDB integration
- ✅ ML service integration
- ✅ Metrics collector
- ✅ Health endpoints
- ✅ README files

---

**Project Status: ✅ COMPLETE**

All files have been generated following production-grade standards with clean architecture, proper error handling, and comprehensive documentation.
