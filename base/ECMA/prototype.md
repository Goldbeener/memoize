# new

## 做了什么
1. 创建一个新对象，空的 {}
2. 将新对象的内部属性 `__proto__` 指向(**当前时刻**)函数的`prototype`属性；
   1. 如果在new 过程结束之后，修改函数的prototype引用，那么已经实例化的对象是不能继承新的属性的
3. 将函数this指向新对象，并且执行函数 （其实类似于 函数bind新对象执行）
4. 将第一步创建的对象返回
   1. 除非显式return一个非null的 object； 此时实例的原型跟此构造函数已经断开，因为此时返回的对象的`__proto__`是`Object.prototype`, 与构造函数的`prototype`已经断开

```js
function myNew(fn, ...args) {
    // 创建一个新对象
    var obj = {};

    // 把新对象的原型指向构造函数的prototype属性
    if (fn.prototype !== null) {
        obj.__proto__ = fn.prototype; // 
    }

    // 执行函数并将this指向新对象
    var ret = fn.apply(obj, args);

    // 返回非空对象 或者 新对象
    if (typeof ret === 'object' && typeof ret !== null) {
        return ret;
    }

    return obj;
    
}

function A(a, b) {
    this.a = a;
    this.b = b;
}

var foo = myNew(A, 1, 2)
```


function 函数声明 函数定义
函数都有 `prototype` 属性， 属性值是对象，该对象天然有一个`constructor`属性, 指向函数本身；
函数本质上是对象，因此也会有所有对象都有的`__proto__`属性，指向`Function.prototype`; 因为函数声明/定义，本质上是用`Function`构造函数生成的

所有对象 包括 function 
都有`[[prototype]]` = `__proto__`  属性
是在对象被创建时设置的， 无论是什么形式创建的
    + new Fn() 
    + Object.create()
      + `Object.create()`方法创建一个新对象，使用传入的参数对象作为生成的新对象的`__proto__`
    + 字面量
    + class

除了通过new实例化（包括new构造函数 和 new class）、Object.create()方法之外声明的对象，
其他对象声明（字面量、class基类）本质都是Object构造函数生成的


```js
// 对象字面量
var obj = {};

obj.__proto__ === Object.prototype
obj.constructor === Object

Object.prototype.__proto__ === null;

// Object.create
var p = { a: 1 };
var obj = Object.create(p)

obj.__proto__ === p



function Foo() {}
var foo = new Foo();

Foo.prototype === { constructor: Foo }
Foo.prototype.constructor === Foo;
Foo.__proto__ === Function.prototype

foo.__proto__ === Foo.prototype;
foo.constructor === Foo;


Foo.prototype.__proto__ === Object.prototype;
Foo.prototype.constructor === Object;

```

**在构造函数实例化之后，重新赋值构造函数的prototype对象，不会对实例产生影响**
```js
function Foo(name) {
    this.name = name;
}
Foo.prototype.age = 18;
var foo = new Foo('Jane');

// foo.age = 18; 
Foo.prototype = {
    gender: 'female',
};

foo.gender // undefined

var foo2 = new Foo('Kate');

```

### 继承

继承机制
构造函数+new操作符，无法共享属性和方法
prototype属性，可以共享属性和方法


目的：`子函数的原型继承父函数的原型`; 父函数实例的属性不需要继承

```js
function Parent(name) {
    this.name = name;
}

Parent.prototype.sayName = function() {
    console.log(this.name);
}

function Children(age) {
    this.age = age;
}

// 方法1 不推荐 有问题  会把Parent的非原型属性方法 加在继承链上
// Children.prototype = new Parent('xxx'); 这样

// 方法2
Children.prototype = Object.create(Parent.prototype);

// 方法3
var F = function() {};
F.prototype = Parent.prototype
Children.prototype = new F();

// 方法4 复制 不推荐 因为Parent原型属性的增减 不能同步到Children
Children.prototype = {
    ...Parent.prototype,
    // constructor: Children,
}


// 无论哪一种方法 这一句都是必须的
Children.prototype.constructor = Children;

Children.prototype.gender = 'female';

var obj = new Children(12);

```


### instanceof
`instanceof` 用以检测构造函数的prototype属性是否出现在某个实例对象的原型链上

说人话： 就是实例对象是否继承了某个构造函数属性， 对象是否是某个构造函数的实例

```js
Object instanceof Object // Object构造函数 作为对象 继承了 Object
Object instanceof Function // Object作为构造函数  继承了Function
Function instanceof Function // Function作为构造函数 继承了Function
Function instanceof Object // Function构造函数 作为对象 继承了 Object

```



+ [Javascript – How Prototypal Inheritance really works](http://blog.vjeux.com/2011/javascript/how-prototypal-inheritance-really-works.html)
+ [Constructors Considered Mildly Confusing](https://zeekat.nl/articles/constructors-considered-mildly-confusing.html)
+ [new keyword](https://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript)
