# SOP

同源策略

## 限制

### iframe嵌套获取父级信息

跨域会限制iframe获取父级信息

```js
location.parent // undefined
location.top // undefined
```

可以使用 `location.ancestorOrigins` 获取嵌套父级集合。

`document.referrer` 也可以

## 解决方案

> jsonp
> iframe proxying

## CORS

什么时候需要CORS？

1. xhr或fetch请求
2. web字体加载 css中通过@font-face使用跨源字体资源
3. WebGL贴图
4. 使用drawImage()将图片或视频会知道canvas
5. 来自图像的CSS图形
