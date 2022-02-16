## 一些忽略的点

### 获取文件路径
在node环境下，有时候仅仅希望获取文件路径，而不是导入并执行
```js
const path = require('path')
const sfs = require('fs-extra') //导入并执行

// 一种方法是手动拼接路径
const filePath = path.join(__dirname, 'xxx');

// 另一种方法使用require.resolve
const modulePath = require.resolve('module-name')

sfs.readFile(modulePath, 'utf-8', (err, data) => {
    console.log('>>>', data)
})
```