// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],

  // prod derleme ayarı
  build: {
    chunkSizeWarningLimit: 50000,
  },

  // kısayol import'ları
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
  },

  // ⬇️  yalnızca `npm run start` (vite preview) için
  preview: {
    host: '0.0.0.0',                     // dış ağdan dinle
    port: 4173,                          // isterseniz değiştirin
    strictPort: true,
    allowedHosts: [
      'panel.ebtex.com.tr',              // alan adınız
      '213.202.223.158',                 // doğrudan IP
      'localhost',                       // yerel test
    ],
  },
})
