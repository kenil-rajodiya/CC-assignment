# Backend Server

Express.js server for the Monitoring Dashboard

## Quick Start

```bash
npm install
npm run dev
```

Server will run on `http://localhost:5000`

## Environment Variables

Create `.env` file:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/monitoring-dashboard
ML_API_URL=http://localhost:8000
LOG_LEVEL=debug
POLLING_INTERVAL=5000
ALERT_THRESHOLD=1
```

## Project Structure

- **config/** - Database configuration
- **controllers/** - Route handlers
- **models/** - MongoDB schemas
- **routes/** - API routes
- **services/** - Business logic
- **utils/** - Utilities and constants
- **middlewares/** - Express middleware
- **jobs/** - Background jobs (metrics collector)

## API Routes

All endpoints are prefixed with `/api`

### Health & Status

- `GET /api/health` - Server health status

### Metrics

- `GET /api/metrics/latest` - Latest metrics
- `GET /api/metrics/history` - Metrics history
- `GET /api/metrics/status` - System health
- `GET /api/metrics/chart` - Chart data

### Predictions

- `POST /api/prediction/test` - Test ML prediction
- `GET /api/prediction/health` - ML API health

## Key Features

- Real-time metrics collection every 5 seconds
- ML API integration for system predictions
- MongoDB for data persistence
- Error handling and logging
- CORS support
- Health check endpoints

## Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- axios - HTTP client
- node-cron - Job scheduling
- systeminformation - System metrics
- morgan - Request logging
- cors - CORS middleware
- dotenv - Environment variables

## Notes

- Metrics are collected automatically every 5 seconds
- ML predictions are called for each metric collection
- Database connection is established on server startup
- Metrics collector starts automatically on server startup
