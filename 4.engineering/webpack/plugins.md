# plugins

用来做拓展功能，操作对象是模块
可以做代码压缩、格式化、变量注入等工作

**在webpack4.0内， 一切都是插件**

## 定义

plugin本质是一个有apply方法的类

```js
const pluginName = 'ConsolelLogOnBuildWebpackPlugin';

class ConsolelLogOnBuildWebpackPlugin {
    constructor(options) {
        // 用户使用插件时传入的配置
    }
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log('webpack 构建过程');
            compilation.normoal
        })
    }
}

```

```js
beforResolve(resolveData, callback) {
    const { 
        contextInfo: { 
            issuer, // 引用当前文件的文件的绝对路径
        },
        request, // 当前被处理的目标文件相对路径
        context, // 当前被处理的目标文件所在的目录
    } = resolveData;

}
```

# tapable

webpack实现的一个工具库，webpack内的许多概念都是tapable的示例

1. compiler 顶层 中央调度 是涵盖webpack工作整个生命周期 编译器
   1. 必须通过compiler来访问其他实例
   2. 接受options，创建compilation
2. compilation 编译
   1. 由compiler创建
   2. 代表一次完整的编译
   3. 依赖图谱绘制、遍历算法、打包、渲染、树摇
      1. 一次编译的整个过程都包含于compilation
      2. 可以根据compilation暴露的钩子，在合适的阶段介入其中，干预编译结果
3. resolver
   1. webpack实现的模块路径解析
      1. enhanced-resolve 独立的库，可以使用在webpack之外
   2. 根据路径得到对应的模块的详细信息，路径可以是不同的格式，相对路径、绝对路径、带别名等
      1. path
      2. context
      3. request
      4. results
4. module factories
   1. 根据上一步的resolver解析的结果，对某一个文件，创建一个对应的模块
   2. 创建实例 Module Object
5. parser
   1. 根据Module Object，解析其中的源码，转换成AST
   2. 遍历AST，识别其中的**导入语句**， import/require等
      1. **这个地方可以做一些研究，源码解析成ast，识别出其中的特定语句**
   3. 根据导入语句，识别依赖，添加到Module Object中
6. template 数据绑定 模块对象的数据绑定
   1. chunk、module、dependency 不同层级的实体都有template
   2. 每个层级的实体都被IIFE包裹，然后生成最终的打包产物

入口模块，带有依赖
放在chunk内，添加各种插件
  添加追踪信息
  排序
  优化
处理依赖导入语句，因为import或者require语句在浏览器中不生效
渲染

webpack的三个核心步骤

1. 构建依赖图谱
2. 优化图谱
3. 渲染

webpack在幕后做了什么工作
解析文件，将所有文件绑定在一个单独的依赖关系图中

插件系统，tapable + hook  暴露了这个过程的关键节点，可以在其中任意插入处理程序，做功能拓展

如何在vscode中debugger
