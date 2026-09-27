import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: { assetsInlineLimit: 20000000, cssCodeSplit: false },
  server: { host: '127.0.0.1', port: 4174, strictPort: true }
});
