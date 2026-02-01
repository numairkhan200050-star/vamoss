import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'https://numairkhan200050-star.github.io/vamoss/', // 🔴 MUST MATCH REPO NAME
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
})
