# Setup & Installation Guide

## Complete Step-by-Step Setup

## Prerequisites

Before starting, ensure you have:

1. **Node.js 16+**

   ```bash
   node --version  # Should be v16.0.0 or higher
   npm --version   # Should be 7.0.0 or higher
   ```

2. **MongoDB**
   - Local: Download from https://www.mongodb.com/try/download/community
   - Cloud: MongoDB Atlas at https://www.mongodb.com/cloud/atlas

3. **Python FastAPI ML Service** running on `http://localhost:8000`
   - The ML prediction API should be running before starting the backend

4. **Git** (optional)

## Installation Steps

### Step 1: Navigate to Project Root

```bash
cd innovative_assignment
```

### Step 2: Setup Backend

#### Install Dependencies

```bash
cd backend
npm install
```

Expected packages installed (check `npm list`):

- express
- mongoose
- axios
- node-cron
- systeminformation
- morgan
- cors
- dotenv
- nodemon (dev)

#### Configure Environment

The `.env` file is already created with default values:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/monitoring-dashboard
ML_API_URL=http://localhost:8000
```

**For MongoDB Atlas**, update MONGODB_URI:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/monitoring-dashboard
```

**For Custom ML API URL**, update:

```
ML_API_URL=http://your-ml-api-url:port
```

#### Verify Backend Setup

```bash
npm run dev
```

Wait for output:

```
╔════════════════════════════════════════════╗
║  Monitoring Dashboard Backend              ║
║  Server running on port 5000                    ║
║  Environment: development             ║
║  MongoDB: Connected                         ║
║  Metrics Collector: Running                 ║
╚════════════════════════════════════════════╝
```

✅ Backend is ready! Keep terminal open.

### Step 3: Setup Frontend

#### In a New Terminal Window

```bash
cd frontend
npm install
```

Expected packages:

- react
- react-dom
- recharts
- axios
- tailwindcss
- vite
- @vitejs/plugin-react

#### Configure Environment

The `.env` file is already created:

```
VITE_API_URL=http://localhost:5000
VITE_POLLING_INTERVAL=5000
```

**If your backend runs on a different port**, update:

```
VITE_API_URL=http://localhost:YOUR_PORT
```

#### Start Frontend Development Server

```bash
npm run dev
```

You should see:

```
  VITE v5.0.8  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  Press h to show help
```

✅ Frontend is ready and running!

### Step 4: Verify Everything is Connected

#### Test Backend Health

In another terminal or browser:

```bash
curl http://localhost:5000/api/health
```

Expected response:

```json
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

#### Open Dashboard

Visit: **http://localhost:3000**

You should see:

- Dashboard with 4 status cards (CPU, Memory, Disk Read, Network)
- Real-time charts updating every 5 seconds
- Green "Connected" indicator in bottom right
- No errors in browser console

#### Test ML Integration

Check if ML API is reachable:

```bash
curl http://localhost:5000/api/prediction/health
```

Expected response:

```json
{
  "success": true,
  "message": "ML API is healthy"
}
```

### Step 5: Monitoring the System

#### Backend Terminal

- Watch for "Metrics collected" messages every 5 seconds
- Check for any errors in metric collection or ML API calls

#### Frontend Browser

- Dashboard should update every 5 seconds
- No console errors
- All charts should show data

#### MongoDB Terminal

If needed, check stored metrics:

```bash
mongo mongodb://localhost:27017
use monitoring-dashboard
db.metrics.find().limit(1)
```

## Troubleshooting

### Issue: MongoDB Connection Failed

**Solution:**

```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (if local)
mongod

# Or use MongoDB Atlas connection string in .env
```

### Issue: ML API Connection Error

**Solution:**

```bash
# Ensure Python FastAPI is running
python main.py  # or your ML service command

# If on different host/port, update backend/.env:
ML_API_URL=http://your-ml-host:port
```

### Issue: Frontend Can't Connect to Backend

**Solution:**

```bash
# Restart backend
cd backend
npm run dev

# Update frontend/.env if backend is on different port:
VITE_API_URL=http://localhost:YOUR_PORT

# Restart frontend with new env
cd frontend
npm run dev
```

### Issue: No Data on Dashboard

**Solution:**

1. Check backend is running: `curl http://localhost:5000/api/health`
2. Check metrics are being collected: `curl http://localhost:5000/api/metrics/latest`
3. Check browser console for errors (F12)
4. Wait 5-10 seconds for first data collection
5. Check MongoDB has data: `db.metrics.count()`

### Issue: Port Already in Use

**Solution:**

```bash
# If port 5000 is used, change in backend/.env:
PORT=5001

# If port 3000 is used, change frontend vite.config.js:
server: {
  port: 3001,
}
```

## Quick Start (After First Setup)

After initial setup, future starts are simple:

**Terminal 1 - MongoDB**

```bash
mongod
```

**Terminal 2 - Backend**

```bash
cd backend
npm run dev
```

**Terminal 3 - Frontend**

```bash
cd frontend
npm run dev
```

**Terminal 4 - Python ML API** (if not always running)

```bash
python main.py
```

Open browser: **http://localhost:3000**

## Development Workflow

### Making Backend Changes

1. Edit backend files
2. Nodemon will auto-restart (watch enabled)
3. Test with: `curl http://localhost:5000/api/...`

### Making Frontend Changes

1. Edit frontend files
2. Vite will hot-reload automatically
3. See changes instantly in browser (F5 if needed)

### Adding New Metrics

1. Update `systeminformation` call in `backend/jobs/metricsCollector.js`
2. Add field to MongoDB model in `backend/models/Metric.js`
3. Update ML API payload in `backend/services/mlService.js`
4. Add chart in React Dashboard component

## Database Backup

### Export MongoDB Data

```bash
mongoexport --db monitoring-dashboard --collection metrics --out metrics_backup.json
```

### Restore MongoDB Data

```bash
mongoimport --db monitoring-dashboard --collection metrics --file metrics_backup.json
```

## Production Deployment Notes

Before deploying to production:

1. **Environment Variables**: Use secure values
2. **MongoDB**: Use MongoDB Atlas with authentication
3. **CORS**: Update allowed origins in `backend/app.js`
4. **Error Logging**: Implement proper logging service
5. **SSL/TLS**: Use HTTPS for API endpoints
6. **Rate Limiting**: Add rate limiting middleware
7. **Authentication**: Consider API key or JWT auth

## Support

For issues or questions:

1. Check troubleshooting section above
2. Check server logs (Terminal output)
3. Check browser console (DevTools - F12)
4. Verify all services are running
5. Check environment variables are correct

---

**Setup Complete!** Your monitoring dashboard is now ready to use. 🎉
