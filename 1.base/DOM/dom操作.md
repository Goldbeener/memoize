# DOM操作

## element

## 插入元素

+ el.append()
+ el.prepend()
+ el.before(span); 在节点前插入 [实验性]
  
在指定元素的指定位置，插入元素、html字符串、文本节点

+ el.insertAdjacentElement()
+ el.insertAdjacentHTML()
+ el.insertAdjacentText()

## Node

节点属性

+ innerHTML 内部
+ outerHTML
+ element.innerText
+ node.textContent

### textContent VS innerText Vs nodeValue

+ textContent获取所有元素内容，包括script、style元素，而innerText仅展示给人看的内容
+ textContent获取所有元素内容， innerText不会返回隐藏的元素
+ innerText会触发回流

node.nodeValue

+ 文档节点 document、element 等返回null
+ text、comment节点，返回内容
