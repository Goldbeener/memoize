## less 全局变量/mixins自动化导入
1. 使用`loaderOptions.less.globalVars` 传入零散的颜色变量
2. 使用 `style-resource-loader`
```js
// vue.config.js
const path = require('path');

module.exports = {
    chainWebpack: config => {
        const types = ['vue-module', 'vue', 'normal-modules', 'normal'];
        types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))
    }
}

function addStyleResource(rule) {
    rule.use('style-resource')
        .loader('style-resources-loader')
        .options({
            patterns: [
                path.resolve(__dirname, './path/to/less-mixins')
            ]
        })
}
```
