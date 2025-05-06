import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'
import { fileURLToPath } from 'url'

const app = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    svgr(),
  ],
  css: {
    modules: {
      generateScopedName: '[name]__[local]___[hash:base64:5]',
      localsConvention: 'camelCase',
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 4000,
  },
  resolve: {
    alias: {
      "_": path.resolve(app, "./src"),
      "_services": path.resolve(app, "./src/services"),
      "_assets": path.resolve(app, "./src/assets"),
      "_stores": path.resolve(app, "./src/stores"),
      "_components": path.resolve(app, "./src/components"),
      "_pages": path.resolve(app, "./src/pages"),
      "_contexts": path.resolve(app, "./src/contexts"),
    }
  }
})
