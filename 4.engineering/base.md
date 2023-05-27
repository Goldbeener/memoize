# 关于工程化

现在web项目，在开发过程中主要过程

+ `包管理器`
  + package manager 依赖包管理
    + npm
    + yarn
    + pnpm
+ `编译` compilation/transpiling
  + 将使用最新特性的js/ts文件转换成浏览器通用的代码
    + babel
    + esbuild
    + swc
+ `打包` bundling
  + 将模块化的源代码，打包成可部署的最终产物，在其过程中可以对代码进行处理（编译、压缩、混淆）
    + webpack
    + rollup
    + parcel
    + esbuild
    + vite
  + 分类
    + loader 将不同文件类型转换成js模块
      + 打包器一般原生仅支持js、json
    + plugin 定制化构建流程
      + 格式化
      + 压缩
+ `任务运行器` task runner
  + 设置脚本，指导构建工具自动化完成开发、校验、构建、部署流程
    + Gulp
    + Grunt
    + npm script

## compilation VS transpiling

编译和转置

编译： 将抽象的高级语言转换成机器语言，比如将c语言转换成机器语言
转置： 将一种高级语言转换成另一种高级语言，比如将ts转换成js

## 各种新工具

esbuild
> An extremely fast bundler for the web
定位是bundler 也是compiler

swc
> Speedy Web Compiler
定位是 compiler + bundler， 目前打包不太好用

## chrome extensions

chrome 插件
暂时记在这

插件使用service-work
service-work无法访问window，因此不能使用localStorage
插件提供了`chrome.storage.local`api，在本地存储数据

定时器
插件中因为sw会随时因为tab关闭而种植，导致setTimout、setInterval失效
因此，chrome插件提供了`chrome.alarms`api, 来实现延时、定时任务
