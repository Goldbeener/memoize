# if-else 重构

## if ... if

条件拆分，每一个if对应一个封装函数

## else if ... else if

### 查找表

通过键值对的形式封装每一个else if中的逻辑

```js
// 查找表
const rules = {
  x: (a, b, c) => {},
  y: (a, b, c) => {},
  z: (a, b, c) => {}
}

function demo() {
  const condition = determineCondition(a, b, c);
  retrun rules[condition](a, b, c);
}
```

对于每个分支，是由一个确定的简单的`c === xxx` 条件判断出来的， xxx可以作为查找表的键值；
对应的分支处理，抽象出一个函数；

对于每个else if 分支包含复杂的条件判断，且对执行的先后顺序有要求，就不能满足了

可以使用下文的`职责链模式`

### 职责链

```js
const rules = [
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  },
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  },
  {
    match: function (a, b, c) { /* ... */ },
    action: function (a, b, c) { /* ... */ }
  }
]

function demo() {
  rules.forEach(rule => {
    if (rule.match(a, b, c)) {
      return rule.action(a, b, c)
    }
  })
}

```

相比于查找表，把条件的判定逻辑也抽象出来了，
可以看出，更适合条件判定比较复杂的逻辑；
并且有顺序

### lodash cond

函数式编程

```js
const pairs = [
  [
    function condition () => {},
    function action() => {}
  ],
  [
    function condition () => {},
    function action() => {}
  ]
]
const func = _.cond(pairs)
func(params)

/**
 * 会把params传递给pairs的每一项
 * 先调用数组的第一项，如果返回true，执行第二项action函数
 * */ 

```

### lodash flow

_.flow([funcs])
_.flowRight([funcs])

接收一组函数，创建一个新的函数，新函数的返回值是按顺序调用数组函数的结果

类似于pipe，参数经过第一个函数处理，返回值传递给下一个函数

```js
function add(a, b) {
  return a + b;
}
function square(x) {
  return x * x;
}

const addThenSquare = _.flow(add, square)
const addThenSquareRight = _.flowRight(square, add)
addThenSquare(2, 3) // 25
```
