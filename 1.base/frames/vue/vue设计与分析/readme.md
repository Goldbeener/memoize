1. 框架设计概览
   1. 命令式与声明式
   2. 框架设计者需要考虑的因素
      1. 虚拟DOM的定位
      2. 运行时与编译时
   3. Vue3的设计思路与各种模块的协作
2. 响应系统
   1. Vue3响应式实现
   2. proxy代理js对象
   3. ref原始值响应式方案
3. 渲染器
   1. 渲染器与响应式系统的关系
   2. 渲染器挂载与更新的实现原理
   3. diff算法
      1. 简单diff算法
      2. 双端diff算法
      3. 快速diff算法
4. 组件化
   1. 组件实现原理
   2. 异步组件和函数组件
   3. 内建组件的实现
      1. KeppAlive
      2. Teleport
      3. Transiton
5. 编译器
   1. 编译器工作流程
      1. parse实现原理与状态
      2. AST转化与插件化结构
      3. 渲染函数代码生成
   2. 实现HTML解析器
   3. 模板编译优化
      1. block树的更新机制
      2. 动态节点收集
      3. 静态提升
      4. 预字符串化
      5. 缓存内联事件处理函数
      6. v-once优化
6. 服务端渲染
   1. 同构渲染
   2. CSR
   3. SSR
   4. 同构渲染




# Vue3的新特性
1. composition API
2. sfc setup 语法
   1. 直接把带有setup标识的script标签内的所有内容，暴露给组件使用 
3. teleport
   1. 组件的逻辑部分转移： 逻辑上属于组件，但是技术上最好转移到其他位置
   2. demo： 模态框
4. 片段
   1. 组件可以包含多个根节点
5. 触发组件选项
   1. 定义自定义事件
   2. 验证自定义事件 类似props
   3. v-model 使用
      1. v-model 指定
      2. 多个v-model
      3. v-model 修饰符
         1. trim
         2. number
         3. lazy
         4. 自定义 修饰符
            1. <modelName>Modifiers 对象 包含所有该model上的所有修饰符
6. 状态驱动的动态css
   1. 在`css scope`中使用 `script` 中定义的变量
7. css 规则
   1. 全局规则
   2. 针对插槽样式
   3. 深层选择器
8. 支持自定义渲染器



# 自定义指令
对普通dom元素进行底层操作，需要使用到自定义指令；

> 对于自定义组件，指令作用在组件的根元素
> 对于多个根元素的组件，指令会被忽略失效，同时会有报错

## 钩子函数
+ created v-on绑定事件调用之前 调用
+ beforeMount
+ mounted 在绑定的父组件被挂载之前 调用
+ beforeUpdate
+ updated 在包含组件的VNode及其子组件的VNode更新之后 调用
+ beforeUnmount
+ unmounted

## 指令数据源
+ value  是指令等号右边的输入，可以是任意合法的js表达式
+ argument 指令等号左边，通过冒号，传入的参数

```
v-directive:[argument] = value
```

## 响应式数据
### ref
接收一个基本类型值，返回一个响应式且可变的ref对象 
### reactive
返回对象的响应式副本

### TODO
查看watch 不同类型的数据的使用方式     
[deep-dive-into-watch](https://www.netlify.com/blog/2021/01/29/deep-dive-into-the-vue-composition-apis-watch-method/)