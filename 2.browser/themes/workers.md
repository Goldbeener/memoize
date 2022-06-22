# Worker

worker 是运行在独立于js引擎主线程之外的一个线程。

当前存在的worker

1. `web worker`
2. `service worker`
3. `worklets`

## Web Workers

创建**操作系统级别的线程**，与浏览器主线程并行

多线程执行js代码

主要功能是帮主线程减负；
可以将大计算量、耗时的任务放在web worker中处理；
> 比如对图片、音视频等的处理

没有一个特别的使用场景

### 限制

为了避免与主线程的并发冲突，有以下限制

1. 无法访问DOM、BOM、local File； 可以访问Location、navigator
2. 主线程与worker的数据交互，是`值复制`的形式; worker对值得修改不会影响主线程；但是过多的数据声明可能会影响性能，可以通过`transferable object`解决
3. 限制，最多20个，每个最大内存5M; 需要手动维护创建和销毁

## Service Worker

是worker的一种
   意味着运行在一个独立的线程

**本质**  明确的应用定位
充当web应用、cache、network/服务器 之间的代理服务器。

**能力：**
    1. 拦截`网络请求`，根据网络是否可用来采取不同的策略，使用缓存或者从服务器更新资源
       1. 拦截并修改网络请求，实现更细粒度的资源缓存
       2. 可以完全控制特定情形下（通常是断网）的表现
    2. 推送通知能力
    3. 访问后台同步API

**限制**

1. 运行在独立的线程内，因此不能访问DOM
2. 也不会阻塞js主线程执行
3. 完全异步，同步API(xhr、localStorage)不能使用
   1. 意味着service worker内使用的存储，必不是localStorage; 是`indexDB`和`cache`
4. 只能工作在https模式下

### Cache

Cache 对象，在service worker下常用
用来存储请求和响应信息

## Worklets

提供了介入浏览器渲染流水线不同阶段的钩子，使开发者能对浏览器渲染过程做一些轻微的定制
应用在高性能图形渲染或音频处理场景

+ Layout worklets
+ Paint worklets
+ Animation worklets

## references

+ [3 kinds workers](https://bitsofco.de/web-workers-vs-service-workers-vs-worklets/)
