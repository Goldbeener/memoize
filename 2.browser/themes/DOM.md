# HTML元素 尺寸属性

+ clientWidth / clientHeight
+ offsetWidth / offsetHeight
+ scrollWidth / scrollHeight
+ scrollLeft / scrollTop
+ offsetLeft / offsetTop

## clientWidth

![clientWidth](https://developer.mozilla.org/@api/deki/files/185/=Dimensions-client.png)

clientWidth = width + padding - 垂直滚动条宽度;

不包括border、margin和垂直滚动条

offsetWidth = width + padding + border;

## node.nodeType

只读属性，可用来区分不同类型的节点,

对应的值是节点类型常量

+ Node.ELEMENT_NODE = 1 元素节点
+ Node.TEXT_NODE = 3 元素中实际的文字
+ Node.COMMENT_NODE = 8 注释节点

+
