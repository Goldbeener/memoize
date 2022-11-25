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

## template标签

template标签的dom结构不会在页面上展示渲染，
可以被js获取，用来动态创建dom结构

> 一般用在需要用js动态创建复杂的dom结构的场景

```html
<template id="burger-template">
  <button type="button" aria-expanded="false" aria-label="Menu" aria-controls="mainnav">
    <svg width="24" height="24" aria-hidden="true">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
    </svg>
  </button>
</template>
```

```js
// 判断支持template
if ('content' in document.createElement('template')) {
  // 获取到template
  const template = document.querySelector('#burger-template')
  // 复制dom结构 不要直接使用，直接使用可能会有错误
  const content = template.content.cloneNode(true)
  // 挂载到指定位置
  container.append(content)
} else {
  // 使用其他备用方式实现
}
```

相比hidden的dom结构,template有以下优点

+ template 内的结构式完全惰性的，图片、脚本、css等资源不会被加载，样式也不会被解析
+ template 内的结构不做合法性校验，可以包含`td`、`li`、`dd`等正常情况下需要特定父级的元素
+ 不会受css的影响。hidden的元素可能收到css的影响，出现错误展示的场景
+ template更加语义化
