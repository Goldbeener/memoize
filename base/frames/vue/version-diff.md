# Options API VS Composition API

composition API 优越在哪里？
**code Sharing**

Options API
    + mixins
    + Renderless components
    + class & function

Composition API
    + Composables: 可复用的响应式代码片段 函数形式，更加自由
    + 常量和依赖在模板中的使用更加便利

> 在composition API中，数据的响应式不再绑定vue组件；可以在纯函数中实现
> 使得复用更加方便 简单


## Renderless components
组件只有逻辑代码，没有dom相关的代码
依赖于slot 和 slot-scope
组件使用者注入dom代码

一层壳
将传入的数据 做一些通用处理之后； 以slot-scope的形式传递出去

```js

Promise.resolve()
.then(()=> {
    console.log(0);
    return Promise.resolve(4);
})
.then((res)=> {
    console.log(res)
})

console.log('>>>>');

Promise.resolve()
.then(()=> {
    console.log(1);
}).then(()=> {
console.log(2);}).then(()=> {
console.log(3);}).then(()=> {
console.log(5);}).then(()=>{
console.log(6);})

```
