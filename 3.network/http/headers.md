# HTTP Headers

## Host Referer Origin

### Host

+ 请求头字段
+ 指明了服务器的域名以及监听的TCP端口号(可选)
+ 特别是在`单台服务器设置多个虚拟主机`的时候
+ 网络请求必须包含，且只能有一个
+ 不能被修改，浏览器自动组装取值

> 一台物理主机，提供多个服务
> 因为请求通过dns之后，目的地是ip地址，一个ip对应一台物理主机，这台主机上可能有多个虚拟主机
> 可以通过host标记出要访问的目标虚拟主机

### Referer

包含了当前请求页面的来源页面地址
表示当前页面是通过此来源页面里的链接进入的

字段值包括，协议、域名、端口、路径、参数，不包括hash

服务端一般会使用referer请求头来识别访问来源，尽兴统计分析、日志记录以及缓存优化

+ 网页请求的referer是前一个页面的url
+ 图片资源请求的referer通常是所在的网页url
+ 资源请求的referer通常是所在的网页url

以下情况Referer不会被发送

1. 本地文件协议
2. 当前页面使用的http协议，而来源页面使用的是https协议
3. 直接输入网址或者浏览器书签访问
4. 使用js的location.href或者location.replace
5. a标签使用noreferer
6. 使用Referer Meta标签控制referer使用场景
7. 使用iframe的hack写法去除referer

```html
<iframe src="javascript: '<img src=http://www.baidu.com/xxx.png/>'"/>
```

### Origin

指示请求来自哪个站点
该字段仅指示服务器域名，不包含任何路径信息
用于CORS请求或者POST请求

以下请求会携带Origin字段

1. 跨域请求
2. 除GET、HEAD意外的同源请求

### referer 与 origin
