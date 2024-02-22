+ <https://github.com/zizzamia/perfume.js>
+ <https://github.com/GoogleChrome/web-vitals>
+ <https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma>
+ <https://github.com/jpillora/xhook>

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

+ Css 动画
  + 全部过程在合成线程，效率高
+ Js 动画
  + 会在主线程有计算过程，再传递给合成线程，效率有损耗
主要衡量指标 FPS (frames per second)

60+FPS 是比较好的

#### FPS的计算与统计

1. chrome浏览器查看
  chrome devtools --> more tools --> Rendering ---> Frame Rendering Stats
2. Frame Timing API
  
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

### 参考文章

+ [ ] [Optimize website speed 加载优化](https://developer.chrome.com/docs/devtools/speed/get-started/)

+ [ ] [Analyze runtime performance](https://developer.chrome.com/docs/devtools/evaluate-performance/)
+ [ ] [Fix memory problems](https://developer.chrome.com/docs/devtools/memory-problems/)

## 性能监控API

`window.performance` 对象
Performance API可以获取到当前页面性能相关的信息；
融合了之前的`performance.timing` `performance.navigation` api上的信息

> 上述两个属性目前已被删除，做了向后兼容
属性：

+ `timeOrigin` 返回性能测量开始时间的高精度时间戳 【实验性属性】
+ `memory` 返回

**时间点**

+ perf.now() 获取一个精确到毫秒的时间戳 表示从`timeOrigin`开始到现在的时间
  + 可以在web worker中使用

`timeOrigin`在不同情况下的值

+ 脚本的global object 是window，也就是在浏览器中  `globalThis === window`
  + 如果当前的document是第一个加载的（也就是直接在浏览器地址栏输入的）；则`timeOrigin`是创建浏览器上下文的时间
  + 如果是处于卸载窗口中已加载的文档过程中，会有确认弹窗，`timeOrigin`是在确定导航到新documnet的时间点
  + 其他情况下，是创建窗口中当前document的导航的时间点
+ 脚本的global object是workerGlobalScope ，也就是在worker中
  + `timeOrigin`是worker被创建的时间点
  + 通常会与创建worker时的值有出入

> 这个timeOrigin与perf.timeOrigin 不一样

与Date.now()的区别

1. 精度高，在支持的环境下，可以精确到微秒，即带小数点
2. worker中可用

**mark相关方法**
mark适用于在指定的位置打点，浏览器会在标记当时的`时间戳`

+ perf.mark(str) 在程序某个点创建一个标记时间戳   可以通过entry接口获取到
+ perf.clearMarks(str) 删除指定的、或者所有的标记

**measure 相关方法**

+ perf.measure(measureName, markName1/timingName, markName2/timingName)  可以通过entry接口获取
+ perf.clearMeasures(name) 删除指定的、所有的测量

创建一个测量，需要传递测量name，以及要测量的2个节点name

**entry 相关方法**

+ perf.getAllEntries(filter) 获取指定的、所有的performanceEntry
+ perf.getEntriesByName(name, type) 通过名字获取entry
+ perf.getEntriesByType(type)  通过type 获取entry
+ perf.clearResourceTimings() 清空performance中类型为`resource`的所有entry信息
+ perf.setResourceTimingBufferSize(maxSize) 设置performance中resoucre类型的entry的最大个数
  + 最小150个

**序列化performance**

+ perf.toJson() 返回perf对象的json格式

**触发事件**

+ resourcetimingbufferfull resource timing 占用溢出事件

```js
window.addEventListener('resourcetimingbufferfull', event => { });
```

## PerformanceEntry

是性能时间线上，一类性能指标的抽象
可以是以下几种

+ PerformanceMark
+ PerformanceMeasure
+ PerformanceNavigationTiming
+ PerformanceResourceTiming
+ PerformancePaintTiming

### 数据格式

PerformanceEntry 基类的数据结构

```js
var perfEntry = {
  name: '', 
  entryType: '', // mark\measure\resource\navigation\element\paint\longTask
  startTime: '',
  duration: ''
}
```

PerformanceMark、PerformanceMeasure 这两种类型，完全继承基类，没有拓展

#### PerformanceResourceTiming

`PerformanceResourceTiming` 在 `PerformanceEntry`基类的基础上，做了拓展

`PerformanceResourceTiming extends PerformanceEntry`

增加了一个资源加载过程的各个时间节点的信息

```js
var perfResourceEntry = {
  // 基类属性
  name: '',  // resource url
  entryType: 'resource', // mark\measure\resource\navigation\element\paint\longTask
  startTime: '', // fetch start time
  duration: '', // responseEnd - startTime
  // 拓展属性
  initiatorType: '', // 资源类型 elename\css\xmlhttprequest
  nextHopProtocol: '', // 获取资源使用的协议
  workerStart: '', // 在worker中， 发起fetch请求之前
  redirectStart: '', // 重定向请求开始
  redirectEnd: '', // 接收到重定向响应的最后一个字节
  fetchStart: '', // 开始请求资源
  domainLookupStart: '', // 开始dns寻址
  domainLookupEnd: '', // dns寻址结束
  connectStart: '', // 开始建立连接获取资源 
  connectEnd: '', // 连接建立完成 （看样子是tcp连接）
  secureConnectStart: '', // 安全连接 握手阶段开始
  requestStart: '', // 开始请求资源，（应该是http请求开始）
  responseStart: '', // ttfb 接收到响应的第一个字节
  responseEnd: '', // 资源响应的最后一个字节 或者是 连接关闭
  transferSize: 0, //  获取到资源的容量 包括 header + body
  encodedBodySize: 0, // 在解码 payload body 之前，它的体积
  decodedBodySize: 0, // 解码之后，payload body 体积
  serverTiming: [{}], // server timing 指标集合
}
```

#### PerformanceNavigationTiming

`PerformanceResourceTiming extends PerformanceEntry & PerformanceResourceTiming`

增加了一个资源加载过程的各个时间节点的信息

```js
var perfNavigationEntry = {
  // 基类属性
  name: '',  // document address
  entryType: 'navigation', // mark\measure\resource\navigation\element\paint\longTask
  startTime: '0', // '0'
  duration: '', // loadEventEnd - startTime
  // 拓展PerformanceResourceTiming 属性
  initiatorType: 'navigation', // 
  // 拓展属性
  type: 'navigate|relaod|back_forward|prerender', // navigation type
  unloadEventStart: '', // 前一个文档 开始卸载 beforeUnload
  unloadEventEnd: '', // 前一个文档的 unload 回调事件触发完成
  redirectCount: '', // 当前上下文的重定向次数
  requestStart: '', // ua 开始请求资源 从server或者本地缓存
  responseStart: '', // ua 从服务器（或本地缓存）接收到第一个字节的响应 
  domInteractive: '', // 当前文档的准备就绪状态设置为 interactive 可以交互
  domContentLoadedEventStart: '', // 浏览器触发domContentLoaded事件
  domContentLoadedEventEnd: '', // domContentLoaded事件完毕
  domComplete: '', // 当前文档的准备就绪状态设置为 complete
  loadEventStart: '', // 当前文档的load事件开始触发
  loadEventEnd: '',  // 当前文档的load事件执行完成
}
```

#### PerformancePaintTiming

`PerformancePaintTiming extends PerformanceEntry`

```js
var perfEntry = {
  name: 'first-paint | first-contentful-paint', 
  entryType: 'paint', // mark\measure\resource\navigation\element\paint\longTask
  startTime: '', // when paint occurred
  duration: '0'
}
```

## 使用`PerformanceObserver`获取性能数据

```js
function observeCallback(list, observer) {
  // list： 通过observe指定的观测entry list
  // observer 实例
  const entries = list.getAllEntries();
  entries.forEach(entry => {
    if(entry.name === 'special-entry-name') {
      // do something
    }
  })
}

const observer = new PerformanceObserver();
observer.observe({ entryTypes: ['mark'], type: 'mark'  }); // 指定仅观测mark类型entry

```

## Jank

Jank web性能术语 关系到页面的流畅度
包括滚动、过渡、动画等效果的流畅度

## Performance

### performace.now()

表示从页面 `performance.timing.navigationStart` 开始，经过的**毫秒数**，
是浮点数，会有小数部分，精度最高可达微秒级

常用在做性能监控等对时间精度要求较高的场景

```js
performance.now() // 

```

**VS Date.now()**

`Date.now()` 表示从1970年开始到现在经过的毫秒数，是一个整数

`performance.timing.navigationStart` + performance.now() = Date.now()
