# chrome 插件
使用web三剑客开发
运行在chrome浏览器上，可以使用所有的js apis
比普通web页面更加强大，因为还可以调用chrome apis

插件编写
## 主要文件
1. manifest.json
2. service worker
    + 浏览器事件处理：导航新页面、关闭tab、移除书签
    + 调用所有chrome apis
    + 不能与页面内容交互
3. content scripts 
    + 在目标web页面运行
    + 获取、修改web页面dom
    + 调用有限的chrome apis，通过messages与service worker交互，使用其他的apis
4. popup和其他页面
    + 实际需要 创建页面
    + 这些页面都可以获取chrome apis 

基本结构：
- manifest.json
- content-script.js
- service-worker.js
- htmls
  - popup.html
  - options.html
- static

action API
控制用户点击工具栏中的插件图标的行为
要么打开一个popup `action > default_popup`
要么后台执行一些代码 `background > service_worker`
