import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  // Load env variables from the repository root (.env) instead of frontend/.env
  envDir: "../",
  plugins: [react()],
  server: {
    port: 3000,
    host: "0.0.0.0",
  },
});
