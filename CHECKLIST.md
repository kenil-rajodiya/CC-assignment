# ✅ Pre-Flight Checklist

Use this checklist to verify your setup before starting the application.

## Environment Setup

### Prerequisites

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm 7+ installed (`npm --version`)
- [ ] MongoDB installed or Atlas account created
- [ ] Python FastAPI service available
- [ ] Git installed (optional)

### Backend Setup

- [ ] `backend/` directory exists
- [ ] `backend/package.json` exists
- [ ] `backend/node_modules/` exists (run `npm install`)
- [ ] `backend/.env` file created with correct values
- [ ] MongoDB connection string verified in `.env`
- [ ] ML API URL verified in `.env`

### Frontend Setup

- [ ] `frontend/` directory exists
- [ ] `frontend/package.json` exists
- [ ] `frontend/node_modules/` exists (run `npm install`)
- [ ] `frontend/.env` file created with correct values
- [ ] Backend URL matches `VITE_API_URL` in `.env`

---

## Backend Verification

### Core Files Present

- [ ] `backend/server.js` exists
- [ ] `backend/app.js` exists
- [ ] `backend/config/db.js` exists
- [ ] `backend/models/Metric.js` exists
- [ ] `backend/jobs/metricsCollector.js` exists

### Services

- [ ] `backend/services/mlService.js` exists
- [ ] `backend/services/metricsService.js` exists

### Routes & Controllers

- [ ] `backend/routes/metricsRoutes.js` exists
- [ ] `backend/routes/predictionRoutes.js` exists
- [ ] `backend/controllers/metricsController.js` exists
- [ ] `backend/controllers/predictionController.js` exists

### Dependencies Installed

- [ ] express (`npm list express`)
- [ ] mongoose (`npm list mongoose`)
- [ ] axios (`npm list axios`)
- [ ] node-cron (`npm list node-cron`)
- [ ] systeminformation (`npm list systeminformation`)

---

## Frontend Verification

### Core Files Present

- [ ] `frontend/src/main.jsx` exists
- [ ] `frontend/src/App.jsx` exists
- [ ] `frontend/index.html` exists
- [ ] `frontend/vite.config.js` exists
- [ ] `frontend/tailwind.config.js` exists

### Components

- [ ] `frontend/src/components/Dashboard.jsx` exists
- [ ] `frontend/src/components/MetricsChart.jsx` exists
- [ ] `frontend/src/components/StatusCard.jsx` exists
- [ ] `frontend/src/components/AlertBanner.jsx` exists

### Hooks & Context

- [ ] `frontend/src/hooks/useMetrics.js` exists
- [ ] `frontend/src/context/MetricsContext.jsx` exists

### API & Utils

- [ ] `frontend/src/api/api.js` exists
- [ ] `frontend/src/utils/constants.js` exists

### Dependencies Installed

- [ ] react (`npm list react`)
- [ ] axios (`npm list axios`)
- [ ] recharts (`npm list recharts`)
- [ ] tailwindcss (`npm list tailwindcss`)
- [ ] vite (`npm list vite`)

---

## Service Verification

### MongoDB

- [ ] MongoDB service started
  ```bash
  mongod
  # OR ensure MongoDB Atlas is accessible
  ```
- [ ] Test connection:
  ```bash
  mongo mongodb://localhost:27017/monitoring-dashboard
  # Should show > prompt
  ```

### Backend

- [ ] Backend starts without errors:
  ```bash
  cd backend && npm run dev
  # Should show server running on port 5000
  ```
- [ ] Health endpoint responds:
  ```bash
  curl http://localhost:5000/api/health
  # Should return JSON with success: true
  ```

### Frontend

- [ ] Frontend starts without errors:
  ```bash
  cd frontend && npm run dev
  # Should show "Local: http://localhost:3000"
  ```
- [ ] Dashboard loads in browser:
  - Visit http://localhost:3000
  - Should see dashboard layout

### ML API

- [ ] ML API service is running on port 8000
- [ ] Health endpoint:
  ```bash
  curl http://localhost:5000/api/prediction/health
  # Should show ML API status
  ```

---

## Connectivity Verification

### Backend to MongoDB

- [ ] Latest metrics endpoint:
  ```bash
  curl http://localhost:5000/api/metrics/latest
  # Should return data (may be empty initially)
  ```

### Backend to ML API

- [ ] Prediction health:
  ```bash
  curl http://localhost:5000/api/prediction/health
  # Should show ML API is healthy
  ```

### Frontend to Backend

- [ ] Open browser console (F12)
- [ ] Dashboard should load with no CORS errors
- [ ] Metrics should update every 5 seconds
- [ ] Connection indicator should be green

---

## Data Verification

### Metrics Collection

- [ ] Wait 5 seconds for first metrics
- [ ] Check MongoDB:
  ```bash
  mongo mongodb://localhost:27017/monitoring-dashboard
  use monitoring-dashboard
  db.metrics.count()
  # Should show > 0
  ```

### Dashboard Display

- [ ] Status cards show values
  - [ ] CPU percentage
  - [ ] Memory percentage
  - [ ] Disk Read I/O
  - [ ] Network Input
- [ ] Charts display data
  - [ ] CPU chart shows line
  - [ ] Memory chart shows area
  - [ ] Network chart shows lines
  - [ ] Disk chart shows area
- [ ] Last update time displays correctly
- [ ] Connection indicator shows green

---

## Error Handling Verification

### Backend Errors

- [ ] Gracefully handles missing MongoDB
  - Should log connection error
  - Process should exit cleanly
- [ ] Handles ML API unavailable
  - Should log warning
  - Should continue with prediction = 0
- [ ] No console errors on startup

### Frontend Errors

- [ ] Handles backend unavailable
  - Shows connection error message
  - Has retry button
- [ ] Handles missing data
  - Shows "No data available"
  - No console errors
- [ ] Graceful degradation
  - Charts with no data show placeholder
  - Status cards show "0" values

---

## Configuration Verification

### Backend `.env`

```
NODE_ENV=development          ☐ Set correctly
PORT=5000                     ☐ Correct port
MONGODB_URI=...               ☐ Valid connection string
ML_API_URL=http://localhost:8000  ☐ Correct URL
```

### Frontend `.env`

```
VITE_API_URL=http://localhost:5000  ☐ Correct backend URL
VITE_POLLING_INTERVAL=5000          ☐ Correct interval
```

---

## Performance Baseline

Record these on first successful run:

- [ ] Backend startup time: \_\_\_\_ seconds
- [ ] First metrics collection time: \_\_\_\_ seconds
- [ ] Dashboard load time: \_\_\_\_ seconds
- [ ] Dashboard update responsiveness: \_\_\_\_ ms
- [ ] Memory usage:
  - [ ] Backend: ~\_\_\_\_ MB
  - [ ] Frontend: ~\_\_\_\_ MB
- [ ] CPU usage while idle: ~\_\_\_\_%

---

## Documentation Verification

- [ ] README.md is readable and helpful ☐
- [ ] SETUP.md covers your scenario ☐
- [ ] ARCHITECTURE.md is comprehensive ☐
- [ ] QUICKSTART.md is quick ☐
- [ ] backend/README.md explains backend ☐
- [ ] frontend/README.md explains frontend ☐

---

## Final Checklist

Before declaring success:

- [ ] All services running without errors
- [ ] Dashboard displaying real-time data
- [ ] Metrics updating every 5 seconds
- [ ] No console errors (DevTools F12)
- [ ] MongoDB has metrics data
- [ ] Status cards showing correct values
- [ ] Charts displaying data points
- [ ] Connection indicator green
- [ ] All documentation readable
- [ ] Configuration is customizable

---

## 🎉 Setup Complete!

If all boxes are checked, your monitoring dashboard is ready to use!

## Troubleshooting Failed Items

For any failed items:

1. See the **Troubleshooting** section in [SETUP.md](SETUP.md)
2. Check the **Common Issues** in [ARCHITECTURE.md](ARCHITECTURE.md)
3. Review error messages in terminal and browser console
4. Verify service status with health endpoints
5. Check .env file values match running services

---

## Next: Custom Configuration

Once verified, customize your deployment:

- [ ] Change polling interval in frontend/.env
- [ ] Modify chart colors in frontend/src/utils/constants.js
- [ ] Add new metrics in backend/jobs/metricsCollector.js
- [ ] Update dashboard layout in frontend/src/components/Dashboard.jsx
- [ ] Adjust alert thresholds in backend/utils/constants.js

---

**Last Checked:** ****\_\_\_\_****  
**Checked By:** ****\_\_\_\_****  
**Status:** ✅ READY / ❌ ISSUES

---

For support, check the documentation files or review the code comments.
