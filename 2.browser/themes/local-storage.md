# 浏览器本地存储

+ cookie
+ localStorage
+ sessionStorage
+ indexDB
+ webSQL

## web app 内存探测

### web api

```js
navigator.storage.estimate().then((res) => {
    const { usage, quota } = res;
    console.log('🚀🚀🚀 ~ navigator.storage.estimate ~ res', res);
    // usage 已使用
    // quota 配额
})
```

### 脚本计算localStorage

[计算localStoarge容量](../../6.practice/calc-localStorage-size.md)
