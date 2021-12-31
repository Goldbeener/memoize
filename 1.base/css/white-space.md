white-space 
    css属性，设置如何处理元素中的空白
    主要影响元素中的`连续空白是否合并`或者`换行符是否折行`
```css
white-space: normal | nowrap | pre | pre-wrap | pre-line | break-spaces;
```
+ normal 连续空白合并，不会换行，换行作为空白符来处理
+ nowrap 连续空白合并，文本内换行无效
+ pre 连续空白保留 换行符或者`<br>`时正常换行
+ pre-wrap 连续空白保留 换行符、`<br>`、必要时换行
+ pre-line 连续空白合并 换行符、`<br>`、必要时换行
+ break-spaces 与pre-wrap行为相同，并且
  + 行尾空白保留
  + 空格在必要时也会触发换行
  
