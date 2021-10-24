插件是webpack的核心，大部分功能是通过内部插件或者第三方插件来完成

插件的先后顺序是否影响构建结果？
不同顺序会影响哪些东西？

webpack插件是面向配置的，不是面向过程的
面向过程，管道化，每一步输入、输出、完成什么任务，是清晰可见的，修改的心智负担也低，处理机制非常纯函数化。

gulp是一个task runner
webpack 是一个module bundler

如何让解决前端工程构建？
webpack 给出的答案是： webpack + loaders + plugins 让`一切资源`构建`可配置`
loader 解决不同资源的差异化，使得最终的产物都是webpack可处理的`module`
plugin 解决配置化问题

**vue-cli create-react-app 脚手架工具**
> webpack上层工具，在webpack基础上进一步封装，自动生成了一些webpack配置



1. loader 和 plugin区别
> loader 是一个转换器，将A类型文件转换成B类型文件
> 本质上是因为webpack原生只支持js、json文件的识别和处理，需要将其他类型文件转换成webpack可以识别的文件类型

> plugin 是一个扩展器 监听webpack打包过程中的某些节点，执行自定义扩展任务
> 包括代码压缩、自动补全、环境变量注入、重写html文件等


