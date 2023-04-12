## white-space

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
  
## word-break

    控制单词如何被`拆分换行`的

+ normal
+ break-all 所有单词碰到边界一律换行，无论单词长短
+ keep-all 所有单词一律不拆分换行，只有空格才可以触发自动换行
+ break-word

## overflow-wrap

    当一个不能被分开的字符串太长而不能填充其包裹盒时，为了防止其溢出，浏览器是否允许这样的单词中断换行

+ normal 只能在单词间空白换行
+ anywhere 空白
+ break-word  

## line-break
中文中标点符号，

**避首标点**，不能出现在一行的开头，如句号`。` 问号`？`
**避尾标点**，不能出现在一行的末尾，如上引号`“`，上书名号`《`

因此有的时候，一行末尾能够放下一个字，但是这个字后面跟一个句号，这个字也被放到了下一行；

针对行首、行尾标点符号的处理, 需要用到CSS属性是`line-break`

line-break 主要用在CJK语言中，也就是中日韩3种语言中

```css
line-break: auto;
line-break: loose;
line-break: normal;
line-break: strict;
line-break: anywhere;
```


