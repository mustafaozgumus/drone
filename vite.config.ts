import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Vercel ortam değişkenlerini yükle
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // process.env.API_KEY kullanımını desteklemek için
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})