# PostCSS

**并不是一个css预处理器**
> 但是搭配一些列插件，PostCSS可以实现 css预处理器的功能

是使用JS工具和插件，处理/转换css的工具
PostCSS 接受一个`css文件`，将css文件解析成AST，然后通过特定的API来分析修改他的规则

PostCSS 是一个基础设施，它可以让一系列插件在其上运行。 每个插件可以有自己的任务。
> 是一个运行环境

以此可以实现很多功能：  

+ 检查css
+ 支持变量和mixins
+ 编译尚未被广泛支持的css语法
+ 内联图片
+ 自动增加浏览器内核前缀 `Autoprefixer`

有很多有用的插件

## 运行时机

PostCSS 是在其他css预处理器完成工作之后，在生成的css文件中作用的

## 插件

大多数插件基本上就做2件事情
1. 在css文件里面查找指定的内容， 比如，查找css文件中的`will-change` 属性
2. 操作(增、删、改)找到的内容，比如，在使用`will-change`的地方，加上`transform: translateZ(0) `做低版本浏览器兼容

### 前置
Postcss会将CSS文件解析成AST，这个语法树结构包含如下内容
> [postcss AST explorer](https://astexplorer.net/#/2uBU1BLuJ1)

+ Root css文件
+ AtRule 类似`@media`这样的block
+ Rule 普通的css选择器区块
+ Declaration 选择器区块内的键值对，具体的css规则
+ Comment 注释

![WechatIMG241.png](https://s2.loli.net/2023/03/28/9YXVayd8PcsKkxD.png)
![WechatIMG240.png](https://s2.loli.net/2023/03/28/yofrsLlwRMzDHq1.png)

插件可以遍历这个AST结构，然后对其进行修改
这就是Postcss插件生效的机制

### 自定义插件
插件基本结构如下

```js
module.exports = (opts = {}) => {
  // Plugin creator to check options or prepare caches
  return {
    postcssPlugin: 'PLUGIN NAME'
    // Plugin listeners
    Rule(rule) {
      // 每一个css选择器都会触发
    },
    Declaration (decl) {
      // All declaration nodes
      // 每一条css规则触发
    }
    // 详细的事件列表 https://postcss.org/api/#plugin
  }
}
module.exports.postcss = true
```


