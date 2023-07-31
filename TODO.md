- [x] 登录权限
- [ ] 喜欢列表
- [ ] 首次加载优化-font优化
- [ ] 音乐库优化
- [x] 歌单切换优化
- [x] 随机播放fix

```txt

打包优化
90m

按需导入echarts
89m

删除 echarts
63m

分包:splitVendorChunkPlugin || manualChunks
49m

按需导入 Components
52m


使用 vite-plugin-imp 插件可以自动转换结构导入成非结构导入（支持灵活配置，什么库都支持）。
import { DownOutlined } from '@ant-design/icons-vue'
↓↓↓
import DownOutlined from '@ant-design/icons-vue/DownOutlined'
https://github.com/vueComponent/ant-design-vue/issues/5803#issuecomment-1193267526
built in 49.28s
```
