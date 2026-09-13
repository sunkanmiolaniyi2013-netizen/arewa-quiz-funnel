import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: true,
    host: '0.0.0.0'
  },
  preview: {
    allowedHosts: true,
    host: '0.0.0.0'
  }
})
