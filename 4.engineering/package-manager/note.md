# 包管理器

## NPM

Node Package Manager node包管理器

### npx

主要作用

1. 在命令行调用项目安装的内部模块
   1. 项目内部模块一般可以在npm script中或是项目脚本里面是用，不能直接在命令行下使用
2. 避免全局安装模块
   1. npx create-react-app my-react-app
      1. npx下载create-react-app到临时目录，使用之后再删除
3. 使用不同版本node
4. 执行github源码
   1. npx <https://gist.github.com/zkat/4bc19503fe9e9309e2bfaa2c58074d32>

## Yarn

## pnpm

1. 速度快
2. 节省磁盘空间
   1. 不会重复安装同一个依赖包
   2. 同一个包的不同版本只会安装diff部分
3. 支持monorepo
4. 安全性更高
   1. npm、yarn使用扁平式包管理策略，使得项目可以直接使用没有在package.json内声明的包，带来潜在的安全性问题
   2. pnpm包结构策略解决了这个问题

## install原理

1. 根据package.json将依赖包的版本区间解析为具体的某个版本号，即确定包版本
2. 下载对应版本的依赖包的tar包到本地离线镜像
3. 将依赖从离线镜像解压到本地缓存
4. 将依赖从缓存拷贝到当前目录的node_module目录

1. 将所有包按照`<package>@<version>`**硬链接**在`node_modules/.pnpm`目录下
   1. 此时类似npm/yarn的逻辑，将所有包拍平
2. 根据依赖关系，将依赖包软链到合适的位置，确定依赖关系
3. 将直接依赖软链提升到`node_modules`目录下

> 使用的时候，node会忽略软链，直接找到真实依赖位置，保证依赖关系是正常的
> 即使是深层级的嵌套也能正常

> devDependencies 不会出现在这里面，因为这些都是生产环境的，不需要devDependencies了

## 依赖管理策略

### npm/yarn 扁平化

将依赖的依赖也提升到node_modules顶层

**带来的好处**

1. 避免了深层嵌套带来的包寻址损耗

**带来的坏处**

1. node_modules结构与package.json声明不一致
2. 安全性问题，项目可以直接使用package.json中未声明的包，并且不会报错
   1. 包版本发生变化时有隐患
   2. 包替换之后有隐患
3. node_modules结构不确定性
   1. 不同的一级依赖包，又依赖了同一个二级包的不同版本
   2. 会根据一级依赖包的声明位置，决定哪个版本的二级依赖包提升到顶层
   3. 也就是意味着 node_modules 里面的结构可能不确定
   4. lock可以解决这个问题
4. 扁平化算法复杂性高，耗时长

### pnpm

Store + Link 的管理策略
pnpm安装的包会统一下载在一个文件夹内
各个project依赖的包通过link的形式链接到store内的真实资源

项目根目录下的node_modules文件夹基本上与package.json保持一致
> 还是会有少量依赖包提升
> 提升规则是什么？

项目根目录下的node_modules文件内，并不是放置依赖包源码，是一个软链；
真正的包资源在.pnpm文件夹下
`.pnpm/<package-name>@version/node_modules`

> 项目node_modules下是依赖包软链
> 连接到项目.pnpm文件夹下
> .pnpm下的依赖硬链接到`~/.pnpm-store`pnpm仓库下

这样的结构，在.pnpm文件下还是拍平结构，一级依赖包的的node_modules内的次级依赖都是以软链的形式存在的，一级依赖和n级依赖拍平.pnpm文件下

既能与原生node完全兼容，又能将package与依赖很好的组织在一起

#### 包管理

1. 安装的所有包统一存储在硬盘的某一位置(`~/.pnpm-store`)，但软件包被安装的时候， 包里的文件会**硬链接**到这一位置
   1. 不会占用额外的空间，并且允许跨项目的共享同一版本的依赖
2. 相同的包会仅安装一个，不同的版本仅需要安装diff部分

> 硬链接和软链接
> 文件名是指针，硬链接是和文件名同一级别的指针，软链接是指向指针的指针。
> 所有的硬链接都指向同一块磁盘，删除一个指针不会真正删除文件，删除所有指针才会删除文件

## corepack

1. corepack 是node16.9.0/14.19.0 增加的实验性工具
2. 管理包管理工具的版本 `package manager manager`

> 使用指定的包管理工具而无需安装

目前支持yarn和pnpm

2个核心优点

1. 降低协作成本，直接使用指定的包管理器即可，无需手动安装
2. 保证团队内统一包管理工具

### 用法

配置

```json
// package.json
{
  "name": "moduleName",
  "packageManager": "pnpm@7.17.1", // 指定包管理器名称及版本
}
```

使用

```bash
corepack enable

pnpm i # 直接使用，无需手动安装pnpm 有点npx的味道

yarn intsall # 使用yarn会报错
# Usage Error: This project is configured to use pnpm
```

## pnpm monorepo

workspace声明： `pnpm-workspace.yaml`

引用：`"foo": "workspace:*/~/^"`

## 按需引入

四类按需引入实现方式

+ 异步加载
  + ES6 import()
+ 按需引入
  + babel-plugin-import
+ 按需剔除 tree-shaking
  + esm
  + sideEffects
+ 按需引入
  + 条件编译

## npm包入口声明

打包器在解析包时，支持解析的package.json字段

+ `main` 标准字段，node使用， cjs产物入口（es5）
+ `module` 非标准字段 各大打包器支持  esm产物入口，搭配tree-shaking
  + node中有类似的字段  `type: module`
+ `browser` 非标准字段 浏览器专用产物入口
+ `style` 非标准字段 css入口文件
+ `typings/types` ts 声明文件入口
+ `unpkg`
+ `jsdelivr`

`type: module` 代表包的源码是使用esm规范
`exports`: 代表包对外暴露的入口
