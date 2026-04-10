import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Synapse/' : '/',
  esbuild: {
    loader: 'jsx'
  },
  server: {
    port: 3000
  }
});