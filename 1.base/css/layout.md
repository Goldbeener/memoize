# layout

+ flow layout 流式布局
+ flexbox layout flex布局
+ grid layout grid布局

## flow layout

流式布局

从上到下

块元素
行内元素
行内块

## flexbox

以行列的形式，安排一组元素，
主轴排列、交叉轴对齐

flex 布局

flex容器
flex元素

+ 主轴
  + 所有元素沿着主轴分布，被主轴穿一个串
+ 交叉轴
  + 与主轴垂直
  + 伸展元素至填充整个容器

## flex direction

### flex-direction

+ row (默认)
+ column

主轴方向

### 主轴上的排列设置

#### justify-content

元素分布设置

+ flex-start
+ center
+ flex-end
+ space-between
+ space-around
+ space-evenly

#### gap

元素间隔设置

## AlignMent

交叉轴上元素对齐方式

### align-items

批量的设置所有元素在交叉轴上的对齐方式

+ flex-start
+ center
+ flex-end
+ stretch
+ baseline

### align-self

设置单个元素在交叉轴上的对齐方式

+ flex-start
+ center
+ flex-end
+ stretch
+ baseline

### 假设尺寸

在流式布局内，元素的尺寸是硬编码的，用witdh、height属性，硬性规定了元素的尺寸是多少
根据不同的容器尺寸，可能会滚动或隐藏

但是在flexbox布局中，width、height尺寸是理想尺寸，当容器空间合适，按照这个理想尺寸渲染
当容器空间不足或者超额的时候，会自动的增大或缩小

### 伸缩

+ flex-basis
+ flex-grow
+ flex-shrink

#### flex-basis

元素在主轴方向的尺寸
当主轴横向的时候，就是宽度，等同于width
当主轴纵向的时候，就是高度，等同于height

一个属性可以兼容不同方向上的尺寸

#### flex-grow & flex-shrink

容器内，主轴方向上，`额外尺寸`或者`不足尺寸`的分配比例
