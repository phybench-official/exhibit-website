import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { createHtmlPlugin } from 'vite-plugin-html'

// 生成版本号
const version = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          buildTime: new Date().toISOString(),
          version
        }
      }
    })
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
          // react-core
          'react-core': ['react', 'react-dom'],
          
          // Ant Design
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
          'three': ['three'],
          'r3f': ['@react-three/drei', '@react-three/fiber'],
          
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
          
          // 动画
          'animations': ['gsap', '@gsap/react', 'framer-motion', 'motion', 'embla-carousel-react', 'lenis'],
          
          // React 扩展库
          'react-extensions': ['react-router-dom', 'react-syntax-highlighter', 'react-i18next'],
          
          // i18n
          'i18n': ['i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
          
          // D3
          'd3-libs': ['d3', 'd3-array', 'd3-shape', 'd3-scale'],
          
          // 数据可视化库
          'visualization': ['recharts', 'cytoscape', 'cytoscape-cose-bilkent', 'cytoscape-fcose']
        },
        // 输出文件名
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`
      },
    },
  },
})
