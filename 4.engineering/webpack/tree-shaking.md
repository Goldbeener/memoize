# Tree Shaking

## 是什么
移除js上下文中的未引用代码   是DCE（dead code elimination）的一种。

`只有在es6引入模块规范之后才得以实现`

因为tree-shaking要求模块必须是静态的，静态模块规范在编译时就能确定模块的依赖关系

> CommonJS 动态模块规范，引入语句中可以使用参数，也可以在条件语句中引入模块
> 除非在执行时才能确认模块的依赖关系，因此不能做模块静态依赖分析，做tree-Shaking优化
> es6 静态模块加载，在编译阶段静态推导出语法树

```js
// 条件导入
var myModule;
if (condition) {
    myModule = require('module-a')
} else {
    myModule = require('module-b')
}

// 模块参数中含有变量
var otherModule = require(`${path}-module`)
```


ES6 的静态模块规范：
1. 要求所有的导入语句必须在模块顶层，不能在if条件语句中
2. 模块路径不能使用变量

通过这种限制，使得模块的依赖关系在编译时就能确认

### 有什么好处
减小包体积，提高性能

+ 删除引入但是未使用的代码块（函数、类等）
+ 删除对象中未使用的属性

> 传统的DCE消灭不可能执行的代码
> Tree-shaking 更关注消除没有用到的代码块


### sideEffects
正常情况下引入了但是未使用的代码都需要被删除
但是，某些情况下，引入了，但是没有显式的使用，而是作为项目整体，需要被打包的

比如： polyfill 

这些称之为 `副作用`

打包工具不能正确识别副作用，需要开发者手动声明。

> 对全局有影响的, 有引用到当前作用域之外的某些变量值


package.json中有`sideEffects`属性，作为标记，向compiler提供提示，说明项目中的哪些文件是`pure(纯es module)`，可以安全的删除文件中的未使用部分
+ 如果项目所有的代码都是纯es module，不包含副作用，那么可以直接设置为false
+ 如果部分有副作用，可以传递一个数组，数组每一项是有副作用的文件路径


### 限制
1. 使用ES6模块规范导入导出
2. 禁用babel对import和export的转义
3. 导出粒度要细，这样才能更好的发挥tree-shaking的功效
4. 避免模块级别的副作用

### 模块不能被tree-shaking时的操作 及工具
1. ModuleConcatenationPlugin webpack插件 
   1. 最初，webpack把每个模块都包一层IIFE，但是这会影响执行效率
   2. 模仿roll-up和Clousure Compiler， 将多个模块联合起来，包在一个IIFE下，这样有更好的执行效率
   3. 默认情况下production模式会开启，其他模式下需要手动开启
2. eslint-plugin-tree-shaking 标示出lib中所有可能影响tree-shaking的因素

### DCE VS Tree-shaking
已经有了dce，为什么还提出了tree-shaking？
1. dce是操作最终产物的（编译完成的），然后剔除其中的dead code; 鉴于js动态语言特性，很难完美的清除
2. tree-shaking是在编译阶段，引入代码模块的阶段
3. 理想状况下，dce和tree-shaking是等效的，但是js无法很好的实现静态分析，所以，tree-shaking往往表现更好

> UglifyJS 貌似是专门做dce清理的  rollup作者 建议 rollup+uglifyJs  

**DCE**
+ 代码不会被执行，不可到达的，比如return 语句之后的语句
+ 代码执行的结果不会被用到
+ 代码只会影响死变量 只写不读

**Tree-shaking**
消除引用了但是没有用到的模块，处理的是模块级别的依赖关系    
`更关注无用模块的消除`

依赖ES6模块语法的静态结构特性


> 在前端领域 DCE是和Tree-shaking配合使用的
> DCE消除模块内部的无用变量、函数、类
> tree-shaking消除引用了但没有使用的模块

总的来说，tree-shaking是提供了一个新的思路来消除无用代码，减少代码体积
表达的不是`消除dead code`，而是`保留live code`
它是从源头，编译阶段模块引入的时候，排除引用了但是未使用的模块

start with what you need and work outwards.

### 前端打包工具
webpack 和 rollup 都分别实现了tree-shaking 

webpack 没有消除模块中未使用的变量
rollup 会将模块中没有使用的变量、函数、类全部清除掉

## 怎么实现
原理
1. ES6静态模块特性 依赖关系是确定的，和运行时无关，可以进行可靠的静态分析
  1. 只能作为模块顶层的语句出现
  2. import的模块名只能那个是字符串常量
  3. import binding 是 immutable 的，引入的模块不能再被更改
2. 代码删除
   1. uglify: 判断程序流，判断变量是否被使用和引用，进而删除代码
      1. 不会跨文件做DCE
   2. terser

简单总结：
1. ES6 模块静态分析，可以再编译阶段判断加载了哪些模块
2. 静态分析程序流，判断哪些模块和变量未被使用或引用，进而删除对应代码


## 其他
+ rollup 只处理函数和import/export变量
  + class不会被处理
+ js动态语言特性使得分析比较困难
+ sideEffects 广泛存在
  
Tree-shaking 对顶层纯函数效果好

## 手写一个




const el = require('element.js');
ul = el()
const ulDom = ul.render();
document.body.appendChild(ulDom);



## References
+ [Tree-shaking versus dead code elimination](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80)
