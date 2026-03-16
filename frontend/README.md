# Frontend Dashboard

React-based real-time monitoring dashboard using Vite and Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

Dashboard will run on `http://localhost:3000`

## Environment Variables

Create `.env` file:

```
VITE_API_URL=http://localhost:5000
VITE_POLLING_INTERVAL=5000
```

## Project Structure

- **src/api/** - API client and endpoints
- **src/components/** - Reusable React components
- **src/hooks/** - Custom React hooks
- **src/pages/** - Page components
- **src/context/** - React Context API setup
- **src/utils/** - Utilities and constants

## Components

### Dashboard

Main component that displays all metrics and charts

### MetricsChart

Reusable chart component for displaying time-series data using Recharts

### StatusCard

Displays individual metrics in card format with status colors

### AlertBanner

Shows critical system alert warnings

## Custom Hooks

### useMetrics

Handles:

- API calls to fetch metrics data
- Real-time polling (every 5 seconds)
- Context management
- Connection status
- Error handling

## Features

- Real-time data updates every 5 seconds
- Multiple chart types (line, area)
- Status cards with color indicators
- Alert system for critical load
- Auto-connecting status indicator
- Responsive design (mobile-friendly)
- Error handling and retry

## Build for Production

```bash
npm run build
npm run preview
```

## Dependencies

- react - UI library
- react-dom - React DOM
- axios - HTTP client
- recharts - Charting library
- tailwindcss - Styling framework
- vite - Build tool

## Configuration

All API endpoints and polling intervals can be configured in `src/utils/constants.js`

- Change `VITE_API_URL` to point to your backend
- Adjust `VITE_POLLING_INTERVAL` for different update frequencies
- Customize chart colors in `CHART_COLORS`

## Customization

### Adding New Charts

1. Add new metric data key to constants
2. Create new MetricsChart instance with desired metrics array
3. Style with Tailwind classes

### Changing Update Frequency

Edit `VITE_POLLING_INTERVAL` in `.env` or constants file

### Modifying Alert Logic

Edit AlertBanner component or add custom logic in Dashboard component

## Notes

- Charts display last 50 data points by default
- Status cards update in real-time
- Connection status shows in footer
- All errors have retry functionality
