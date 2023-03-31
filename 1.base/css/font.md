# 字体

---

## 字体的构造和度量

### 字体的构造与度量

在西文字体中，每个字体有一个EM Square，可以理解为一个设置了大小的方块，能够合理的容纳所有的字符

在数码排印中，根据不同的字体设计，每类字体都有固定的一个EM值，

在OpenType中，字体通常是1000；在TrueType中，通常是1024或2048

注意这个单位是无符号的相对单位，在实际字体渲染中会根据情况进行缩放

> 在字体排版中更多关注的是字体的高度，因此下面的字体度量都是字体纵向的度量值

#### 字体的度量

![](https://pic1.zhimg.com/v2-09fee043c5e22775372aaba48ed2efc0_r.jpg)

**几条线**

- baseline 基线
  
- mean-line 小写字母x最高点所在的线 （**注意明确是小写字母x的高度，因为有些小些字母会有不同的高度**）
  
- cap-line 大写字母最高点所在的线
  
- ascender line 与小写字母x相比，向上延伸的那些小写字母的最高点所在的线
  
- descender line 与小写字母x相比，向下延伸的那些小写字母的最低点所在的线
  

**几个高度**

- x-height 基线之上，小写字母x的高度
  
- cap-height 基线之上，大写字母的高度
  
- ascent 基线之上，比小写字母x高的那些字母的最大高度
  
- descent 基线之下，小写字母的高度，比如j、g这些字符在基线之下的高度
  
- line-gap descender line到下一行ascender line之间的距离
  

> line-gap 并不是行距，行距是两行文字基线之间的距离

## 字体渲染

### 字体设计

![](https://pic1.zhimg.com/v2-870395efa10d2f4e042544bf47b6c43c_r.jpg)

每个字符占的区域，em-square / UPM (units per em) ，通常是1000、1024、2048等值；这个值算是一个基础；一般设计是等于 ascent + descent

但是，实际渲染使用的是HHead *Ascent*/*Descent*; （非windows，windows有专门的一组值）

这一组值通常与ascent + descent值有出入，不同的字体可能比设计值大或者小；浏览器渲染的时候会按照实际值与设计值的比例，等比的缩放给定的font-size

如果给一段文字加上背景色，会发现色块的高度是跟font-size值是不一样的，这块区域的高度就是HHead *Ascent*/*Descent*的值，叫做content-area。也就是说背景颜色生效的区域就是这个content-area

content-area = HHead ascent + HHead ascentdescent

如下图Catamaran font的渲染效果

em-size： 1000

x-height: 485

cap-height: 680

ascent: 770

descent: 230

HHead Ascent: 1100

HHead Descent: 540

> 通常字体文件还有一组Win Ascent / Win Descent；是供windows系统渲染使用。这组值也可能有不同的值
> 
> HHead: Horizontal Header table

### font-size的值

font-size设置的值表示什么？

表示的是一个字体em-square对应的大小；

也就是按照font设计值对应的高度，实际的值还需要按照HHead的值做缩放

### line-box

p标签内，包含多个span元素或者纯文本元素，因为宽度问题，换行展示

每一个行都称为一个line-box

一个line-box可能包含**行内元素**和**纯文本**，这些都会产生一个inline-box行内盒子

行内盒子的高度，是由该行内元素的child的最高点和最低点确定的，一个行内元素默认总是包裹所有的子内容。（tall enough to contain all its children）

> 总的来说就是行内盒子是由内容高度决定的
> 
> 内容又是由字体大小决定的
> 
> 字体的内部是HHead ascent/ descent 高度决定

##### inline-box

inline-elements

1. 普通的inline元素，比如(`<span>`, `<b>`, `<a>`, etc.)
  
2. 特殊inline元素
  
  1. replaced inline elements (`<img>`, `<input>`, `<svg>`, etc.)
    
  2. `inline-block` and all `inline-*` elements
    
  3. inline elements that participate in a specific formatting context (eg. in a flexbox element, all flex items are *blocksified*)
    

所有的行内元素有2个高度

1. content-area 与字体设计度量（font metrics）有关，直观体现就是background生效的区域
  
2. virtual-area 高度就是line-height高度，用来参与计算line-box的高度, 也就是占位的高度
  

![](https://iamvdo.me/content/01-blog/30-css-avance-metriques-des-fontes-line-height-et-vertical-align/line-height.png)

content-area 与 virtual-area 的差值叫做leading；leading的值平均分配在content-area的上下两边，也就是说content-area在virtual-area区域中始终是居中的

line-height也就是virtual-area的高度可能等于content-area，也可能大于或小于。小于的情况下，leading是负值

- 对于普通inline元素，padding、border会增加background区域，但是不会影响content-area的高，也不会影响line-box的高度； margin-top/bottom没有影响
  
- 对于特殊的inline元素，高度是由height、margin、border等属性共同决定的，如果height值是auto，line-height（virtual height） === content-area
  

## line-height

line-height： normal？ 意味着什么

根据font-family的不同，实际上就是font设计的不同

line-height： normal情况下， 最终的值是：

（content-area + line-gap）/ em-square * font-size

> 因此将line-height设置为1是一个不太好的做法
> 
> 因为line-height的无单位数值是以font-size为基准的，这个值与实际的content-area还是不同的，可能会导致virtual-area的值小于content-area

以Arial字体为例

em- size：2048

HHead ascent: 1854

HHead descent: 434

line-gap: 67

在font-size： 100px， line-height： normal的设置下，最终的高度

（1854 + 434 + 67） / 2048 * 100 = 115px

这个就是line-height的最终值

content-area： （1854 + 434 ） / 2048 * 100 = 112px

> line-gap不参与文字垂直居中的计算，**垂直居中的中点始终是content-area的中点**

## vertical- align

### baseline

默认值

line-box的baseline，与容器的baseline重合

> 在使用vertical-align的时候，容器默认会有一个不可见的零宽字符，这个字符应用该容器的字体，决定了容器的baseline位置
> 
> 使用vertical-align的时候，就是用这个零宽字体确定的容器的baseline与子元素的baseline做定位

### middle

子元素的中线，与容器的`baseline + x-height/2` 位置对齐

会因为容器字体的不同，会有不同的表现

### numberical-value

数字值

是子元素baseline，相对于父元素的baseline做上下移动，正数向上，负数向下

**所有的vertical-align，对齐的都是virtual-area，也就是line-height决定的区域** 

## 关于字体的一些问题

移动端开发，在安卓手机上总是会遇到，在按钮里或者在tag标签里，字体偏上的问题，或者是同一行，文字+数字金额混排水平对齐问题等

这些问题本质上就是因为在content-area区域内，ascent/descent的分配比例不同导致的；

同样是1000单位的em-square；ascent800 + descent200；与ascent200 + descent/800的设计，文字中线是不会对齐的

但是这些问题在css层面无法容易得到控制，因为目前css还无法做到对字体度量的调整。

不过，可以根据上面的知识，在已知具体的某一类字体度量情况下，对该字体做微调。但是这个并不通用，前提条件是知道字体的度量值，或者运行时动态获取。


## Font Metrics 获取方式
+ [FontMetrics.js](https://github.com/soulwire/FontMetrics)
  + 使用Canvas渲染对应字体的文字，
  + 使用getImageData对渲染出来的内容进行分析
+ [opentype.js](https://github.com/opentypejs/opentype.js)
  + 解析字体文件，ttf、woff等，获取字体的metrics信息