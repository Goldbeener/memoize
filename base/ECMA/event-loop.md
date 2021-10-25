# 异步事件

# 事件循环机制

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


