# Streams

允许一段一段的接收与处理数据
> 相比于获取完整的数据再处理，流不需要占用与数据量大小一致的一大块内存空间，节省内存空间
> 并且还能在接收的同时，实时处理数据，缩短整个操作的耗时

流还有管道的概念，可以凤凰脏一些类似中间件的中间流，用管道将各个流连起来，在管道的末端就能拿到处理后的数据

以前浏览器上没有原生的流API，没有产生数据源的流

## ReadableStream
+ locked
+ getReader() 获取`ReadableStreamDefaultReader`实例，通过这个实例能读取流上的数据
  + closed()
  + cancel()
  + read() 获取流上的数据，返回一个promise promise中包含一个value参数和done参数
    + resolve({ value, done });
      + value: `Uint8Array` 读取到的流中的数据片段
      + done: `boolean` 是否读取完毕
  + releaseLock()
+ cancel()
+ pipeThrough()
+ pipeTo()
+ tee()
## Teeing
## WriteableStream
## Pipe Chains
## Backpressure


## 疑问点
流与blob等二进制数据的区别？

## references
+[从 Fetch 到 Streams —— 以流的角度处理网络请求](https://juejin.cn/post/6844904029244358670#heading-4)

## 课后习题
### 使用xhr实现请求封装
```js
const xhr = new XMLHttpRequest();
xhr.open('POST', url);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.withCredentials = true;

// 请求被后端处理完成
xhr.onload = function() {
    if(xhr.status === 200) {
        // success
        xhr.response // 响应数据
    } else {
        // 服务器处理了但是失败了
    }
}
xhr.onerror = function() {
    console.log('网络错误或者是跨域被拦截')
}

xhr.send(JSON.stringify({}));
```
