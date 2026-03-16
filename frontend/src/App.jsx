import React from "react";
import Home from "./pages/Home.jsx";
import { MetricsProvider } from "./context/MetricsContext.jsx";

function App() {
  return (
    <MetricsProvider>
      <Home />
    </MetricsProvider>
  );
}

export default App;
