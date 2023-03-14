# CSS Tips

## feature query

特征查询，根据浏览器的支持情况，从而生效某些css设置

css版的条件编译？

```css
/* 当浏览器支持flex的时候，容器设置flex配置 */
@supports (display: flex) {
  .container {
    display: flex;
  }
}

/* 下边有黑线兼容 */
@supports (bottom: constant(safe-area-inset-bottom) or (bottom: env(safe-area-inset-bottom))) {

}
```
