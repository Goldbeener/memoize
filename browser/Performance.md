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


#### DOM Nodes
> The DOM node count graph shows the number of created DOM nodes that are still held in memory, i.e. which have not been garbage collected yet. This doesn't have to coincide with the elements you get through getElementsByTagName. The latter will also only get you the elements actually attached to the document tree. It won't get any 'offline' items to which you still have references.

