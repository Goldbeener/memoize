# 浏览器本地存储

+ [cookie](./Cookie.md)
+ `localStorage`
+ `sessionStorage`
+ `indexDB`
+ webSQL [已废弃]
+ `OPFS`： Origin private file system 源私有文件系统
  + 存储二进制数据，比如file、images等
  + 不适合存储、查询json数据
+ `WASM-SQLite`
+ `Cache Storage`
  + 基于HTTP请求的缓存机制，主要目的是存储HTTP请求的响应，（HTML、CSS、JS、images等）
  + key-value 形式，key是请求，value是响应
  + 持久化存储
  + 专用存储资源缓存，不适合作为通用数据存储

## web app 内存探测

### web api

估算**当前域名**下的`内存配额`以及`内存用量`

```js
navigator.storage.estimate().then((res) => {
    const { usage, quota } = res;
    console.log('🚀🚀🚀 ~ navigator.storage.estimate ~ res', res);
    // usage 已使用
    // quota 配额
})
```

相关的api, 这些存储api写入数据之后，都会影响estimate获取到的信息

+ `indexDB`
+ `Cache Storage`
+ `localStorage`
+ `sessionStorage`
+ `file system`
+ `OPFS`

### 脚本计算localStorage

[计算localStoarge容量](../../6.practice/calc-localStorage-size.md)

## 跨tab数据同步

1. `localStorage` 支持一个 storage-event时间， 在storage存储发生变化时，触发`storage`事件

```js
addEventListener("storage", event => {})
```

2. `BroadcastChannel`事件，支持跨浏览器tab通信
在更新storage的同时，广播一个事件，其他tab监听事件，以实现跨tab通信

3. `SharedWorker` 类似于广播事件，
定义一个SharedWorker，所有storage的更新操作都通过这个线程；更新时触发事件
然后所有tab都订阅SharedWorker的消息，
