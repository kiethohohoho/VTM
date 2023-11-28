/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import postcssNested from 'postcss-nested';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import checker from 'vite-plugin-checker';

const buildInfoPlugin = require('./plugin/buildInfo');
const addVersionTime = require('./plugin/versionTime');
const version = process.env.npm_package_version;
const name = process.env.npm_package_name;

export default defineConfig({
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  css: {
    postcss: { plugins: [postcssNested()] },
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: path.join(__dirname, 'dist'),
    rollupOptions: {
      output: {
        esModule: true,
        validate: true,
      },
      cache: true,
    },
    manifest: true,
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
  },

  plugins: [
    react(),
    checker({
      typescript: true,
    }),
    splitVendorChunkPlugin(),
    addVersionTime(version),
    buildInfoPlugin(version, name),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: path.resolve(__dirname, '/vitest.setup.ts'),
    coverage: {
      provider: 'c8', // 'you can you istanbul (already installed dev package)'
    },
  },
  server: {
    port: 8000,
    host: true,
  },
  define: {
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
  },
  // server.hmr.overlay = false;
});
