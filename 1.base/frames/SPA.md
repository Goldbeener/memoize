# SPA

Single Page Application 单页应用

## 与传统多页应用的区别

**传统多页应用**
web页面资源： index.html js\css\imgs静态资源

页面的切换伴随着web api的请求，应用有几个页面，就需要在后台部署几套资源，

**SPA**
在web浏览器中执行大部分用户界面逻辑
整个应用只有一套资源，
页面的切换本质上是监听浏览器hash的切换/或者是history的切换，动态的变换HTML内显示区域，不会有网络资源请求，不会重新加载页面

通过js动态请求加载要显示的内容

优势：

+ 入口文件html只会请求一次，按照页面级别资源拆分，能够提高页面效率
+ 节省网络请求次数
+ 效率更高

劣势

+ SEO
+ 状态维护成本
+ 客户端实现路由
+ 性能监控

## 实现方式

+ Hash - hashchange
+ History - pushState -replaceState - popstate
