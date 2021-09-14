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

