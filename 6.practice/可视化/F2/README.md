# F2

## 图表

图形语法要素

+ `坐标系` Coordinate
  + 直角坐标系（笛卡尔坐标系）
  + 极坐标系
+ `坐标轴` Axis
  + 直角坐标系（笛卡尔坐标系）
    + 坐标轴线 line
    + 刻度线 tickLine
    + 刻度文本 label
    + 网格线 grid
  + 极坐标系
    + 角度
    + 半径
+ `几何标记` Geometry
  + Line 线
  + Interval 区间
  + Point 点
  + Area 面积
+ `图例` Legend
+ `图形属性`
  + 位置
  + 颜色
  + 大小
  + 形状
+ `提示信息` Tooltip
+ `辅助标记` Guide
  + 辅助线 预警线、最高值线
  + 辅助框
  + 文本
+ `数据标签` DataLabels

## 图形语法

`对于F2来说，没有具体的图表类型的概念，所有的图表都是通过组合不同的图形语法元素形成的`

+ `数据`
+ `几何标记`
  + 点、线、多边形
+ `度量`
  + 数据空间到图形属性空间的转换桥梁
  + 度量
    + 度量类型
      + 'identity' 常量类型数值
      + 'linear' 连续数字 [1,2,3,4,5]
      + 'cat' 分类 ['男', '女']
      + timeCat 时间类型
    + 度量属性 不同的度量类型，支持不同的配置，对度量的展示做定制或format
+ `坐标系`
  + 笛卡尔坐标系[默认] rect
  + 极坐标系 polar 适用于周期性数据的可视化
    + 饼图
    + 玫瑰图
    + 雷达图
+ `辅助元素`
  + 坐标轴
  + 图例
  + 提示信息
  + 静态辅助标记Guide

## 绘图

+ 图形标签 Shape
  + Group
    + rect
    + circle
    + sector 扇形
    + polygon 多边形
    + line
    + arc 圆弧
    + polyline 多点线段
    + text
    + image
+ 绘图属性
+ 动画属性
+ 时间属性

### 自定义View

+ withLengend 自定义lengend样式
+

### 组件API

+ Children
+ Component
+ Canvas 图表所在的画布对象
+ Timeline 组件事件播放控制
+ Chart 图表组件
  + 属性
    + data
    + scale 度量 比例尺
    + coord 坐标系
  + 几何标记 Geometry
    + 属性
      + x x轴的数据映射字段名
      + y y轴的数据映射字段名
      + color
        + 固定值
        + 字段名映射
        + Array
        + Object
        + 指定映射类型
      + size
      + viewClip
      + adjust
      + startOnZero
      + animation
    + 方法
      + getXScale
      + getYScale
      + getSnapRecords(point)
    + 实例
      + Line 折线类型图表 折线图、曲线图、阶梯线图
      + Interval 区间 绘制柱状图、直方图、南丁格尔玫瑰图、饼图、条形环图、漏斗图
      + Point 点图、折线图中的点
      + Area 区域(面积)图、层叠区域图、区间图
  + 坐标轴 Axis
  + 图例 Lengend
  + 提示 Tooltip
  + 标注 Guide
    + 内置标注
      + PointGuide
      + TextGuide
      + TagGuide
      + ImageGuide
      + LineGuide
    + 自定义标注
      + withGuide
  + 滚动条 Scrollbar 数据滚动和缩放

## 实现

`JSX语法，构建图表`

需要在运行前对JSX语法进行编译

### JSX transform

+ babel
+ ts

2种编译模式

+ classic
+ automatic
