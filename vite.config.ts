import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // base:'./',d

  plugins: [vue({
    reactivityTransform: true,// 开启reactivityTransform $ref
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return tag.startsWith('ion-') // (return true)
        }
      }
    }
  })],

  define: {
    //https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
    // __VUE_I18N_FULL_INSTALL__: true,
    // __VUE_I18N_LEGACY_API__: false,
    // __INTLIFY_PROD_DEVTOOLS__: false,
  },
  server: {
    port: 4000,
    proxy: {
      "/api/": {
        target: "http://localhost:3000",
        // target: "https://music.qier222.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, ""),
      },
      "/img/": {
        target: 'https://img.2eka.cloud/',
        // target: 'https://img.2eka.cloud/api/random?type=pc',
        // target: 'https://api.ixiaowai.cn',
        // // target: 'https://api.ixiaowai.cn/api/api.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img\//, ""),
      },
      "/apiG/": {//gitee
        target: "http://xn--lg3a.top:83",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/apiG\//, ""),
      },
      "/apiG2/": {//gtpso.com
        target: "http://xn--lg3a.top:84",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/apiG2\//, ""),
      }
    },
    cors: true
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "$Tcolor:rgb(169, 169, 169); $Bcolor:rgb(250, 250, 250);" +
          "$T0:#CDD8FC;$T1:#6684E5; $T2:#E3E9FC;$T3:#b0b0fb;$T4:#5858ffd1;",
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
      "@": path.resolve(__dirname, "src/"),
      // "@components": path.resolve(__dirname, "src/components/"),
    },
  },
})
