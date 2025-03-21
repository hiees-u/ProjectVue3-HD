import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: false,
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',  // Giả lập môi trường trình duyệt
  },
})
