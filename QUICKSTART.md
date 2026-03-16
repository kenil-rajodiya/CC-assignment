# 🚀 Quick Start Guide

Complete the project in 3 simple steps!

## Step 1: Install Dependencies (2 minutes)

### Backend Dependencies

```bash
cd backend
npm install
```

### Frontend Dependencies

```bash
cd frontend
npm install
```

## Step 2: Start Services (3 commands)

Open 4 terminal windows and run:

### Terminal 1: MongoDB

```bash
mongod
# Local MongoDB database
```

### Terminal 2: Backend

```bash
cd backend
npm run dev
# Backend running on http://localhost:5000
```

### Terminal 3: Frontend

```bash
cd frontend
npm run dev
# Frontend running on http://localhost:3000
```

### Terminal 4: Python ML Service

```bash
# Start your FastAPI ML service on port 8000
python main.py
```

## Step 3: Open Dashboard

Visit: **http://localhost:3000**

✅ **Done!** You should see:

- Real-time CPU, Memory, Disk, Network charts
- Status cards with current metrics
- Auto-updating every 5 seconds
- Green "Connected" indicator

---

## 📋 Quick Verification

### Check Backend Health

```bash
curl http://localhost:5000/api/health
```

### Check Latest Metrics

```bash
curl http://localhost:5000/api/metrics/latest
```

### Check ML API

```bash
curl http://localhost:5000/api/prediction/health
```

---

## 🐛 Quick Troubleshooting

| Problem              | Fix                                            |
| -------------------- | ---------------------------------------------- |
| Node modules error   | Delete `node_modules`, run `npm install` again |
| MongoDB error        | Install MongoDB or use MongoDB Atlas           |
| Port 5000 in use     | `lsof -i :5000` to find process, kill it       |
| Port 3000 in use     | Change frontend port in `vite.config.js`       |
| ML API error         | Ensure FastAPI is running on port 8000         |
| No data on dashboard | Wait 5-10 seconds, refresh page (F5)           |

---

## 📂 Important Directories

```
backend/
├── controllers/   ← API logic
├── routes/        ← URL endpoints
├── services/      ← Business logic
├── models/        ← Database schema
├── jobs/          ← Metrics collector
└── server.js      ← Start here

frontend/
├── src/
│   ├── components/ ← React components
│   ├── hooks/      ← useMetrics hook
│   ├── api/        ← Backend calls
│   └── App.jsx     ← Start here
└── index.html      ← HTML entry
```

---

## 🔧 Configuration Quick Reference

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/monitoring-dashboard
ML_API_URL=http://localhost:8000
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
VITE_POLLING_INTERVAL=5000
```

---

## 📊 What You Get

✅ Real-time metrics collection (every 5 seconds)
✅ ML prediction integration
✅ MongoDB data storage
✅ Beautiful React dashboard
✅ 4 interactive charts
✅ Status cards with alerts
✅ Responsive design
✅ Auto-reconnection
✅ Full API
✅ Production-ready code

---

## 🎉 Next Steps

1. **Customize**: Modify colors, add metrics, change polling interval
2. **Deploy**: Use PM2 for backend, Vercel/Netlify for frontend
3. **Extend**: Add authentication, historical reports, more charts
4. **Monitor**: Watch metrics in real-time, set up alerts

---

## 📚 Full Documentation

- [README.md](README.md) - Complete overview
- [SETUP.md](SETUP.md) - Detailed setup guide
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [backend/README.md](backend/README.md) - Backend details
- [frontend/README.md](frontend/README.md) - Frontend details

---

## 💬 Quick Help

**Q: Where do I change the polling interval?**
A: `frontend/src/utils/constants.js` → `POLLING_INTERVAL`

**Q: How do I add a new metric?**
A: Add to `backend/jobs/metricsCollector.js` → `Metric.js` model → Dashboard component

**Q: Can I use MongoDB Atlas?**
A: Yes! Update `MONGODB_URI` in `backend/.env`

**Q: How do I deploy this?**
A: See [SETUP.md](SETUP.md) Production Deployment section

---

**Remember:** Ensure MongoDB, Backend, and Frontend are all running! 🚀
