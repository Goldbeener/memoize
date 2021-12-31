# Terms

## Bundle 
输出束，模块打包产物  已经被加载和编译的源码

### Bundle Splitting 
拆分 
减少代码变更导致的打包产物更新，因而导致的republish；
各bundle相互独立，最大可能利用客户端缓存

## Chunk
webpack专有术语： 块
输出束 由 块 组成
通常块与输出束相对应，但是有些配置不会产生一对一关系

### code splitting
代码分割成不同的块/包，然后按需加载，不是一次性加载整个单包

