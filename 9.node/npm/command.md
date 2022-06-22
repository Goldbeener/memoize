# npm command

## npm ci

npm clean install

+ npm 版本大于v5.7.1
+ 项目中必须要有lock文件，如果没有会直接报错
+ 删除当前项目中的node_modules
+ 按照lock文件内的信息安装依赖
+ 如果lock文件和package.json文件内的依赖版本不匹配，直接报错
+ 适用于ci/cd模式下的安装
+ 不会改写package.json和lock文件

> npm install 可能会改变package.jsonhe lock文件
> 当npm install 带参数时，`npm install <packageName>` 改变package.json和lock文件
> 当npm install 不带参数时，安装/更新全部依赖，更新lock文件
