# 获取当前页面已使用的localStorage内存量

1. localStorage内都是以utf-16 string的形式存储的
2. key\value都要计算
3. localStorage api

```js
function getUsedMemorySize() {
    if (!window.localStorage) {
        return;
    }

    let lsTotal = 0;
    let xlen = 0;

    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }

        xlen = (localStorage[key].length + key.length) * 2;
        lsTotal += xlen;
    }

    console.log('total size %s', (lsTotal / 1024).toFixed(2));
}

```

## 获取当前站点最大localStorage容量

```js
if (localStorage && !localStorage.getItem('size')) {
    var i = 0;
    try {
        for (i = 10; i < Infinity; i+=10) {
            localStorage.setItem('test', new Array(i * 1024 + 1).join('a') );
        }
    } catch {
        localStorage.removeItem('test');
        localStorage.setItem('size', i - 10);
    }
    
}
```

## 不同类型数据在内存中占用存储空间

```bash
boolean: 4 bytes;
string: (length * 2) bytes;  utf-16 string
number: 8 bytes;
```
