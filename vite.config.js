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
      '/657af8-3': {
        target: 'https://657af8-3.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/657af8-3/, '')
      }, 
      '/tee-shirt-for-family': {
        target: 'https://tee-shirt-for-family.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/tee-shirt-for-family/, '')
      }, 
      '/goodlygift88': {
        target: 'https://goodlygift88.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/goodlygift88/, '')
      }, 
      '/c04f72-3': {
        target: 'https://c04f72-3.myshopify.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/c04f72-3/, '')
      }, 
      '/amazingtees': {
        target: 'https://amazingtees.onshopbase.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/amazingtees/, '')
      }, 
      '/pofily': {
        target: 'https://pofily.onshopbase.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pofily/, '')
      }, 
      '/pamaheart': {
        target: 'https://pamaheart.onshopbase.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pamaheart/, '')
      }, 
      '/seegovi': {
        target: 'https://seegovi.onshopbase.com/admin',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/seegovi/, '')
      }, 
    }
  }
})
