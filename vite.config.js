import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, "");
  const baseUrl = env.VITE_BASE_URL || "";

  let host = "localhost";
  let port = 5173;
  let origin = undefined;
  let base = "/";

  try {
    const url = new URL(baseUrl);
    host = url.hostname;
    port = Number(url.port) || (url.protocol === "https:" ? 443 : 80);
    origin = url.origin;
    base = url.pathname.replace(/\/$/, "") + "/" || "/";
  } catch {
    // fall back to defaults when VITE_BASE_URL is missing or invalid
  }

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      host,
      port,
      strictPort: true,
      origin,
      watch: {
        usePolling: true,
      },
    },
    preview: {
      host,
      port,
    },
  };
});