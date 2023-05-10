# Turborepo

用于JS和TS的快速构建系统

解决的问题
1. 解决随着monorepo项目的迭代，构建速度慢
   1. 缓存，远程cache构建结果，增量构建
2. 任务调度
   1. monorepo构建过程，往往会有多重任务并且任务有依赖关系

不解决的问题
1. 依赖安装，这是packages manager（npm、yarn、pnpm）干的事