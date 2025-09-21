import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
  server: { // Add the server configuration here
    proxy: { // Configure proxy rules
      '/api': { // Proxy requests starting with /api
        target: 'http://localhost:5000', // Your Flask backend address
        changeOrigin: true, // Important for some CORS issues
      },
    }
  }
})
