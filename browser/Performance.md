+ https://github.com/zizzamia/perfume.js
+ https://github.com/GoogleChrome/web-vitals
+ https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma
+ https://github.com/jpillora/xhook

## 性能指标
### Navigation Timing
收集网络请求的生命周期和计时的性能指标
+ DNS lookup
+ Header Size
+ Fetch time 缓存查找响应时间
+ Worker time Service worker时间加上响应时间
+ Total time 请求响应时间，仅网络
+ Download time 仅下载响应时间
+ TTFB Time To First Byte 请求发出后到接受响应首字节所需时间， web页面加载耗时的最大影响因素，占页面总延迟的40%-60%


## Performance Metrics



## tools
### performanc monitor
可以监控指标：
+ CPU usage
+ JS Heap Size
+ DOM Nodes
+ JS Event Listener
+ Documents
+ Document Frames
+ Layouts/sec
+ Style Recalcs /sec


#### animation
主要衡量指标 FPS (frames per second)

60+FPS 是比较好的


#### DOM Nodes
> The DOM node count graph shows the number of created DOM nodes that are still held in memory, i.e. which have not been garbage collected yet. This doesn't have to coincide with the elements you get through getElementsByTagName. The latter will also only get you the elements actually attached to the document tree. It won't get any 'offline' items to which you still have references.


#### JS Event Listener

What are these so called Listeners to begin with?

+ These are event listeners.
+ 选中一个元素，查看`Event Listeners`tab, 
+ 选中 `Ancestors`checkbox; 可以看到页面所有绑定事件

页面操作引起 JS Event Listener 数量显著增加问题？


## 页面性能埋点监控

+ Core Web Vitals
  + Cumulative Layour Shift(CLS)
  + First Input Delay (FID)
  + Largest Contentful Paint (LCP)
+ Other Web Vitals
  + Time To First Byte(TTFB) 
  + DomContentLoaded(DCL)
  + First Paint(FP)
  + First Contentful Paint(FCP)
  + Time To Interactive(TTI)
  + Custom Vitals
    + Core Module Mounted
    + domParserDuration
    + domInteractive
+ Frames per Second(FPS)
  + average
  + max
  + min
+ NetWork
  + xhook
  

### 相关技术点
1. performance
2. sendBeacon
3. xhook
4. requestAnimationFrame

