# ASI
ASI: auto semicolon insertion  自动分号补齐

ASI的2个坑点：

1. **restricted productions** 语句
组成这类语句的两个token之间不允许出现换行符`\n`； 
如果在一个token后面出现了换行符，直接判断语句结束，自动插入分号。

**貌似大多数都是作为终止语句的**

常见的rp语句
    + return xxx;
    + throw xxx;
    + break/continue xxx;
    + 作为后缀的 ++/-- 


```js
return 
    {
        foo: 'bar',
    };

// 等价于 
return;
    {
        foo: 'bar',
    }

// 会直接return undefined,

function foo() {
    // throw new Error('123');

    throw
    new Error('123');
    //  chrome 浏览器会直接报语法错误
}

try {
    foo();
} catch (e) {
    console.log(e.message);
}



let a = 0;
let b = 0;

a
++
b

// 等价于
a;
++b;

// 自增会作用在b身上
```

2. 三个特殊的字符
当下一行开头是这三个字符时；    
如果上一行结尾没有`;`， 那么会产生错误的处理
+ `(` 
+ `[` 
+ `/`
+ 加号
+ 减号

```js
a = b
(() => {
    console.log('a');
})()

// 会被解析成 a = b(....);
```

```js
a = b
['aaa']

// 会被解析成 a = b[xxx]; []会被作为获取b的属性对待
```

```js
a = b
/reg/i.test(str) && doSth();

// 会被解析成 a = b / reg / i.test(str) && doSth();  / 会被当作除号处理
```




## break 语句
break终止当前的循环语句（for、while）、switch语句、label语句
break之后的语句不被执行，会直接执行紧跟着包含break语句的外层之后的语句

for、while、switch 循环中使用break；终止循环，执行循环之后的代码；

lable 语句使用break，直接跳出该块语句，执行其后的代码

```js
block1: {
    console.log('>>> block1');

    block2: {
        console.log('>>> block2');
        break block2; // 1,2,1111,after
        break block1; //1, 2, after
        console.log('>>> block222');
    }

    console.log('>>> block1111');
}

console.log('>>> after block1');

```
