# 框架本质

前端框架的本质是`提高开发效率`的, 并不是运行效率；
> 运行效率是浏览器层面的
> 前端开发者只是浏览器的使用者，运行效率的提要需要依赖浏览器的升级

针对状态与UI的一致问题，各个框架的解决方案是什么？

1. vue
2. react
3. svelte
   1. 纯编译时框架 没有运行时，
      1. 在编译时已经知道app内哪些数据会更新，而不是在运行时去diff确认
      2. 在数据改变时直接去修改对应的位置
      3. 思路： 在编译时确认数据状态修改的副作用，在运行时直接去修改，不需要diff
   2. 无virtual dom

## 视图编程范式

当前视图编程范式已经基本固化，无论使用的是什么视图编程框架，Vue、React、Angular，以及新兴的框架，Solid、Svelte等框架，所涉及的模型概念都是趋同的，无非是实现手段上、开发体验上各有特色

+ **声明式视图** 使用声明式描述视图，描述的是期望的视图结果，而不是命令式的操纵整个视图的变化全过程
+ **数据驱动视图** 数据是现代前端框架的核心，视图是数据的映射， `View = f(state)`
+ **组件化视图** 组件是现代前端框架的第一公民，视图页面是由组件搭积木完成的，组件设计的关键要素：props、slots、events、ref、context

## 框架核心点

### 精细化渲染

声明式视图，一个关键的技术点就是需要`确定数据变化导致的最小的DOM操作`;
越精准、越快速的确定最小化的dom操作命令序列，越好

其中，React的做法是，组建状态变化时，会以该组建为根，重新渲染整个组建树，是最粗力度的更新

vue、angular使用了vDOM，使用js对象描述dom结构，数据变化之后，先在vDOM层，对比js对象的变化，最后计算出最小的dom操作，再去更新视图。 通常只能做到组件层级的精细化渲染

而新兴的框架svelte、solid，抛弃了vdom的概念，采用静态编译的手段，将声明式的视图定义，转译为命令式的dom操作。源代码中的视图声明，被编译阶段直接转译成了一系列dom操作的命令序列。这样在数据变化时，直接就知道需要操作的dom命令，相对于vdom方案，减少了diff的过程

#### 预编译方案

在编译阶段确定，运行时不需要动态计算，是目前最高效的手段
但是，灵活性欠佳

#### 响应式数据

响应式数据的核心、本质就是`观察者模式`
状态和副作用函数的 同步

Signals 信号
与vue ref相同的响应性基础类型，强调读、写分离

#### 动静分离

### 去JS化

目前的前端框架，最终的编译产物大多数都是一个js文件，
页面加载时，先下载一个空壳html，在html内引入编译后的js代码，使用js动态生成整个页面结构

这样在seo、首屏渲染上表现不佳

现代框架的一个探索方向就是`去首屏JS化`; 希望尽可能多、尽可能快的展示首屏内容

对应的渲染策略

+ SSR 服务端渲染 页面的DOM结构生成逻辑在服务端直接执行，生成dom插入html返回，但是事件相关逻辑放在额外的js文件，还是在客户端加载
  + Progressive Hydration - 渐进水合
    + SSR解决了首屏的渲染事件，但是TTI还是需要等待额外的JS加载
    + PH 方案采用代码拆分的思路，将一些页面内容动态加载，优先加载、渲染首屏相关逻辑
  + 流式SSR
+ SSG 静态站点生成 在编译阶段直接生成页面内容
  + ISG 增量静态生成 纯SSG一个微小的变动就需要全量的再次生成，ISG可以增量的生成，减少编译成本
+

模板是静态编译，存在很大的优化空间
运行时编译，可以提供灵活性和普适性

## Vue

+ [关于vue响应式实现](https://juejin.cn/post/6992018709439053837)
+ [尤雨溪讲解vue3](https://codepen.io/collection/DkxpbE?grid_type=list)

## 好文

+ [当前前端框架存在的根本原因](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445)
+ [FlexNG 下一代Flex布局](https://docs.google.com/presentation/d/10e7bnBrkpNJj8aQXiofCJCslWpPtlxZyt7wZIw9NQrg/edit#slide=id.g7ecb50637a_1_9)
+ [Compositing memory investigation](https://docs.google.com/presentation/d/1_8PLdXVUPclq7aiWnTU7UES43NMjaUnRBbQYypmqrQQ/edit#slide=id.p)
+ [Reducing Web Font Loading Frictions](https://docs.google.com/presentation/d/123_mQWrDoNbpMQ4bXiHaJT_lli-Vy2DLY8aRp1aC2jU/edit#slide=id.p)
+ [Scrolling Update](https://docs.google.com/presentation/d/1cQZLTKzUWD2O0fUQhwaL4DbRckPPNiOjDqwfPYQzoDc/edit#slide=id.p)
+ [Use Zooming to implement DSF](https://docs.google.com/document/d/1CZSCPzOYujdUMyChocwzOBPKxYAoTsEoezMye30Hdcs/edit)
