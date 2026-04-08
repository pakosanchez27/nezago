import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    // 👇 Agregamos esta línea para permitir dominios externos dinámicos como ngrok
    allowedHosts: true,
    watch: {
      usePolling: true,
    }
  },
})
