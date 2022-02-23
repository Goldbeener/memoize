# 包管理器


## NPM
Node Package Manager node包管理器
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
项目根目录下的node_modules文件夹基本上与package.json保持一致
> 还是会有少量依赖包提升
> 提升规则是什么？

项目根目录下的node_modules文件内，并不是放置依赖包源码，是一个软链；真正的包资源在.pnpm文件夹下
`.pnpm/<package-name>@version/node_modules`

这样的结构，在.pnpm文件下还是拍平结构，一级依赖包的的node_modules内的次级依赖都是以软链的形式存在的，一级依赖和n级依赖拍平.pnpm文件下

既能与原生node完全兼容，又能讲package与依赖很好的组织在一起