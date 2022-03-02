# 与webpack的不同
1. webpack使用ast，解析代码，最终产物是ast生成的代码，而不是开发者源码
2. rollup 最大程度的保留源代码
3. webpack 将模块包裹在function内，这是moduleFactory的作用，将各种模块包裹在iife函数内； rollup不
4. webpack使用loader 加载模块



# rollup tree-shaking的限制
1. 对象内无用的方法并不会被清除 （当前最新版本已经支持）