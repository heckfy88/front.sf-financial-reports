import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const app = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
  },
  resolve: {
    alias: {
      "_": path.resolve(app, "./src"),
      "_assets": path.resolve(app, "./src/assets"),
      "_components": path.resolve(app, "./src/components"),
      "_pages": path.resolve(app, "./src/pages"),
    }
  }
})
