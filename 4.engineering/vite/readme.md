# Vite

## 希望解决的问题
在浏览器支持es模块之前，原生js并没有提供模块开发的能力；   
因此打包器承担了这一部分工作，将借助框架以模块形式开发的前端代码，编译、打包成浏览器支持的原生js

目前常见的打包器，开发过程中存在2个问题：
1. 冷启动慢，打包器需要从入口页面开启，抓取整个应用的代码，编译构建之后才能提供服务
2. 更新缓慢，即使有HMR，在大型应用中更新效率也会很低
   1. 打包器将构建内容缓存在内存中

Vite尝试解决这两个问题
1. 冷启动问题，将项目代码分为2部分
   1. 依赖 不会改变的外部代码 使用esbuild打包，速度提升10-100倍
   2. 源码 以原生esm的形式提供给浏览器，减少了构建时间
2. 更新问题，针对esm使用HMR，只需要将模块之间的链接失活，并重新替换即可
3. 同时vite高效利用了缓存
   1. 依赖模块强缓存，`Cache-Control: max-age=31536000,immutable`
   2. 源码部分 304协商缓存


**主要思路就是`非打包`实现模块开发**
+ 原生ESM，import/export 浏览器支持
+ 一个import是一个请求
+ vite dev server 按需(代码import)读取本地文件，返回浏览器可以解析的代码
  + 每次只处理一个文件模块
+ 在本地开发过程中，避免了整体项目代码的处理，所以比较快

**主要实现就是借助浏览器已经支持esm**


> Vite在开发环境使用上述方案，无打包模式
> 但是在生产环境还是会打包

为什么生产环境还会打包？
1. esm嵌套导入会导致额外的网络往返，会有很多的http请求，即使使用http2也会效率相对低下
2. tree-shaking、懒加载、分块chunk 还是需要打包实现

> 那么需要解决的一个问题就是： 开发环境非打包模式和生产环境打包模式的一致性


### 其他非打包解决方案
1. Snowpack
2. WMR
3. @web/dev-server