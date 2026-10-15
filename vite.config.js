import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import tailwindcss from '@tailwindcss/vite';
// https://vite.dev/config/
export default defineConfig({
  // 相对路径部署，适配 Gitee Pages 子路径
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    Components({
      resolvers: [
        // 自动解析 icon 组件 格式 i-[集合]-[图标名]
        IconsResolver({
          prefix: 'i', // 组件统一前缀，<i-ep-add-location>
          customCollections: ['local'], // 声明本地图标集名称
          enabledCollections: ['ep', 'ant-design', 'mdi'], // 只启用需要的图标集，加快编译
        })
      ]
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,// 缺失图标自动下载
      customCollections: {
        // 定义本地图标集 'local'，指向 src/assets/svg 目录
        'local': FileSystemIconLoader('src/assets/svg', (svg) =>
          // 替换 SVG 的 fill 属性，使图标颜色可以通过 CSS 的 color 属性控制
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ],
  server: {
    proxy: {
      // 匹配 /api 开头的接口
      '/dev-api': {
        target: 'http://127.0.0.1:8080/dev-api', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/, ''), // 去掉/api前缀
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "@/assets/styles/var.scss" as *;`
      }
    }
  }
})
