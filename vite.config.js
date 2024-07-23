import { fileURLToPath } from "url";
import path from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      src: path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
  },
});
