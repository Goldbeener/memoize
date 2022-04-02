# 状态模式
主要解决的问题是：     
当控制一个对象的状态转换的条件表达式过于复杂的情况，    
把状态的判断逻辑转移到表示不同状态的一系列类中     
减少相互间的依赖，可以吧复杂的判断逻辑简化

**状态模式是一种行为模式，在不同的状态下有不同的行为，将状态和行为解耦。**

将与特定状态相关的行为局部化，并且将不同状态的行为分割开来

对象的行为取决于它的状态，并且必须在运行时刻根据状态改变行为


## 状态机

有限状态机 
+ 初始状态值
+ 有限的一组状态
+ 有限的一组事件
+ 由事件驱动的一组状态转移关系
+ 有限的一组最终状态

简介版：
+ 状态
+ 事件
+ 转换

## 状态图


## Tools
+ [xState 状态机可视化工具](https://xstate.js.org/)

## references
+ [降低前端业务复杂度新视角：状态机范式.md](https://github.com/lecepin/blog/blob/main/%E9%99%8D%E4%BD%8E%E5%89%8D%E7%AB%AF%E4%B8%9A%E5%8A%A1%E5%A4%8D%E6%9D%82%E5%BA%A6%E6%96%B0%E8%A7%86%E8%A7%92%EF%BC%9A%E7%8A%B6%E6%80%81%E6%9C%BA%E8%8C%83%E5%BC%8F.md)
+ [有限状态机在 CSS 动画中的应用](https://github.com/dawn-plex/translate/blob/master/articles/css-animations-with-finite-state-machines.md)
+ [如何直观的在JavaScript中管理状态](https://zhuanlan.zhihu.com/p/41605462)
