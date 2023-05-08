# Vue 3 + Typescript + Vite

该模板应该帮助你开始在急速地发展 Vue 3,打印稿。模板使用 Vue 3 <脚本设置>证监会,查看(脚本设置文档)(https://v3.vuejs.org/api/sfc-script-setup.html sfc-script-setup)了解更多信息。

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 项目说明:

目录解释
-husky: 校验 commit 提交钩子
-commitlint.config:校验 commit 提交钩子
-config:打包钩子
-.git/hooks/post-commit: Git 推送成功后执行钩子脚本
-.github
--workflows
---main.yml:打包钩子,服务器拉跨,目前没用

-electron:桌面文件
-service:pwd 渐进式-缓存
-src
-- api:api
-- assets:静态目录
-- components:全局组件
-- directives:自定义指令
-- hooks:一些函数钩子
-- layout:主题-样式
-- locale:语言国际化
-- router:路由
-- utils:工具函数
-- views:页面文件

-.editorconfig:缩进风格配置
-.eslintrc.js:编码风格
-.stylelintrc:css 风格
