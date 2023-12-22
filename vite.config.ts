import { PluginOption, defineConfig, splitVendorChunkPlugin } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";

//pwa
import { VitePWA } from "vite-plugin-pwa";

//https://juejin.cn/post/7235818900818526265   打包时间分析  构建时长、chunk 数量及大小
import { visualizer } from "rollup-plugin-visualizer";
// import { GenerateSW } from "workbox-webpack-plugin";

//icons
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

//zip
import zip from "vite-plugin-zip";

// https://github.com/antfu/unplugin-vue-components
// arco-design-vue 按需引入+自动 import+模板组件提示
import { vitePluginForArco } from "@arco-plugins/vite-vue";
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

/**
 * design-icon图标
  import { DownOutlined } from '@ant-design/icons-vue'
  ↓↓↓
  import DownOutlined from '@ant-design/icons-vue/DownOutlined'
 */
import vitePluginImp from 'vite-plugin-imp'
const isBuild = process.env.NODE_ENV === 'production' //判断当前是否处于构建模式

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    vue({
      reactivityTransform: false, // 开启reactivityTransform $ref
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            return tag.startsWith("ion-"); // (return true)
          },
        },
      },
    }),
    // Components({/**自动引入使用的组件,使用不多 */
    //   resolvers: [
    //     ArcoResolver({
    //       // importStyle: 'less', // 可以不写
    //       resolveIcons: true,
    //       // 这里必须设置为 true，否则 yarn build 不会将自动导入的 arco 组件的样式文件打包
    //       sideEffect: process.env.NODE_ENV === 'production',
    //     }),
    //   ],
    //   dts: false,
    // }),
    // vitePluginForArco({
    //   // theme: '填写主题包名，没有就不用配置这个属性',
    //   varsInjectScope: ['*'],
    // }),
    VitePWA({
      manifest: {
        name: "Example App",
        short_name: "Example PWA",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
    }),
    splitVendorChunkPlugin(),
    isBuild && vitePluginImp(),
    visualizer(),

  ],
  define: {
    //https://vue-i18n.intlify.dev/guide/advanced/optimization.html#reduce-bundle-size-with-feature-build-flags
    // __VUE_I18N_FULL_INSTALL__: true,
    // __VUE_I18N_LEGACY_API__: false,
    // __INTLIFY_PROD_DEVTOOLS__: false,
  },
  server: {
    port: 4000,
    host: "0.0.0.0",
    proxy: {
      "/api/": {
        target: "http://124.222.62.70:803",
        // target: "https://music.qier222.com/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, ""),
      },
      "/img/": {
        target: "https://img.2eka.cloud/",
        // target: 'https://img.2eka.cloud/api/random?type=pc',
        // target: 'https://api.ixiaowai.cn',
        // // target: 'https://api.ixiaowai.cn/api/api.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/img\//, ""),
      },
      "/apiG/": {
        //gitee
        target: "http://124.222.62.70:83",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/apiG\//, ""),
      },
      "/apiG2/": {
        //gtpso.com
        target: "http://124.222.62.70:84",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/apiG2\//, ""),
      },
      "/tran/": {
        target: "http://124.222.62.70:1188",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/tran\//, ""),
      },
    },
    cors: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          "$Tcolor:rgb(169, 169, 169); $Bcolor:rgb(250, 250, 250);" +
          "$T0:#CDD8FC;$T1:#6684E5; $T2:#E3E9FC;$T3:#b0b0fb;$T4:#5858ffd1;",
      },
      // arco css变量  https://arco.design/vue/docs/theme#Less-%E5%8F%98%E9%87%8F%E6%9B%BF%E6%8D%A2
      less: {
        modifyVars: {
          "arcoblue-6": "176,176,251",
        },
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".jsx", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "vue-i18n": "vue-i18n/dist/vue-i18n.cjs.js",
    },
  },
  build: {
    minify: true, //代码压缩功能
    sourcemap: true, //源代码映射
    // assetsDir: "assets",
    outDir: "dist",
    target: "es2015",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
      output: {
        // ensure the final bundle is a self-executing function
        format: "es",
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
        // manualChunks(id) {
        //   // 静态资源分拆打包
        //   if (id.includes('node_modules')) {
        //     return id.toString().split('node_modules/')[1].split('/')[0].toString()
        //   }
        // }
      },
    },
  },
})