# 理解Vue中的effectScope

## 先从effect讲起

`effect`是响应式框架（比如Vue、react）里面的一个常见术语，又名`side effect` `副作用函数`。

如果你对函数式编程有所了解，那就应该知道之所以叫`副作用函数`，是相对于`纯函数`对外界无任何影响来讲的，副作用函数的执行，会改变一些全局状态或者公共状态。

忽略这些专业术语，effect在响应式系统里面，仅仅指的是应用定义的一些实现某些特定功能的方法。
就像：

```js
const foo = () => {
  // do something 实现某些功能
}
```

effect的含义就是这么平平无奇，正常框架并不关心这个effect函数里面具体做了什么，仅仅知道有这么一个函数要执行。

但对Vue来说，有一些不同，Vue通过effect来实现响应式系统，来监听数据变化。最终的效果就是：**如果你的effect函数依赖了一些响应式数据，当数据发生变化时，Vue会自动的重新执行这个effect函数**。

effect函数谈不上是好的、坏的或者是先进的技术，实际上应用逻辑里面到处都是。

比如，Vue应用里面最最常见的effect函数场景就是`DOM操作`， Vue将DOM操作抽象成`template`， 然后将template编译成render函数，render函数本质和上面的foo函数一样，就是一个effect，在依赖的响应式数据变化时自动执行。这也是Vue实现`状态与UI同步`的原理。

另一个常见的effect函数场景是，假如在数据变化时，你需要做一些手动dom操作，Vue提供了`watchEffect` API， 传递一个lambda匿名函数，Vue会无脑的在数据变化时执行这个函数，完全不关心函数到底干了什么。 就给开发者一个契机，在数据发生变化时，定制一些操作。

> VueJS discovers your dependency on reactive data by running your effect. As long as your effect accesses any reactive data (say, yourState.bar) during its execution, VueJS will notice that and record a dependency of your effect on yourState.bar
> --- Vue官网文档

本质上，Vue的响应式系统就是经典的`可观察/订阅模式`的现代版本:
响应式数据是被观察者，effect函数是观察/订阅者。

如果从这个角度看，有一个问题无法避免：任何订阅行为都必须配合着取消订阅的行为。否则就会造成内存泄漏，因为这个订阅关系始终在内存中保有无法被释放。 Vue针对这个问题，提出了一个RFC，叫做`effect dispose`。

一般来说，取消订阅需要关注两个点：

1. 什么时候取消订阅
2. 如何取消订阅

## effectScope

在典型的响应式框架里面，上述两个问题是需要开发者处理的，因为开发者是唯一清楚知道，什么时候订阅关系不再需要，以及如何释放在创建订阅时分配的资源。

但是在Vue应用中，开发者几乎不需要关注这两个问题，因为Vue框架内部已经做了这些工作: Vue的响应式系统是以组件为单位的，组件setup时会自动创建副作用函数(render函数)与响应式数据(组件状态)的关联关系（创建订阅）；在组件卸载时会自动销毁关联关系（解除订阅）。 这一套机制在Vue中叫做`effectScope`, 做的工作就是把状态与副作用函数的关联关系与对应组件的生命周期绑定。

原则上来讲，每个组件都会创建一个`effectScope`。组件内的所有effect函数都会关联在这个scope内，当组件卸载时，Vue会销毁这个scope，同时清除所有关联的effect。

有一个RFC提议将`effectScope`暴露成一个公共API，可以脱离Vue组件独立使用。这可能是因为Vue3顶层设计是模块化的，响应式系统可以脱离整个Vue独立使用，在这种场景下，`effectScope`可以帮助开发者方便的处理effect的副作用。
