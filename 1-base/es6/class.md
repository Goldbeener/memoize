# class

## 背景
class是面向对象编程中创建拥有共同属性和方法的一系列对象的模板。

在es5之前，为了实现此目的，是通过构造函数来解决的。

```js
function 

```

es6 提供了class的概念，仅仅是写法上更接近传统语言的class，    
本质是es5构造函数的语法糖，可以与`prototype`、`__proto__` 混用


## 有机构成
### constructor
必须的
没有的话会被默认添加
类体内的属性会被作为实例属性；所有的方法都会被挂在`prototype`上, 包括`constructor`

`constructor`方法默认返回类的实例； 除非手动返回一个其他的实例 
> 其实就是构造函数 那一套


### 实例属性
1. constructor 中this上挂的属性
2. 直接在类体顶层声明的变量
   1. 仅仅变量 函数会被挂在原型上的
   
obj.hasOwnPrototype(prop) 能够检测出来 
### 原型属性
class内的所有函数 会被默认挂在原型上，作为原型属性

prop in obj 操作符是true
obj.hasOwnPrototype(prop)  false
### getter/setter函数

针对某个属性的存、取值函数，会拦截该属性的存取行为

如果想要监测某个属性的存取行为，那么会用到

并且该属性是挂在原型上的，算是一种`原型属性`

正常写法
```js
class MyClass {
    #init = 0;
    constructor() {

    }
    get prop() {
        return this.#init;
    }
    set prop(value) {
        console.log('setter', value);
        this.#init = value;
    }
}

const ins = new MyClass();
console.log('>>>>', ins.prop);
ins.prop = 1;

```

> 这里涉及到私有字段声明，在class内部可以有字段声明，包括公有字段声明和私有字段声明


正常情况下，getter和setter是需要配合私有字段使用的，确保getter/setter函数对应的属性的存取行为都是可控的。

下面的这种写法会有问题
```js
class MyClass {
    constructor() {
        this.prop = 0;
    }
    get prop() {
        console.log('>>>>getter'); // 注意不能在此试图读取prop
    }
    set prop(value) {
        console.log('setter', value); // 也不能在此试图设置prop 否则会因此循环调用导致栈溢出
    }
}

const ins = new MyClass(); // 执行constructor函数，调用setter一次
console.log('>>>>', ins.prop); // 调用getter一次，返回值是undefined
ins.prop = 1; // 调用setter
```

### 静态方法
类中定义的方法都会被实例继承，但是加上static关键字，就表示该方法不会被实例继承，只能通过类调用

静态方法内的this指向类本身，而不是实例。
### 静态属性
### new.target
1. 限制函数只能作为构造函数使用，不能直接调用
2. 限制类不能独立使用，必须继承后才能使用

### 继承
super       
可以作为函数调用，但是只能用在子类的constructor里面，其他地方调用会报错    
可以作为对象，在普通方法中，指向父类的`原型属性`；在静态方法中，指向父类
#### constructor中使用
子类的constructor中必须先调用`super()`, 才能使用子类的this，然后扩展新增属性
#### 作为对象调用
在子类普通方法中通过super调用父类原型方法时，方法内部的this始终指向子类实例。
在子类静态方法中通过super调用父类静态方法时，方法内部的this始终指向子类本身。
