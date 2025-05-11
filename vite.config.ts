import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 图标库单独打包
          if (id.includes('@lobehub/icons') || id.includes('@tabler/icons-react') || 
              id.includes('lucide-react') || id.includes('simple-icons')) {
            return 'icons';
          }
          
          // Three.js 相关库单独打包
          if (id.includes('three') || id.includes('@react-three') || id.includes('@types/three')) {
            return 'three';
          }
          
          // UI 组件库单独打包
          if (id.includes('@radix-ui')) {
            return 'ui-components';
          }
          
          // 动画相关库单独打包
          if (id.includes('gsap') || id.includes('framer-motion') || 
              id.includes('motion') || id.includes('embla-carousel')) {
            return 'animations';
          }
          
          // React 核心库单独打包
          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
            return 'react-core';
          }
          
          // 国际化相关库单独打包
          if (id.includes('i18next')) {
            return 'i18n';
          }
          
          // 数学和图表相关库单独打包
          if (id.includes('mathjax') || id.includes('recharts') || id.includes('matter-js')) {
            return 'math-charts';
          }
          
          // 其他 node_modules 依赖
          if (id.includes('node_modules')) {
            return 'vendors';
          }
        },
        // 优化输出格式，使文件名更加清晰
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
})
