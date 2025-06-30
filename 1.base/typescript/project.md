# TypeScript Project 的核心概念

一个 TypeScript Project就是一个编译单元，
由一个`tsconfig.json`文件定义。

包含：

+ 所有需要一起编译的 `TypeScript` 文件 (*.ts)
+ 共享的编译选项和类型检查规则 (tsconfig)
+ 统一的输出配置和模块解析规则 (tsconfig)


## 设计背景/原因

1. 大型项目的复杂性
``` bash
企业级项目/
├── frontend/     # React 应用
├── backend/      # Node.js API  
├── shared/       # 共享类型定义
├── mobile/       # React Native
└── admin/        # 管理后台
```
既包含前端代码、又有后端代码，不同端的项目需要不同的ts规则

如果没有项目边界，
+ 前后端的类型配置会相互污染、冲突
+ 不同模块的编译目标冲突，ES5 VS ES2020
+ 类型检查性能，任意配置的修改，整个工程都需要重新检查
+ 依赖关系混乱

2. 编译性能考虑

按照project拆分，每个project是独立的

+ 不需要检查不相关的文件
+ 不需要重复检查
+ 可以增量编译

3. 模块隔离

不同模块配置不同规则


## 核心原则

1. 就近归属，文件属于最近上级`tsconfig.json`所定义的project
2. 边界隔离原则
   + 不同project的文件不能直接引用
   + 不会跨project做类型检查
   + 编译错误不会相互影响
3. 显式引用
   + 要引用不同project的文件，必须使用`reference` 显式声明对被引用project的引用
   + 并且被引用项目必须声明 `composite` 和 声明`类型文件`


## 最佳实践

``` bash
project/
├── tsconfig.json              # 根配置（通常只定义共享选项）
├── packages/
│   ├── shared/
│   │   ├── tsconfig.json      # 共享类型项目
│   │   └── src/
│   ├── frontend/
│   │   ├── tsconfig.json      # 前端项目
│   │   └── src/
│   ├── backend/
│   │   ├── tsconfig.json      # 后端项目
│   │   └── src/
│   └── mobile/
│       ├── tsconfig.json      # 移动端项目
│       └── src/
```