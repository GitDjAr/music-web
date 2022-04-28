import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  // base:'./',d

  plugins: [vue({
    reactivityTransform: true,// 开启reactivityTransform $ref
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
        target: "http://8.140.43.205:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, ""),
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
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
})
