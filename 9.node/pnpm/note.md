# pnpm

## 定位

包管理工具

等同于npm、yarn

## 优势

+ 安装速度快
+ 节省磁盘空间
  + 全局共享包资源，不同的项目相同的依赖包，在本地只会安装一次
  + 同一个包，不同的版本，只安装diff部分
+ 支持monorepo
+ 安全性高
  + npm/yarn使用扁平化的包管理策略，使得项目能够使用未声明的依赖包，存在安全性请问题
  + pnpm的包结构策略解决了这个问题

## monorepo

`workspace`
每一个application和package都在自己独立的workspace下
拥有自己的package.json
相互之间可以依赖

`root worspace`
monorepo根目录也是一个workspace
有自己的package.json
主要维护：

1. 管理整个项目都需要的依赖
2. 管理整个项目级别的任务
3. 管理帮助文档
