## Monorepo

Lerna + Yarn Workspaces

Lerna管理package的版本和构建
yarn Workspaces 管理依赖

### Lerna hoisting

Monorepo模式下，不同的packages之间可能会有相同的依赖； 如果各自维护在自己独立的node_modules下的话，会出现重复的依赖安装，占用大量的空间和安装时间

因此lerna提供了一种`提升`的特性: 将公用包提升在仓库顶层的node_modules下，不在各package下安装

+ 同一个包相同版本的依赖，会被提升在root，按照node包寻址的规则向上查找使用
+ 同一个包不同版本的依赖，先处理的会提升在在root，后处理的不提升，在原来位置

#### 带来的问题

1. 版本的不确定性，需要维护一份lock文件，保证在所有环境表现一致
2. 隐式引用问题，
   1. 由于提升的存在，即使packageA内没有在packags.json声明对包P的依赖，但是由于packageB内的依赖提升，A项目内如果直接import/require饮用包P；在本地也是能够正常运行的；但是独立运行时会出问题的
   2. 并且如果因为B的升级导致的p的升级，A内使用旧版P的API也可能会出错
3. 某些工具只会在本package的node_modules下寻找依赖包，这种情况下会出问题
   1. lerna并不会自动的在顶层node_modules和packaage下node_modules之间建立软链
   2. 需要借助工具创建 [yarn可以]

### init

初始化一个多包仓库

```bash
mkdir monorepo-demo
cd monorepo-demo

yarn|npm init -y  # 初始化npm包

# 在npm包基础上完成Lerna托管多包
yarn add -D lerna
lerna init

# 初始化完成之后 目录结构
├── README.md
├── lerna.json
├── node_modules
├── package.json
├── packages # 社区默认实践 里面放置不同的包
└── yarn.lock
```

lerna.json 配置文件

```json
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "npmClient": "yarn",
  "useWorkspace": true
}
```

基于package.json 使用yarn workspaces

```js
{
    "private": true,  //root禁止发布
    "workspaces": [   // 配置package目录
        "packages/*"
    ],
}
```

### 创建模块包

```bash
cd packages && mkdir my-pack

# 或者
lerna create my-pack -y

```

### bootstrap

### clean

```
yarn run clean  ---> 'rm -rf node_modules && lerna clean'
# 删除root中的node_modules 以及 清除各packags中的node_modules
```

### 安装依赖包

依赖的管理全部依托于Yarn，因此依赖的安装、删除都是用yarn命令

```
// 添加、删除项目根依赖
yarn add -W <root-dependence-name> -S
yarn remove -W <root-dependence-nam> -S

// 添加某个package包依赖
yarn workspace <package-name> add <dependence-name> -S
yarn workspace <package-name> remove <dependence-name> -S
```
