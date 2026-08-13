/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({mode}) => {

  const __fileName = fileURLToPath(import.meta.url)
  const __dirname = dirname(__fileName)
  const env = loadEnv(mode, __dirname, '')
  const proxyTarget = env.VITE_DEV_PROXY_TARGET || 'http://localhost:8000'

  return {
    plugins: [
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),  
      },
    },
    server: {
      port: 5174,
      strictPort: true,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{ts,tsx}'],
      exclude: ['src/test/integration/**'],
      css: true,
    },
  }
})
