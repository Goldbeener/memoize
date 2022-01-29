# BFC

## 背景
常见的布局定位方案
1. 普通流式布局
2. 浮动
3. 绝对定位

Block Formatting Context: 块级格式化上下文     
属于普通流式布局的一种特殊情况

BFC会创建一个渲染区域，并且有一套渲染规则，决定子元素如何定位，以及和其他元素的关系和相互作用。不会在布局上影响外部的元素

## 规则
使用BFC可以用来`矫正定位`和`清除浮动`;    
因为一个BFC盒子的建立，往往会有3个作用     
1. 一个BFC包含内部的浮动元素
   1. 可以清除浮动
2. 一个BFC排除外部的浮动元素，`不会与其他浮动元素的外边距有重合的地方`
3. 2个BFC下的div不会发生margin折叠
   1. 同一个BFC下的会

## 触发条件
1. body
2. 浮动元素: float
3. position: absolute\fixed 
4. display: inline-block;flex
5. overflow: hidden\scroll\auto


### Margin 塌陷
两个div 垂直方向的外边距，margin     
实际渲染会按照最大的那个来
