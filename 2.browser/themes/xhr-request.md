## XHR 

XMLHttpRequest     
用于与服务器交互，可以在不刷新页面的情况下，请求指定URL，获取数据

```js
var xhr = new XMLHttpRequest();
xhr.open('GET', url);
// xhr.open('POST', url);

// 设置请求头的行为必须在open方法调用之后
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.withCredentials = true;

xhr.onreadystatechange = function() {
 if(xhr.readyState === 4) { // 请求完成
     if (xhr.status === 200) { // 请求成功
         // handle success
         // xhr.response
     } else {
         // handle error
     }
 }
}

xhr.onload = function() {
    console.log(xhr.response)
}
xhr.onerror = function() {
    console.log('error: ' + xhr.response)
}

xhr.send();
// xhr.send(JSON.stringify({ foo: bar})); // post 请求传参
```

### 实例
`const xhr = new XMLHttpRequest();`

#### 属性
+ withCredentials: boolean  指定跨域请求是否携带cookie信息
+ timeout: number 过期毫秒数
+ readyState: number 0\1\2\3\4
  + 0: UNSET 代理被创建，但是尚未调用open方法
  + 1: OPENED open方法已被调用
  + 2: HEADERS_RECEIVED send方法已被调用，并且头部和状态已经可以获得
  + 3: LOADING 响应部分正在被接受， responseText属性已经包含部分数据
  + 4: DONE 请求操作已经完成 请求操作已经彻底完成或失败
+ onreadystatechange: 回调函数
+ responseType: 枚举值 json、text = ''、blob、document、blob、arrayBuffer、 ms-stream（流式下载，仅用于下载请求，仅IE支持）
+ response: 根据responseType指定的格式，返回的响应数据
+ status: 状态码
+ statusText: 状态码对应的状态文本
#### 方法
+ open() 初始化请求，只能在js中使用
+ send() 发送请求 
+ setRequestHeader() 设置请求头，必须在open之后，send之前设置
+ abort() 如果请求已被发出，立刻终止请求
#### 事件
+ on('abort') 请求被终止时触发
+ on('error') 网络层级出现问题的时候触发，如果是应用层级(服务端处理了，但不是200正常响应这种)错误，不会触发
+ on('loadstart') 接收到响应数据 开始传输数据
+ on('load') 请求成功完成时触发
+ on('loadend') 请求结束时触发，无论请求成功、失败、或是终止
+ on('progress') 周期性的触发，当请求接收到更多数据时触发
+ on('timeout') 请求超时时触发 在预设时间内没有接受到响应

### 正常接受网络数据
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', url, [async]); // async 同步或者异步 默认异步
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.responseType = 'json';
xhr.withCredentails = true;


xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        // 代表网络请求结束 无论成功失败，即使是网络层的失败也会到这一层 
        // 也就意味着 这个地方会与onerror重复
        if (xhr.status === 200) {
            // 请求成功
        } else {
            // 三种状况
            // cors、status !== 2xx 、bad connection
        }
    }
}

// 请求成功完成 网络层成功 
// 需要在内部判断 应用层的 成功或者失败
xhr.onload = () => {
    if (xhr.status === 200) {

    } else {
        // status !== 200
    }
}
// 网络失败触发或者是跨域拦截触发
xhr.onerror = () => {
    // cors、bad connection
}

xhr.send([data]); // get请求 data = null; post请求按需传递
```
 
### 使用xhr实现请求取消
```js
xhr.abort();

xhr.onabort = function () {
    // 监听手动中断并作出响应
}
```

### 使用xhr实现超时中断
```js
xhr.timeout = 3000;
xhr.ontimeout = function () {
    // 监听超时终止并作出回应
}
```

### 使用xhr实现请求传输进度
```js
xhr.onprogress = function(event) {
    const { lengthComputable, loaded, total } = event;
    if (lengthComputable) {
        const progress = ((loaded / total) * 100).toFixed(2) + '%';
    } else {
        console.log(loaded);
    }
}
```

### 缺陷
+ 不能与底层的requests和response交互 xhr API并没有暴露这些概念
+ 不能操作浏览器内发生的一些资源请求，只能用于在js中做ajax请求
  + 浏览器内通过标签获取的css文件、图片资源等，不能被拦截操作
  + 也不能用在Service Worker中 做请求拦截等
  + 也不能用于资源的恢复 比如sendBeacon

为什么不能扩展，而是新创建一个API呢？
当前使用的XHR2.0兼容最初的XHR版本，导致里面的数据模型是受限制的，必须要严格按照老的格式来     
新创建一个API可以摆脱这个束缚

## Fetch
基于XHR的缺陷，web需要一个新的API，这个API需要满足这些条件
+ 获取资源
+ 兼容跨域 CORS
+ 重定向
+ 操作request和response
+ 可以在service worker中使用

```js
fetch(input[, init])
    .then(res: Response => {})

input: 可以是一个url，或者是一个request请求对象
    + url: string
    + request: new Request('url', {
        method: 'GET',
        headers: new Headers(), 
        mode: 'cors',
        cache: 'default'
    })    // Request 构造函数接受和fetch相同的参数
init: 配置项对象
    + method
    + headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    + body: JSON.stringify(data) // post 传参 这个地方要与headers内的设置保持一致
    + mode: 'cors' | 'no-cors' | 'same-origin' 
    + credentials: 'same-origin' | 'omit' | 'include'
    + cache
    + redirect
    + referrer
    + referrerPolicy
    + integrity

```

**注意点**
1. fetch方法返回一个Promise     
2. Promise仅当网络故障或者请求被阻止(触发cors)时，才会被置为reject； 其他都是resolve
   1. 这个promise仅代表是否经过了服务器处理，无论是否成功
   2. 当接收到服务端的响应时，无论是否成功处理，都是resolve，即使接收到一个代表错误的状态码，比如404， 也是resolve
      1. 只不过状态码非2xx时，resolve返回值的ok属性为false
3. Promise resolve状态下 将Response对象作为返回值

Response 对象
+ `Response.status` 整数 请求的状态码 200 
+ `Response.statusText` 字符串 与上述状态码一致
+ `Response.ok` boolean 标识本次请求是成功还是失败 状态码是否在2xx范围内
+ `Response.json()` 读取Response流并将其设置为已读， 并返回一个被解析为JSON格式的Promise对象
+ `Response.text()` 读取Response流并将其设置为已读， 并返回一个被解析为USVString格式的Promise对象
+ `Response.blob()` 读取Response流并将其设置为已读， 并返回一个被解析为blob格式的Promise对象
+ `Response.headers`  获取响应头中的字段信息
  + get()
  + set()
  + has()
+ `Response.body` 是响应体中的信息，就是正常后端返回的业务数据结构 初始状态下是一个可读流 ReadableStream
  + locked
  + getReader() 获取一个`ReadableStreamDefaultReader`实例，通过这个实例能在流上读取数据
    + ReadableStreamDefaultReader
      + read() 循环调用 获取流上数据， 返回一个promise
      + cancel()
      + closed()
      + releaseLock()
  + pipeTo()
  + cancel()

> Response 对象被设置为了stream的方式，只能被读取一次

### Request对象
```js
new Request(url, init)
```
### Response 对象
```js
new Response()
```
### Headers 对象
```js
new Headers()
```

### 优势
#### Modern APIs
相比于XHR，更少的代码量，可以完成相同的任务
```js
fetch('http://www.bing.com/HPImageArchive.aspx?format=js&idx=1&n=10&mkt=en-US')
    .then(response => {
        // 进到这里面代表 网络通信正常
        // 但是不代表接口成功
        if (!response.ok) {
            throw new Error('NetWork response was not ok !')
        }
        return response.json();
    })
    .then(res => {
        console.log('>>>>', res);
    })

```

并且还可以利用最新的promise链式操作

#### Streaming
开发人员可以获取到请求的基本单元： Request 和 Response 对象

这两个低层级的抽象，可以允许开发人员操作 response 流，而不是仅仅将响应体作为文本处理

```js
var url = 'LargeFile.txt';
var progress = 0;
var contentLength = 0;

fetch(url)
    .then((response) => {
        // 获取响应体的总长
        contentLength = response.headers.get('Content-Length');

        var pump = function (reader) {
            return reader.read().then(result => {
                if (result.done) return

                var chunk = result.value;
                var text = '';

                for(var i = 3; i < chunk.byteLength; i++) {
                    text += String.fromCharCode(chunk[i]);
                }

                // text 是一段信息 已经可以直接使用了
                // document.getElementById('content).innerText += text;

                // 处理进度
                progress += chunk.byteLength;
                console.log((progress / contentLength) * 100 + '%');

                return pump(reader)

            })
        }

        // 开始获取response stream
        return pump(response.body.getReader());
    })
    .catch(error => {
        console.log(error)
    })

```

+ 不必等待所有的响应数据到达再处理， 可以在chunk层级处理相应数据， xhr中是缓存所有的response
+ xhr中也可以设置流式处理，但是需要手动的组装数据
+ fetch 提供了byte级别的数据流处理，xhr是文本流，在某些场景下不能使用


##### 响应数据内容巨大时的处理方案

#### future-proofing


### 应用
#### 使用fetch实现请求取消
```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
    .then(res => {})

// 取消请求
$brn.onclick = () => {
    controller.abort();
}

```

#### 使用fetch实现超时中断
```js
const controller = new AbortController();
const signal = controller.signal;

fetch(url, { signal })
    .then(res => {})

// 取消请求
setTimeout(() => {
    controller.abort();
}, timeout);

```

#### 使用fetch实现请求进度
```js
const progress = 0;
fetch(url)
    .then(res => {
        const contentLength = res.headers.get('Content-Length);
        const pump = function(reader) {
            return reader.read().then(result => {
                const chunk = result.value;

                progress += chunk.byteLength;
                console.log((progress / contentLength * 100).toFixed(2) + '%' );
            })
        }
        return pump(res.body.getReader())
    })

```


## sendBeacon



## Blob
Blob对象表示一个不可变的、原始数据的类文件对象     
他的数据可以按文本或者二进制格式读取     
也可以转换成ReadableStream来用于数据操作

