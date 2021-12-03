# 异步与同步
一般操作可以分为2个步骤
    1. 发起调用
    2. 得到结果
发起调用，立马可以得到结果的是为`同步`
发起调用，无法立即得到结果，需要额外的操作才能得到结果的是为`异步`


single threaded
single concurrent 

# 宏任务与微任务
## 宏任务
+ 主代码片段
+ setTimeout/setInterval/setImmediate(node)
+ I/O
  + click
  + scroll
  + ajax
+ UI render
+ requestAnimationFrame

在`本轮宏任务结束 + 微任务队列清空`之后, 可能会发生一波`render update`

浏览器render更新时机？
以及其与宏任务的关系？

`事件冒泡与下次宏任务执行顺序`
手动点击click事件 与 脚本调用el.click()的区别？

手动点击触发click事件
    click事件的回调函数作为events事件，
    冒泡触发的外层回调也是events事件，
    因此这两个都会被推入宏任务队列，在不同的loop内完成；
    并且事件冒泡时直接触发的，因此外层回调函数会在本次回调产生的宏任务之前执行的

脚本调用el.click()事件
    el.click() 看表现等同于 直接调用 click绑定的事件
    并且因为冒泡的原因，会直接触发外层click事件 [.click()同步触发了2个事件]
    此时可以理解为：调用栈内直接塞入了2个click绑定函数
    因此会把这两个绑定函数先执行，等调用栈内清空之后才开始微任务队列清空和下一次loop
    

断点对mutationObserver和promise的执行顺序影响？

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

mutationObserver触发机制
    在一次event-loop内，多次触发，最终回调函数只会执行一次
    防重发的味儿
        在一次mutationObserver触发时，会先判断当前微任务队列是否已经有对应的mo回调
            有的话，直接return
            没有的话
                先将mo回调标识置为true
                再将mo回调推入微任务队列

## 微任务
+ Promise.then/catch/finally  await之后的也是微任务
+ process.nextTick
+ Object.observe
+ mutationObserver

多个then场景下的微任务队列？
    是本轮微任务产生的新的微任务

主代码片段依次执行
遇到宏任务推入宏任务队列
遇到微任务推入微任务队列
主代码执行完毕之后，清空当前的微任务队列[发生在下次渲染之前]
    如果在执行微任务的时候产生了新的微任务，会把该任务放在当前微任务队尾，本次执行；
    如果产生了一个promise，要看该promise是什么状态
        如果是完成态，则then回调在本次执行；
        如果是pending态，则then回调会等待完成之后，再进入微任务队列

所有微任务执行完成之后；从宏任务队列取出第一个执行
    遇到宏任务推入宏任务队列
    产生微任务，推入微任务队列
    本次宏任务完成之后；清空微任务队列

取出当前宏任务队列第一个任务，继续执行

Call Stack || Micro Tasks || Task Queue || rAF || Render Tree || Layout || Paint || <OS Native calls to draw the pixels on a screen>

DOM (new changes), 
CSSOM (new changes), 
render tree, 
layout 
paint 
happen after requestAnimationFrame callback as per the event-loop timers. 

# Event Loop
调度这些事件
events、user interaction、 scripts、rendering、networking

每个线程都有一个event loop
每一个web worker也有自己的event loop
同源的浏览器tab共享一个线程？进而共享一个event-loop？


有`1+个`task queues
    task
        + events
        + parsing html解析
        + callbacks
        + using a resource  非阻塞的资源获取，一旦资源部分或全部可用之后，对资源的处理会是一个task
        + reacting to DOM manipulation 

有`1个` microtask queue

# Promise
+ Promise()
+ Promise.resolve()
+ Promise.reject()
+ Promise.race()
+ Promise.any()
+ Promise.all()
+ Promise.allSettled()
+ Promise.prototype.then()
+ Promise.prototype.catch()
+ Promise.prototype.finally()

## 组合

### Promise.all()
并行发起多个异步操作，
    只有所有的异步操作都resolve时，返回结果组成的数组（按照传入顺序）
    如果有任何rejected，那么直接将第一个reject错误信息抛出去

接收一个由promise组成的可迭代类型，可以是 Array、Map、Set
    如果可迭代类型中有非Promise值，这些值将会被忽略，直接放在结果数组中

```js
Promise.all([func1(), func2(), func3()])
    .then(([res1, res2, res3]) => {
        console.log('所有promise都成功')
    })
```

#### 异步同步
当传入的可迭代对象内包含值（无论是promise还是其他非promise值），那么all就是异步的；
当传入的可迭代对象是空的，空数组或者空map、set； all是同步的，直接fulfilled

```js
var p = Promise.all([1, 2, 3, 4]);
console.log(p); // 1 -pending

setTimeout(() => {
    console.log('setTimeout>>>>'); // 2
    console.log(p); // 3 -fulfilled
})



var p = Promise.all([]);
console.log(p); // 1 -fulfilled

setTimeout(() => {
    console.log('setTimeout>>>>'); // 2
    console.log(p); // 3 -fulfilled
})
```


## Promise

### Promise 多个then嵌套问题
promise.then(() => {})

then注册就是将其放入微任务队列

then的注册是在绑定的Promise的同步代码执行完成之后开始注册的
then的注册是Promise同步代码的一部分
then的注册与执行是不同的

