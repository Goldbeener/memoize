# vue组件

1. options API - 单文件组件
2. composition API - 单文件组件
   1. setup选项 或者 setup 语法糖
   2. setup 返回渲染函数
3. createAPP + mount
4. h + render函数


## 函数式调用弹窗

vue 常规的使用模板写法的单文件组件

常规写法，在需要的组件内，引入弹窗组件，点击某个按钮时设置弹窗显示属性

如果是在多个页面，都需要调用同一个弹窗，这种写法就需要在各个入口重复引入弹窗


```js
// popup.vue
<template>
  <van-popup v-model:show="show">
    {/* 弹窗内容 */}
  </van-popup>
</template>


// 场景
<template>
  <van-popup v-model:show="show">
    {/* 弹窗内容 */}
  </van-popup>
</template>
<script>
  import SomePopup from 'path/to/popup';
</script>
```

