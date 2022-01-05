`package.json`文件中的关于包文件信息字段

main： 包入口文件

browser：客户端侧的包，一般会使用`browser`字段指定的入口文件代替`main`字段指定的入口文件，特别是在包内包含有node侧不可用的功能

module： 打包产物是符合ESM规范的
`jsnext: main` 是与module相似的功能，只不过module更有可能成为标准

> pkg.module 只是打包了一个使用es6模块规范导入/导出的包； 而其他的es6 features 比如箭头函数、class等还是需要单独使用babel转换，否则打包产物不能正常运行在低版本环境

unpkg: 使用包的unpkg版本时，访问文件路径


bin： 包内可执行命令注册

types： 定义针对ts类型的入口文件

files: 包被安装的时候，应该包含的文件, 与`.npmignore`文件功能相反



`peerDependencies in npm`

一般在插件开发中比较常见，指定的是要使用该包的前提条件是必须安装哪些依赖；

与devDependencies 和 Dependencies 的区别在于，这个peer依赖往往是更高层级的全局依赖，放在前者之内会造成包重复安装或者版本冲突

`external in bundler[webpack/rollup]` 
external 是打包工具中与peerDep含义完全一致的概念

`npm install` 时， 不会安装peer deps；
但是打包的时候，bundler会遍历依赖树，找到代码中引用的包，然后打包进打包产物；
设置`external` 会告诉bundler不需要把这些包打包进结果产物中，即使这些依赖包已经被安装



sideEffects
本包是否会对包以外的对象产生影响，tree-shaking 的时候可以更加彻底


### unpkg
> unpkg is a fast, global content delivery network for everything on npm. Use it to quickly and easily load any file from any package using a URL like:  
> `unpkg.com/:package@:version/:file`

npm包的公共cdn访问路径

npm package.json文件中专门有一个字段`unpack`来指定，从unpkg中加载文件时返回的目标文件 
