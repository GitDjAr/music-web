import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://8.140.43.205:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    cors:true
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
