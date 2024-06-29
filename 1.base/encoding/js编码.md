# 如何理解 [JavaScript采用了UTF-16编码]

这句话的意思是，JS内部表示字符串时使用的是UTF-16编码
JS内部将字符串表示为一系列UTF-16代码单元，简称`码元`

字符串的存储、传递、处理都是基于UTF-16代码单元的序列

每个码元由16位（2字节）组成

基本字符， U+0000 到 U+FFFF 一个码元即可表示
扩展字符，使用代理对表示，由多个码元组成

```js
let foo = 'h'
let bar = 'hello'
```

如上的代码，在JS引擎中处理的时候，会转换成

```js
let foo = '\u0068'
let bar = '\u0068\u0065\u006c\u006c\u006f'
```

`'\u0068'` 就是字符`h`的16进制表示的unicode编码

## 字符串操作方法

charAt  返回的是指定位置的码元，因此在遇到扩展字符时会出问题，因为获取到的是不是展示的最小单元
charCodeAt
substring
length

都是基于UTF-16码元进行的

### length

str.length 返回的是字符串使用的码元的数目

在遇到扩展平面字符时，会有问题

```js
let str = "😀";
str.length // 2

// 因为这个字符需要使用2个码元来表示
```

#### 现代解决方案

`Array.from`

```js
let str = "😀";
console.log(Array.from(str).length);  // 输出: 1
```

`扩展运算符`

```js
let str = "😀";
console.log([...str].length);  // 输出: 1
```

`正则表达式`

```js
let str = "😀";
let charArray = str.match(/[\s\S]/gu) // 开启unicode模式，能正确按照字符最小单元处理
console.log(charArray.length);  // 输出: 1
```

## Unicode转义序列

在 JavaScript 字符串字面量中，
使用 \u 和四位十六进制数字表示 Unicode 字符。
这种表示法基于 UTF-16 代码单元。

## 正则表达式

JS中正则表达式处理字符时，也是基于UTF-16
例如匹配一个字符的`.`时，可能获取到的是代理对的一部分，而不是整个字符

```js
let str = "😀";

str.match(/./)

// ['\uD83D', index: 0, input: '😀', groups: undefined]
// 匹配的结果是第一个码元，不是完整的字符
```

为了正确的处理Unicode字符，可以使用`u`标志来启用Unicode模式

```js
let str = "😀";

str.match(/./u)

// ['😀', index: 0, input: '😀', groups: undefined]
// 匹配的结果是完整的字符
```
