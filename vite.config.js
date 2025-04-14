import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures all JS/CSS are referenced as ./assets/... 
  build: {
    outDir: './build',
    emptyOutDir: true,
  },
})
