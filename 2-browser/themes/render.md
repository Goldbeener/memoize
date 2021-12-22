# 渲染流程
**什么是渲染？**
将`web content`转换成`像素点`绘制在屏幕上
web content 就是页面中的所有元素，常见的web content
    Html
    css
    js
    images
    video
    canvas
    webAssembly
    webGL
    webVR
    PDF

**渲染的2个目标**
1. 将content转换成像素点
2. 同时产生一个数据结构，方便后续高效的更新
   1. 可能会导致更新的行为有
   2. js脚本
   3. 用户交互
   4. 异步加载
   5. 动画
   6. 滚动
   7. 缩放

渲染步骤
## 1. 解析
html --> DOM   **产物是DOM树**

HTML代表了页面文档的层次结构；
解析的过程就是将HTML转换成**文档对象模型** DOM

DOM是渲染引擎blink内核中表示页面的内部数据结构
也会暴露给JS引擎；V8对其封装后暴露出DOM web API；即操作的dom的api

## 样式表
处理样式
通过选择器，将css样式应用到对应的DOM元素上

元素可以被多种选择器规则命中，可能会产生样式冲突

浏览器中的样式解析器，会为每个dom元素计算出最终的样式规则
存储在computedStyle中，这是一个大的map

这个map也会暴露给js引擎

## 排版
确定所有元素的显示位置

块元素 block-flow
    按照DOM顺序将块元素依次垂直放置
    块元素高度
        文本高度
            字体 - 换行

最终得到每一个DOM节点LayoutObject
    这个对象与DOM节点并不总是一一对应的
    其中存储着不同的矩形坐标

## 绘制
将需要的绘制操作记录在一个display item list中
一个LayoutObject可能对应多个display item

这个环节并没有真正的绘制，只是在做绘制安排
## 光栅化
真正的执行display item list中记录的绘制操作流程

光栅化的产物是 位图
此时，像素还未显示在屏幕上

## GPU调用
由于浏览器每一个tab运行在一个沙箱隔离出的进程中
不能直接进行系统调用

因此会需要ipc调用GPU进程，进行实际的GL调用

## 动画
DOM --> style --> layout --> paint --> raster --> gpu
经过以上的路程, 内容已经变成了存储在内存中的像素了

不过页面不总是静态的，会有滚动、缩放、动画、动态加载等导致页面发生变化


## 合成
合成做了两件事情
1. 将页面分为不同的图层（主线程）
2. 在另外的线程中将这些图层合并 （合成线程）

动画、滚动、缩放等都是用到了图层的变化与合成
合成图层的好处在于，不会影响主线程的执行，引起卡顿

图层同样是树形结构
在确定排版对象的时候，会产生图层
因此在排版和绘制之间，其实还有合成的一步

DOM --> style --> layout --> **compisiting** --> paint --> raster --> gpu

## 上传
绘制完成之后， 上传阶段更新合成器线程上的图层树，
保证主线程和合成线程上的图层树保持一致
## 分块
光栅化的工作单元
图层巨大的时候，一次性光栅化会有很大开销；并且图层内不可见的部分不需要光栅化
因此需要分块，合成器线程会将一个大的图层分成多个小块

## 绘画
分块光栅化完成，合成器线程生成 **绘画矩形**

## 显示
浏览器进程 运行显示合成器组件  将绘画矩形绘制到屏幕上


![像素的诞生流程](../imgs/px.jpeg)

## references
+ [一颗像素的诞生](https://zhuanlan.zhihu.com/p/55192083)
+ [lifecycle of pixels](https://docs.google.com/presentation/d/1boPxbgNrTU0ddsc144rcXayGA_WF53k96imRH8Mp34Y/edit#slide=id.ga884fe665f_64_262)