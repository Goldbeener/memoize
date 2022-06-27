# History

history对象
提供了对浏览器会话历史的访问、操作，以及对history栈中内容的访问、修改
挂载在window对象上

## 属性

+ length
  + 表示当前history栈的长度
+ state
  + 当前堆栈顶部记录的状态值
  + 每一条记录都有一个state对象，可以在pushState、replaceState时创建和修改
  + 在`window.popstate`事件回调中，可以获取到当前记录对应的state数据
  + popstate只会在两条历史记录导航时触发，即在history前进或后退时触发，不会再push和replace时触发

```js
// 历史导航切换 触发popstate 可以获取到当前栈顶记录的state对象
window.popstate = function(e){
  const state = e.state;
  // state 就是在push、replace时的第一个参数
}

// 页面重新加载时，可以获取当前的state对象
window.onload = function() {
  const currentState = history.state;
}
```

## 会话历史操作

+ `history.go(n)`
  + n可以是正整数、负整数和 0/undefined(不传参)
  + 正整数，前进n步
  + 负整数，回退n步
  + 0/undefined 刷新当前页面
+ `history.back()`
  + 向后回退一步，等同于点击左上角返回箭头
  + 在栈底时，无反应
+ `history.forward()`
  + 向前前进一步，等同于点击左上角前进箭头
  + 在栈顶时，无反应

## 添加和修改历史记录

+ `history.pushState(state, title[, url])`
  + 添加历史记录
  + 页面不会刷新，也不会检查url是否合法
  + 点击前进、后退时会生效
+ `history.replaceState(state, title[, url])`
  + 修改当前历史记录
  + 页面不会刷新，也不会检查url是否合法
  + 点击前进、后退时会生效

### 相关参数

+ state 必传  状态对象 最大640K
+ title 必传  标题字符串 一般传空即可
+ url 非必传 新的url记录
  + 可以是完整的绝对路径，任何合法的url均可
  + 可以是相对路径，相对于当前的url处理
    + 可以传递path部分
    + 可以以`?qs=xx`的形式，仅传递查询字符串部分
    + 可以以`#hash`的形式，仅传递hash部分

### 用法

1. 修改当前页面url参数

```js
window.history.replaceState({}, '', '?newQs=xxx')

```

## Vs location

location对象 表示当前文档对应的url信息
更关注当前文档的url信息

+ location.assign(url) 加载指定url的内容，当前页面会出现在history栈中
+ location.reload(true/false) 刷新当前页面
  + 参数代表是否从服务器加载数据 true-不是用缓存，必须从服务器加载数据
+ location.replace(url) 替换当前页面，并且当前页面不会出现在history栈中
+ location.href 可读可写属性
  + 读， 返回当前页面完整的url
  + 写，跳转到指定的url，当前页面会出现在history栈中

> history 和 location 更偏重于导航
> window.open 更偏重于打开页面，新页面与父页面一般没有导航历史关系

### window.open()

用指定的名称将指定的资源加载至浏览器上下文
基本上也是打开一个新页面
