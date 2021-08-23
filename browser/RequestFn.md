# requestIdleCallback
应用代码期望尽快执行，
用户交互期望及时响应

`用户交互`与应用代码执行产生冲突, 用户的交互是优先级高的，否则会感到页面卡顿，造成不好的用户体验，因此在一些不重要的代码执行最好放在用户交互间隙（浏览器空余时间）执行

应用开发者 如果要监测用户是否正在操作，需要监听全部的用户事件，click、scroll、touch等；即使这些事件监听对于应用功能来说是不必要的，成本高，且不准确。

但是浏览器是精确的知道，在每一帧里浏览器引擎的空闲时间的

因此提供了requestIdleCallback这个api给开发者，在浏览器渲染间隙执行一些代码

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
```ts
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
# requestAnimationFrame


# setImmediate
每一帧都执行



shim VS polyfill
