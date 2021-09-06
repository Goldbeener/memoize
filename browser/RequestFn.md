# requestIdleCallback
应用代码期望尽快执行，
用户交互期望及时响应

`用户交互`与应用代码执行产生冲突, 用户的交互是优先级高的，否则会感到页面卡顿，造成不好的用户体验，因此在一些不重要的代码执行最好放在用户交互间隙（浏览器空余时间）执行

应用开发者 如果要监测用户是否正在操作，需要监听全部的用户事件，click、scroll、touch等；即使这些事件监听对于应用功能来说是不必要的，成本高，且不准确。

但是浏览器是精确的知道，在每一帧里浏览器引擎的空闲时间的

因此提供了`requestIdleCallback`这个api给开发者，在浏览器渲染间隙执行一些代码

解决方案： `requestIdleCallback`


## shim
```js
window.requestIdleCallback =
  window.requestIdleCallback ||
  function (cb) {
    var start = Date.now();
    return setTimeout(function () {
      cb({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };

window.cancelIdleCallback =
  window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  };
```

## usage
```js
requestIdleCallback(myNonEssentialWork, { timeout: 2000 })

function myNonEssentialWork(deadline: {
    didTimeout: boolean, 
    timeRemaining: () => number
}) {
    // 在空闲时间内，开始执行设定的任务
    while (deadline.timeRemaining() > 0 || deadline.didTimeout) {
        doWorkIfNeeded()
    }
    // 空闲时间结束 设定下一个空闲周期执行
    if (tasks.length > 0) {
        requestIdleCallback(myNonEssentialWork)
    }
}

```
设置截至时间，会在到期时，强制执行cb
并且cb的参数： timeRemaining函数返回0； didTimeout: true

## 应用场景

# requestAnimationFrame
## 是什么
常规的动画效果，需要使用定时器函数，setInterval；    
并且为了流畅的动画效果，一般要保证动画更新的频率是60fps    
因此一般的做法是

```js
setInterval(() => {
    // animate change
}, 1000 / 60);

// 或者递归调用setTimeout
```
1. 不能准确的在设定的时间点执行，实际运行依赖用户的浏览器实际情况
2. layout thrashing; 定时器函数会按照设定，重复的执行，即使在不必要的场景下，比如非激活页面等，会引起不必要的重绘重拍，耗费性能，在移动端上更甚。


现在：
浏览器原生提供的处理`js animation`的api

```js
function handlerRepeat() {
  console.log('>>>>sss');
  // 常见的用法是递归调用，会在每一次重绘前执行函数
  // 如果没有递归的话，只会执行一次，在下一次重绘之前调用
  requestAnimationFrame(handlerRepeat);
}
requestAnimationFrame(handlerRepeat);
```

接收一个回调函数，`浏览器会自动在下一次重绘之前调用该函数`

能够保证，回调函数是在每次浏览器确认要重绘的时机才开始执行，避免了不必要的工作。

后台的页面内，回调会被以很低的频率执行，甚至是不执行，节省了资源

> 也就意味着如果使用递归调用的话，浏览器会在每一次重绘的时候调用一次回调函数，而不考虑浏览器是否在空闲时间，
> 因此谨慎使用，不要把一些不重要、不需要实时的操作放在这里

### 优点
1. 浏览器内部优化，合并操作，更加高效、流畅
2. 隐藏的浏览器tab内不会被执行，节省cpu、gpu，提高电池寿命

## polyfill
```js
let lastTime = 0;

window.requestAnimationFrame = function(callback) {
  let currTime = +new Date;
  let timeToCall = Math.max(0, 16 - (currTime - lastTime));
  lastTime = currTime + timeToCall;

  return setTimeout(() => {
    callback(currTime + timeToCall)
  }, timeToCall);

}

```

## 应用场景

### 在指定时间做定量改变
```js
const el = document.querySelector('div');
const duration = 5000; // 指定500ms
const distance = 500; // 移动500px
let startTime = 0;

function doMove(current) {
  const past = current - startTime;
  const process = Math.min(1, past / duration); // 计算出当前进度，不超过1
  const dis = (distance * process).toFixed(2);

  el.style.left = dis + 'px';

  if (past <= duration) {
    requestAnimationFrame(doMove);
  }
}

requestAnimationFrame((current) => {
  startTime = current;
  doMove(current);
})

```

### 降低执行频率
正常的`requestAnimationFrame`执行频率大约是每秒60次，即每16.7ms一次， 与大多数浏览器的刷新频率一致。 并且`cancelAnimationFrame`也不支持参数设置执行频率

有些动画需要指定频率时，只能通过手动调整

```js
const hz = 20; // 指定每秒执行的次数
const timer = null;

function throttleRepeat() {
  timer = setTimeout(() => {
    // do sth
    requestAnimation(throttleRepeat);
  }, 1000 / hz);
}

requestAnimation(throttleRepeat); // 这样就会每隔50ms执行一次

// 这种场景下的取消，只需要取消定时器就行
clearTimeout(timer);
```



### 实现一个setInterval
```js
  let id = null; // TODO id怎么合适的return出去

  function ActiveInterval(callback, delay) {
    let startTime = performance.now()

    function loop(now) {
      if((now - startTime) >= delay) {
        startTime = now
        callback && callback()
      }
      id = requestAnimationFrame(loop)
    }

    id = requestAnimationFrame(loop)
    return id;
  }

  function CancelInterval(id) {
    cancelAnimationFrame(id)
  }


  const $start = document.querySelector('#start')
  const $pause = document.querySelector('#pause')

  $start.addEventListener('click', (event) => {
    ActiveInterval(() => {
      console.log(0)
    }, 1000)
  }, false)

  $pause.addEventListener('click', (event) => {
    CancelInterval(id)
  }, false)
```




# setImmediate
每一帧都执行


# shim VS polyfill


# 参考文档
+ [Understanding JavaScript's requestAnimationFrame](http://www.javascriptkit.com/javatutors/requestanimationframe.shtml)
+ [Using requestIdleCallback ](https://developers.google.com/web/updates/2015/08/using-requestidlecallback)
