import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/beelice': {
        target: 'https://beelice.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/beelice/, '')
      },
      '/godgroup': {
        target: 'https://godgroup.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/godgroup/, '')
      },
      '/dillypod': {
        target: 'https://dillypod.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dillypod/, '')
      },
      '/godmerch88': {
        target: 'https://godmerch88.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/godmerch88/, '')
      },
      '/gghanzo': {
        target: 'https://gghanzo.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/gghanzo/, '')
      },
      '/coolspod': {
        target: 'https://coolspod.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/coolspod/, '')
      }, 
      '/dandygift': {
        target: 'https://dandygift.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dandygift/, '')
      }, 
    }
  }
})
