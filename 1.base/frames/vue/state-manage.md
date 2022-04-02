# 状态管理

## 状态共享

### provide/inject
具有嵌套关系的父子组件，长距离传递props

+ 父组件不需要知道哪些子组件使用了它provide的property
+ 子组件不需要知道inject的property来自哪里


+ 传递静态数据
+ 传递实例property
+ 传递响应式数据
+ 修改响应式property
+ 传递readonly数据

### 组合式函数数据
```js
// useHandlexxx.js

import { ref } from 'vue'

// 在export函数之外定义的数据，在不同组件内引入的时候，是共享同一份数据的
const shareData = ref(1);

export default function useHandleResult() {

  return {
    shareData
  }
}

```