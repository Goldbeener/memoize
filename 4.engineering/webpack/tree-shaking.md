# Tree Shaking

## 是什么
移除js上下文中的未引用代码   DCE（dead code elimination）

### 有什么好处
减小包体积，提高性能

> 传统的DCE消灭不可能执行的代码
> Tree-shaking 更关注消除没有用到的代码

### DCE VS Tree-shaking
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

### 前端打包工具
webpack 和 rollup 都分别实现了tree-shaking 

webpack 没有消除模块中未使用的变量
rollup 会将模块中没有使用的变量、函数、类全部清除掉

### sideEffects
package.json中有`sideEffects`属性，作为标记，向compiler提供提示，说明项目中的哪些文件是`pure(纯es module)`，可以安全的删除文件中的未使用部分
+ 如果项目所有的代码都是纯es module，不包含副作用，那么可以直接设置为false
+ 如果部分有副作用，可以传递一个数组，数组每一项是有副作用的文件路径

文件的副作用是什么？

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

