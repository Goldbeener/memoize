# plugins

用来做拓展功能，操作对象是模块
可以做代码压缩、格式化、变量注入等工作

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

