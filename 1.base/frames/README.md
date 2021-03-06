## 框架本质
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



+ [当前前端框架存在的根本原因](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445)

## Vue
+ [关于vue响应式实现](https://juejin.cn/post/6992018709439053837)
+ [尤雨溪讲解vue3](https://codepen.io/collection/DkxpbE?grid_type=list)

## 
+ [FlexNG 下一代Flex布局](https://docs.google.com/presentation/d/10e7bnBrkpNJj8aQXiofCJCslWpPtlxZyt7wZIw9NQrg/edit#slide=id.g7ecb50637a_1_9)
+ [Compositing memory investigation](https://docs.google.com/presentation/d/1_8PLdXVUPclq7aiWnTU7UES43NMjaUnRBbQYypmqrQQ/edit#slide=id.p)
+ [Reducing Web Font Loading Frictions](https://docs.google.com/presentation/d/123_mQWrDoNbpMQ4bXiHaJT_lli-Vy2DLY8aRp1aC2jU/edit#slide=id.p)
+ [Scrolling Update](https://docs.google.com/presentation/d/1cQZLTKzUWD2O0fUQhwaL4DbRckPPNiOjDqwfPYQzoDc/edit#slide=id.p)
+ [Use Zooming to implement DSF](https://docs.google.com/document/d/1CZSCPzOYujdUMyChocwzOBPKxYAoTsEoezMye30Hdcs/edit)

