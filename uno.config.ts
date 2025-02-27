// uno.config.ts
import { defineConfig } from "unocss";
import { presetUno } from "unocss";
import presetIcons from "@unocss/preset-icons";

export default defineConfig({
  presets: [
    presetUno(), // 样式预设方案
    presetIcons({
      // 图标处理器
      // extraProperties: {// 图标样式
      //   display: "inline-block",
      //   "vertical-align": "middle",
      //   // ...
      // },
    }),
    // ...other presets
  ],
});
