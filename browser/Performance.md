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
  + First Input Delay (FID)
  + Largest Contentful Paint (LCP) 页面最大内容在可视区可见的时间点
  + Total Blocking Time(TBT) FCP到TTI之间`所有长任务的阻塞时间之和`
  + Cumulative Layour Shift(CLS)
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

### TBT

> 长任务
> 一个任务在主线程上运行超过50ms，就是长任务
> 长任务阻塞时间： 任务总执行时间 - 50ms 
#### TBT 改善点
1. 对代码分割，延迟加载对首屏加载不重要的包
2. 将代码分解成 工作更少、执行更快的函数  最小职能
3. 减少DOM查询
4. 将计算密集型任务交给Service Worker 或 Web Workers

#### TBT与TTI的区别
完全可交互： 页面主线程至少5s内都没有长任务，那么可以认为它是完全可交互的

TBT只在FCP和TTI之间计算
TTI识别主线程何时变为空闲时间
TBT量化主线程在空闲之间的繁忙程度


### 相关技术点
1. performance
2. sendBeacon
3. xhook
4. requestAnimationFrame

