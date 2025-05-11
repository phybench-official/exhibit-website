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
        manualChunks: {
          // 将 React 核心库单独放在一个 chunk 中
          'react-core': ['react', 'react-dom'],
          
          // Ant Design核心
          'antd': [
            'antd', 
            '@ant-design/icons',
            '@ant-design/colors', 
            '@ant-design/cssinjs', 
            '@ant-design/cssinjs-utils',
            '@ant-design/fast-color',
            '@ant-design/react-slick',
            '@rc-component/color-picker',
            '@rc-component/context',
            '@rc-component/mini-decimal',
            '@rc-component/mutate-observer',
            '@rc-component/portal',
            '@rc-component/qrcode',
            '@rc-component/tour',
            '@rc-component/trigger'
          ],
          
          // Three.js 相关库单独打包
          'three': ['three', '@react-three/drei', '@react-three/fiber'],
          
          // UI 组件库单独打包
          'ui-components': [
            '@radix-ui/react-dialog', 
            '@radix-ui/react-dropdown-menu', 
            '@radix-ui/react-select', 
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-primitive',
            '@radix-ui/react-context',
            '@radix-ui/react-id'
          ],
          
          // 动画相关库单独打包
          'animations': ['gsap', '@gsap/react', 'framer-motion', 'motion', 'embla-carousel-react', 'lenis'],
          
          // React 扩展库单独打包
          'react-extensions': ['react-router-dom', 'react-syntax-highlighter', 'react-i18next'],
          
          // 国际化相关库单独打包
          'i18n': ['i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
          
          // D3相关库单独打包
          'd3-libs': ['d3', 'd3-array', 'd3-shape', 'd3-scale'],
          
          // 数据可视化库
          'visualization': ['recharts', 'cytoscape', 'cytoscape-cose-bilkent', 'cytoscape-fcose']
        },
        // 优化输出格式，使文件名更加清晰
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]'
      },
    },
  },
})
