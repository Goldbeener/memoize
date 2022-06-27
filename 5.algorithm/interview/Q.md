1. CSS实现几个div一行排列。

+ float: left
+ display: flex
+ display: grid

2. 两个div都设置float那么其父元素会怎样？为什么清除浮动可以解决这个问题？
   1. 子元素脱离文档流，父元素没有子元素被撑开
   2. 清除浮动创建了一个新的BFC盒子，BFC盒子有一个规则就是，会包裹住内部的浮动元素
3. 如何设置div不换行。
    white-space: nowrap;
4. 箭头函数的特点
   1. 绑定this 是当前的词法作用域内的this
   2. call、apply无效
   3. 不能作为构造函数
      1. 为什么？
      2. 构造函数new的过程，需要使用到this，并且this还是动态的，而箭头函数的this是绑定的，不会变的
   4. 没有arguments
   5. 没有prototype属性
5. let和const重复声明同一个变量会怎样？
   报错，已经被声明了
6. 数据基本类型
   1. string
   2. number
   3. boolean
   4. undefined
   5. Obeject
   6. null
   7. Symbol
   8. bigint
2. 判断数据类型方法
    typeof 判断基本类型
    Object.prototype.toString.call(var) === '[object Array]'
3. arrary怎么判断
    Object.prototype.toString.call(array) === '[object Array]'
4. null怎么判断
   1. === null
   2. Object.prototype.toString.call(null) === '[object Null]'
   3.
5. 闭包是什么
6. prefetch和preload的区别
   1. preload 告诉浏览器尽快下载并缓存指定的资源（js/css）
      1. 用在加载完页面之后，加速首屏后续资源的加载
      2. 下载完成之后，不会执行，等到需要的时候再执行
   2. prefetch 告诉浏览器在空闲时间下载并缓存指定资源（js、css）
      1. 优先级不高
      2. 用在加速非首屏资源的加载
7. es6特性
8. css垂直水平居中
9. 输入网址后，浏览器都做了什么
10. 引入cdn字体，会发生什么问题
11. 遍历对象key
12. 移动端页面怎么适配
13. transtion,animation

## 网络

13. 强缓存，协商缓存
14. https
15. webpack的一些问题

## Vue

1. vue双向绑定原理
   1. 数据流向 问题  上层数据变更下层更新，下层数据变更上层也更新
   2. v-model
      1. 语法糖
      2. 拆分为一个prop 和 一个绑定事件
         1. 默认是value-imput组合
         2. 可以再model属性里面配置
2. Vue.nextTick原理
   1. 原理 event-loop 下一个tick执行
   2. 实现
      1. callbacks 队列维护所有的cb
      2. timeFunc
      3. flushCallbacks
         1. 循环清空callback队列中的任务
3. Vue响应式原理
   1. 是什么   页面状态和DOM结构自动同步
   2. 怎么实现 Object.defineProperty();
4. computed 源码实现
5. computed 与 watch的区别
6. v-if和v-show的区别
   1. v-if 不会渲染 惰性渲染，只有在true的时候才会开始渲染
   2. v-show 无论是true、false，都会渲染 只是用display: none控制显示隐藏
      1. display: none 从DOM树上移除
      2. visibility: hidden 还在dom树上，占位不变，只是元素透明
7. 在div上既设置display:none，也设置v-show="true"，结果会怎样？
    div 会被隐藏
8. keep-alive是用来干嘛的？
9. mixins用法
10. vue双向绑定中，收集数据变化的依赖是什么时候收集的？？
11. vue生命周期渲染（父子渲染顺序）
    1. 父beforeCreate
    2. 父created
    3. 父beforeMount
       1. 子beforeCreate
       2. 子created
       3. 子beforeMount
       4. 子mounted
    4. 父mounted

    更新顺序

## code

```js
const name="global"; // const/let 声明的变量不在window上挂着，是挂在一个顶层的script域下面的  window.name 是不存在的
var obj = {
    name: '123',
    getName:() => {
        // 箭头函数绑定this为词法作用域的this 因此这个地方的this就是window
        console.log(this.name);
    } 
}
obj.getName(); // undefined
```

```js
console.log(a); // undefined
var a = 1;
console.log(b); // 报错 tdz b not defined
let b = 2;


for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i); // 全是5 
  });
}

// let 或者闭包

var a = 1;
(function a(){
   // 'use strict'
   var a = 2;
   console.log(a);
})()

function o () {
  this.name = '222'
  return {
      a() {
        console.log(this);
      }
      b: () => {
        console.log(this);
      }
  }
};
o().a();
o().b();
const c = o.a;
const d = o.b;
c();
d();


// 状态机 从pending到结果态之后不能再更改状态
new Promise((re, rj) => {
  re(1);
  rj(2);
  console.log(3); 
})
  .then((res) => {
    console.log(res); // 1
  })
  .catch((err) => {
    console.log(err);
  });

const log = console.log;
log(1); // 1
setTimeout(() => {
  log(2);
});
new Promise((r) => {
  log(3); 
  r(4);
  log(5);
}).then((res) => {
  log(res);
});
log(6);
(async () => {
  log(7);
  await new Promise((r) => {
    log(8);
    r();
  });
  log(9);
})();
```

二面：

1. 项目上负责的比较有难点的部分？
2. webpack分包问题
3. http缓存
4. css定位
5. websocket

二面;

1. this有几种情况
2. bind执行的返回值是什么
3. 任何函数执行都有返回值，那么函数执行的返回值是什么
4. css属性的webkit 在项目里如何做到自动加载
5. link是如何加载css的（用link标签引入的css 浏览器的请求过程）
6. 详细介绍浏览器缓存
7. 浏览器协商缓存 last-modified 能精确到的最小的时间单位
8. 为什么有 last-modified 还会有 etag
9. new () => {} 会返回什么 什么时候用箭头函数
10. var let const 的区别，什么时候用var 什么时候用let 什么时候用const
11. 用户在地址栏输入（包括输入文字、url、script标签等）后，浏览器都做了什么
12. 浏览器请求不同的资源（例如浏览器请求html、CSS、image）是如何做的、如何区分请求的资源
13. 实现 输入 20200820164516 返回 2020年08月20日 16:45:16 根据写的函数展开问

```js


```

简答题：
1.什么是函数节流，为什么要使用函数节流，如何实现？
2.描述一下 JS 的 new 操作符具体做了什么？
3.说明一下cookie，sessionStorage，localStorage 的区别，以及在项目中的应用。
编程题：
1.JS 编码实现模版引擎变量替换。
cosnt year = '2017';
const month = '09';
const day='21';
const str = `${year}-${month}-${day}`;
console.log(str) 输出：2017-09-21
2.求二叉树是否存在和值为N的路径。从二叉树的根，到叶子节点称为一条路径，路径上的每个节点的value之和为路径和值，本题要求所有的路径中是否存在一条和值为N的？
3.封装一个 JS 的 HTTP 请求库。

一面
// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。lengthOfLongestSubstring('babcaacbd') = 4
// 实现一个 flat 函数，函数的作用是可以拍平一个数组，如 flat([1, [2, [3,4], [5]]]) = [1,2,3,4,5]
// const repeatFunc = repeat(console.log, 4, 3000);
// repeatFunc("hellworld"); // 会输出 4次 helloworld, 每次间隔3秒
其他和项目相关的
项目中做过的基础架构工作有哪些
做过哪些性能优化相关的？
React组件中需要引入react但是没用到是为什么？
react组件列表渲染要加key是为什么？

题1 实现vue 的lazyImage组件
题2 给定数组，求最长的连续数字长度，不要求顺序，如[400, 4, 100, 1, 3, 2]最长一串为1 2 3 4，所以答案为4
了解过defineProperty吗？
如何实现vue中computed
说一下浏览器缓存
redis的基础数据结构

一面：
1.vue2和vue3的区别？（从使用方面作答）
2.介绍一下使用webpack搭建项目？我把整个配置过程了介绍一下，以及为什么这么配置。
3.webpack的chunk split？es6 import和require这些语法是怎么让浏览器识别的。
4.使用typescript的目的是什么？帮助解决了什么问题？
5.跨域请求都有哪些解决方案？cors的原理？请求头，响应头
6.手写代码实现用一个div实现进度条的功能？
7.手写实现Promise原理？
8.求一个二叉树的前序遍历？递归和非递归

一面:
less优点，react优缺点，react高阶组件，xss、csrf原理和防御方式，webpack优化，websocket和http鉴权的区别，h5与原生通信，实现一个div的抽屉效果（点击隐藏，动画），实现lodash.get方法--get(obj,path)

面试题一：

1. 基于我简历里头做的项目问了一些问题
2. 判断执行顺序
new Promise(resolve => {
    resolve(1);
    Promise.resolve().then(()=> console.log(2))
   console.log(3);
}).then(num => {
   console.log(num)
});
console.log(4)

3.
class Scheduler {
    add(promiseCreator) { ... }
    // ...
}
const timeout = (time) => new Promise(resolve => {  setTimeout(resolve, time) })
const scheduler = new Scheduler()
const addTask = (time, order) => {
   scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}
addTask(1000, '1')
addTask(500, '2')
addTask(300, '3')
addTask(400, '4')
// output: 2 3 1 4
// 一开始，1、2两个任务进入队列
// 500ms时，2完成，输出2，任务3进队
// 800ms时，3完成，输出3，任务4进队
// 1000ms时，1完成，输出1
// 1200ms时，4完成，输出4
4. 手写一个 promise.all 方法
面试题二：
1.求二叉树最近公共祖先
问题描述:给定一个二叉树的两个叶子节点，每个节点给出指向父节点的指针，返回它们的最近公共父亲节点。要求空间复杂度为O(1);
//面试官提示:两个叶子节点看成两个单链表，然后求两个单链表的交叉节点
function getCLoseCommonParent(leaf1, leaf2){
}
2.以下代码的输出结果是什么?
//考察箭头函数的作用城
function test() {
    var a={
        name: 'zz',
        foo: ()=>console. Log(this. name),
bar() {
console. Log(this.name)
}
}
a.foo();
a.bar();
}
test.bind({ name: 'test' })()
3. cdn的工作原理?
4.关注哪些性能指标，是如何计算的?上报方式是什么?为什么采用gif图片而不是ajax上报?
5. 做了H5离线化，做完之后的性能指标提升多少?自己有没有在看这些指标?
6. unicode和utf-8和ASCII有啥不同?

1系统设计：设计一个新闻网站
2编程题：实现一个网页图片自动轮播功能，并且有pre和next的按钮功能

//评测题目: 无
flex-grow
flex-shrink
flex-basis

盒模型

```
setTimeout(()=>{
  console.log(1);
  Promise.resolve().then(()=>{
    console.log(2)；
  });
  setTimeout(()=>{console.log(0)}, 0);
}, 0)

setTimeout(()=>{
  console.log(3);
  Promise.resolve().then(()=>{
    console.log(4)；
  });
}, 0)

```

````````
const obj = {
        fn: () => {
            console.log(this);
    }
}

// obj.fn();

function fn() {
        var a = obj.fn
        a();
}

fn.call({b:1})
````````````

#####  请实现方法`curry(Function) => Function`，传入一个多参函数，返回单参函数
example:

```
const sub = function(a, b, c, d) {
  return a+b+c+d;
}
const subCurry = curry(sub);
sub(1,2,3,4) === subCurry(1)(2)(3)(4)
```

方案设计题目一
随着越来越多的业务需求，抽奖游戏越来越丰富:
1、丰富的游戏动画玩法(转盘、翻牌、老虎机、刮刮卡等)
2、每个游戏玩法都有各自的皮肤、配色方案，支持不同的奖品个数(大转盘6个、翻牌子8个、老虎机刮刮卡不限制)
3、国际化支持:支持不同国家或地区的抽奖(中国、美国、印度、中国香港..).
请设计抽奖组件(注意不是大转盘抽奖组件)，需要满足以上这些需求，同时考虑以下几点:
扩展性:分析业务场景与未来可能有的发展趋势，你认为需要做到什么样的扩展性，怎么样实现
复用性:如何抽象与复用，提升开发效率，不要局限于公共UI复用
解耦与多人开发:大转盘活动h5不希望加载翻牌子游戏的代码，大转盘抽奖的迭代上线不希望对翻牌子的代码有干扰(避免误提交了修改影响线上其他游戏等情况)
方案设计题目二:
在一的基础上，业务要求需要同时支持微信、支付宝小程序版本的抽奖，你有什么提开发效率的解法?
请写出基于方案一修改的关键内容、写出可能有的问题、怎么解决
方案设计题目三:
基于上述背景，我们需要完成一个可视化配置后台，中间是真实的渲染，右侧是数据表单，两边双向联动——
    ●右侧修改会实时同步左侧可视化预览
    ●提升运营配置体验，选中左侧对应区域，会高亮需要填写的内容，
       。例如点击抽奖按钮，会切换奖品配置tab、激活右侧表单;点击背景图，会切换到页面配置tab、激活右侧首页表单
1、为了提高复用性，怎么修改基于之前的抽奖组件设计，请简要写出
2、当我们需要做很多营销工具(大转盘抽奖、翻牌子抽奖、签到、助力裂变)的配置化后台，整体如截图所示界面(双击图片可放大)你认为可以考虑什么样的技术选型

一面：
1、http1.1 和http1.0相比，增加了哪些？
2、TCP和UDP的区别
3、es6使用过哪些？
     其中
     1） map和weakMap的区别是什么？
     2） commonJS和es6 module的区别
4、 Vue技术栈都用过吧？
      vue-router的源码是否读过？说一下原理
5、Vue和react的不同
形式：基本是一问一答的形式，面试官没有深究问题
二面：
1、Vue的双向数据绑定原理
2、打包工具 webpack的理解？使用：仅在项目中修改配置还是自己模拟实现？
3、v-module 的原理？以及自己如何实现？
4、vue-router的原理
5、Vuex的理解
6、Node.js的事件环
7、ES6中用过哪些？或者有什么哪些新特性
      如果需要两个异步请求均执行完之后，再去执行其他操作,怎么做？
8、工作中主要使用Vue，那react使用过吗？
     node在工作中用过吗

React合成事件
React组件间通信
setState同步异步问题
async / await
generator
iframe缺陷问题
数据上报相关
错误收集
其他的就是说项目

一面：
防抖或节流
vue响应式原理
哪个生命周期订阅的
template翻译过程
vue几种路由模式区别
http1.1 http2 新增特性
tcp和udp
weakset，weakmap
symbol
小程序的两个进程
小程序和vue对比
flex属性
怎么画1px
webpack打包原理
比较webpack和gulp
评价自己面试的表现
评价自己擅长的技术，vue的水平
二面：
变量提升的意义，为什么这么设计
页面渲染的过程
性能优化
遇到的挑战
http请求头
缓存和存储 存储跨域处理
三面：
https 加密
xss攻击和csrf攻击
面向对象开发好处
比较一下python，java，golang，php几种语言
怎么协同开发
怎么高绩效
怎么面对压力
岗位想做什么期望
业务技术上期待
工作的动力
换工作原因
在第二家公司比第一家公司成长的地方
最近学习的东西

票求最大收益问题；
深度复制简单对象以及深度遍历二叉数；
出了个算法：股票问题，股票数组，第几天能卖出一次，收获最大；

1. 原型链
2. cdn缓存，跨域（怎么配置）
3. 本地缓存
4. js 就是闭包，原型链，继承那些的
5. 作用域链
6. http和https的区别
7.  项目中做过什么性能优化
8. 变量提升的原理是什么
9. 实现 es6 reduce

二面：
手写节流、
防抖，
字符串对称判断

promise.all
Vuex
$.nextTick
浅拷贝深拷贝
二分法、深度遍历广度遍历
Vue组件之间传值
http缓存
token
http状态码
平时怎么学习的，
项目中痛点
怎么性能优化
css BFC
元素居中

1.引入cdn的好处
2.border-box 和content-box的区别
3.CSRF的攻击者需要拿到用户的cookie吗
4.<script defer sync>
5.var p = new Person() new的过程发生了什么
6.Object.prototype.__proto__
7.Function.prototype.__proto__
8.var p = new Person() ; p.__proto__
9.Object.prototype.__proto__
10.Function.prototype.__proto__
11.var p = new Person() ; p.__proto__
12.强缓存和协商缓存的区别
13.arr.push返回什么，会改变原来的数组吗
14.arr.slice()会改变原来的数组吗，会返回什么
15.链表和列表的区别
16.如何检测一个链表有环
17.防抖和节流
18.require和import的区别
19.contenHash chunkHash的区别
20.想提高打包速度，比如，npm run build，如何做
21.DLLPlugin
车主邦：
1、小程序如何优化
2、ES6数组去重
3、Vue组件通信
4、算法: 求平方根
5、Promise
6、React生命周期
7、shouldComponentUpdate场景
8、聊聊RN、跨端
9、是否有带团队经验

一面：
现场写代码。
React
算法题一道
问了下node 经历
问redux
过往项目中的亮点、最突出的能力在哪部分
离职原因
Redux深度还行。react深度有些欠缺

二分法查找一个值。
简答：
123 instantof Number  //false
new Number(123) instantof Number // true
Number(123) instantof Number // false
打印顺序：
setTimeout(() => {
    console.log(100)
}, 0)
console.log(200)
Promise.resolve().then(() => {
    console.log(300)
})
// 200,300,100

1、服务端鉴权怎么做的
2、cookie 和 session
3、发布者订阅与观察者模式区别
4、服务端如何聚合请求(减少http请求)
5、vue 为什么可以使用 vuex
6、有没有跨端的经验
7、算法题coding

项目：为什么用RN？为什么tslint转eslint？sequence动画怎么实现的
es6用到了哪些新特性？
数组里都是promise，怎么实现顺序调用？答：async + await + for of
上题，不用async怎么实现？
object和map的区别？map和weakMap区别？
对象里有个key不想让被修改，怎么实现？defineProperty，或者 proxy
defineProperty还有哪些属性？
proxy还有哪些属性？
symbol的作用和使用场景？
垂直居中布局有哪些实现方式？
微信前端样式的设计，图片 + 昵称 + 右边箭头点击跳转？
上题，图片contain属性是怎么实现的？border-raduis是怎么计算的？
上题，昵称想变一行且省略怎么实现？昵称太长时箭头隐藏怎么实现？
长列表问题，不用框架怎么实现？当item的height等高和不等高时怎么实现？

1. Vue 的通信方式
2. computed 和 watch 的区别？什么时候用？
3. 子组件和父组件生命周期顺序？
4. Vuex 的作用？
5. Vue router 的模式和各自原理？
6. 都有哪些优化方案？

1、babel解析流程原理？
2、ElementUI是如何做到按需引入？
3、Promise你写你怎么写？
4、微前端的大概原理？
6、TCP三次握手，四次挥手，如果两台设备正在连接通信中，其他一台重启，另一台是怎么处理的？
7、树的遍历，深度广度优先算法
8、[1，[2,3,[4,5]]，多维数组变成一维数组

性能优化、网络安全、还有底层的东西多、第三方框架的原理之类的
