import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/ts-api': {
        target: 'https://se-thoughtspot-cloud.thoughtspot.cloud',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ts-api/, ''),
        secure: true,
        cookieDomainRewrite: 'localhost',
      }
    }
  }
})
