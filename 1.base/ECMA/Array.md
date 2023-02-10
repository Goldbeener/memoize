# Array

## Array.from

基于`类数组`或`可迭代对象`，创建一个新的、`浅拷贝`的`数组实例`

```js
Array.from(aryLike, mapFn, thisArg)

/**
 * aryLike: 类数组或者可迭代对象
 * mapFn: 可选，如果有的话，会对新数组的每一项执行该回调函数
 * thisArg: 可选，执行mapFn时指定的this对象
 * */ 
```

+ `类数组`
  + 拥有`length属性`和若干`索引属性`的任意对象
+ `可迭代对象`
  + 可以获取对象中的元素，如`Map`、`Set`、`Array`、`String`等

### 应用场景

**创建一个队列**

```js
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + i * step)

range(2, 6, 1) // 2,3,4,5,6

range("A".charCodeAt(0), "z".charCodeAt(0), 1).map(x => String.fromCharCode(x)) // "A" ..... "Z"
```

**配合call调用的特别表现**

```js
function NotArray(len) {
  console.log('>>>', len);
}

// 在非数组构造函数上调用from，返回的是类数组
Array.from.call(NotArray, new Set(['foo', 'bar'])) // { '0': 'foo', '1': 'bar', length: 2}
Array.from.call(NotArray, { '0': 'foo', '1': 'bar', length: 2}) // { '0': 'foo', '1': 'bar', length: 2}

// 当this不是构造函数时，正常返回数组
Array.from.call({}, { '0': 'foo', '1': 'bar', length: 2}) // ['foo', 'bar']
```

**数组深拷贝**

```js
function recursiveClone(val) {
  return Array.isArray(val) ? Array.from(val, recursiveClone) : val
}

const numbers = [[0, 1, 2], ['one', 'two', 'three']];
const numbersClone = recursiveClone(numbers);

numbers[0] === numbersClone[0] // false
```
