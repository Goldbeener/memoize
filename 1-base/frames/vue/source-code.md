## 源码构建

Runtime Only VS Runtime + Compiler
Runtime Only: 需要借助webpack等打包工具，将.vue文件编译成js；这一步编译提前完成，那么在线上就只需要运行时的代码，vue的包体积更小了；

Runtime + Compiler: 没有对代码做编译，但是又使用了template属性传入字符串，那么就需要在运行时编译，vue源码包也需要加入编译器模块；包体积更大，并且运行时编译也会慢点

> vue最终的渲染都是通过render函数
> template属性对应的字符串会被编译成render函数
> 如果直接在vue实例中书写render函数，那么也不需要编译器

针对不同的平台以及模块规范 web、server、weex  + cjs、esm、umd
可以打包出不同的产物

## 入口
vue-runtime-compiler --> 主要是对$mount函数处理，处理了template、el、render函数三种形式的统一
vue.runtime.js -->  配置相关
core/index -->   在此文件中`在Vue上直接注册`了各种全局api
instance/index     在此文件中声明了一个Vue构造函数 并`在原型上注册`了init、state、events、render等各种方法


import机制
    在使用`import Vue from 'Vue'`的时候 引入vue源码的各个依赖文件，
    已经完成vue各个类属性、方法和实例属性方法的挂载
    Vue 构造函数 --- class
        类属性
        类方法
        实例属性
        实例方法
            + vm._init
            + vm.$mount
            + vm._render
            + vm._update

new Vue()
    调用vue的_init方法
        合并配置
        初始化生命周期
        初始化事件中心
        初始化渲染 
        初始化data、props、computed、watcher
        调用$mount
    $mount
        保存最初的mount
        将template、el转换成render函数 
        执行mount函数
            mountComponent
                1. beforeMount mounted 生命周期钩子
                2. 初始化组件mounte 以及 在组件更新的时候 触发更新生命周期和逻辑
                3. 核心功能是`vm._render和vm._updat`
                   1. vm._render `将当前组件转换成虚拟DOM` render函数入参是h(createElement); 最终返回值是vnode
                      1. 利用vm.$createElement 就是 render函数中的 createElement
                         1. createElement --> _createElement
                            1. 最终得到一个虚拟dom tree
                   2. vm._update `将VNode渲染成真实的DOM`
                      1. 2次调用时机
                         1. 组件首次渲染
                         2. 数据更新时候
                      2. vm.__patch__
                         1. patch
                            1. createPatchFunction  针对web和weex2个平台
                               1. 本质工作是根据对比VNode找出需要更新的部分，再映射到真实的DOM中
                                  1. VNode Diff 工作在2个平台上是相同的
                                  2. 真实的dom更新操作是不同的
                                  3. 因此内部返回了一个真正的patch函数


组件化
    组件初始化
        createComponent
            构造子类的构造函数 返回一个继承自Vue的子类，然后增加上组件的东西
                Vue.extend
                    经典继承
                    初始化props和computed
                    全局组件、指令、过滤器继承
            安装组件钩子函数
            实例化vnode
                组件的vnode没有children选项
                普通元素节点的vnode是有children的

生命周期
    beforeCreated: 在初始化数据状态之前，因此在这个钩子里不能获取props、methods、data、computed、watch （按顺序注册）
    created: 在初始化数据状态之后，因此可以获取到数据；但是在mount执行之前，因此不能获取DOM
    beforeMount: 没什么说的，开始调用render生成vnode，调用update将vnode更新到真实DOM
    mounted: 此时已经挂载了真实DOM，可以获取dom节点

组件注册
    全局组件注册
        mergeOptions
    局部组件注册

## 响应式
### 解决什么问题？
1. 我需要修改哪一块的DOM？
2. 我的修改频率和性能是不是最优的?
3. 我需要对每一次的修改都去操作dom吗？
4. 我需要case by case去修改dom的逻辑吗？

### 响应式对象

```js
Object.defineProperty(obj, key, descriptor)
```

### initState
按照如下顺序初始化数据
1. initProps
2. initMethods
3. initData
4. initComputed
5. initWatch

后初始化的自然可以使用之前已经初始化完成的
在data里面可以使用props和methods

#### initProps
1. 将props变成响应式 `defineReactive`
2. 将props代理到vm上，`proxy`使得通过this可以访问

#### initData
1. 将data中的属性代理到vm上，`proxy`使得通过this可以访问
2. `observe` 创建响应式数据 监测数据变化
   1. 依赖收集
   2. 派发更新
      1. 并不会在每次数据变更的时候都触发watcher回调，而是把所有的watcher先添加到一个队列里，在`nextTick`后执行 `flushSchedulerQUeue`
      2. 执行的时候要先排序 保证
         1. 组件的更新由父到子
         2. 用户的watcher要优先于渲染watcher
         3. 如果子组件在父组件中的watcher中被销毁，那么子组件对应的watcher会被跳过
      3. 在清空队列的过程中，可能会实时插入新的

```js
function defineReactive(obj, key) {
    const conf = Object.getOwnPropertyDescript(obj, key);

    Object.defineProperty(obj, key {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            const value = getter.call(obj);
            dep.append() // 收集依赖
            return 
        }, 
        set: function reactiveSetter(newVal) {
            setter.call(obj, newVal); // 设置新值
            dep.notify(); // 通知依赖更新
        }
    })
}

class Observer {
    constructor(value) {
        this.value = value;
        this.dep = new Dep();
        this.vmCount = 0;
        value.__ob__ = this;

        if (Array.isArray(value)) {
            // 转化数组
            this.observeArray(value)
        } else {
            // 转化对象
            this.walk(value)
        }

    }

    // 响应化对象 通过遍历对象的所有属性 将所有属性转换成响应式
    walk(value) {
        const keys = Object.keys(value);
        for(let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i])
        }
    }

    // 响应化数组
    observeArray(value) {
        for(let i = 0; i < value.length; i++) {
            observe(value[i]);
        }
    }
}

function observe(data) {
    if (typeof data !== 'object' || (data instanceOf VNode)) {
        return
    }
    if (data.__ob__ && data.__ob__ instanceof Observer ) {
        reuturn data.__ob__
    }

    // 返回对象的观察者实例
    return new Observer(data)
}
observe(data);

```

#### nextTick
Vue在更新DOM时是异步更新的
    侦听到数据变化之后，开启一个队列，缓冲在同一事件循环中发生的所有数据变更
    如果同一个watcher被多次触发，只会被推入到对立中一次
    在事件循环的下一个tick中执行更新工作
在下次DOM更新循环结束之后执行延时回调

主线程的执行过程就是一个tick

核心思想就是： 先把要执行的任务压入一个callback队列中；然后一次性的执行

## 元素操作
### document.createElementNS
常见的XML标签语言
+ HTML
+ SVG
+ XBL
+ XUL
  
> 模块化的背景下，不同的模块有相同的概念，为了不造成重复成本
> 对相同的概念起了相同的名字
> 比如svg里的标签和html内的标签，都是标签改变，都有attribute属性
> 这些概念在同一个文档的时候可能会造成命名冲突
> 因此需要命名空间的概念

一个文档内可能包含多种XML语言
不同的XML语言内可能包含相同的标签和属性

因此在创建标签和设置属性的时候 最好指定命名空间，就是指明当前操作的是哪种类型的XML

不同标签语言对应的命名空间
+ HTML - http://www.w3.org/1999/xhtml
+ SVG  - http://www.w3.org/2000/xhtml
+ XBL  - http://www.mozilla.org/xbl
+ XUL  - http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul

```js
document.createElementNS(namespace, tag)

// 明确表示创建的是一个html的标签div
document.createElementNS('http://www.w3.org/1999/xhtml', 'div')
```
## Virtual DOM
DOM操作是比较昂贵的，js引擎线程和GUI渲染线程是互斥的，dom操作引起渲染线程重绘重排的时候，js引擎线程是会被block的

Virtual DOM 是使用一个js对象去描述一个dom节点，是在js引擎线程内部的行为，并不会引起渲染

Vue中是定义了一个VNode类来描述一个node节点，实现virtual DOM

VNode 是对真是DOM的抽象描述，核心的属性： 标签名 数据 子节点等

Virtual DOM 映射到 真实DOM上需要经过： create、diff、patch等过程

> 借鉴 snabbdom 


### 意义
Virtual DOM最大的意义是`避免了不必要的、中间态DOM操作`

> 不会提升单次DOM更新的效率，这还是需要线程间通信，渲染引擎和js引擎跨线程通信
> 然后渲染线程 解析（文本解析） - 排版（生成DOm） - 渲染（生成render tree）
> 这个效率并没有提升，并且是依赖浏览器厂商对浏览器实现的

正常的是每次数据变化引起一次DOM更新，使用Virtual DOM之后，中间的一些状态不会触发dom更新，只是vnode的变化
只有最终状态才会触发dom更新



## 数据驱动
视图是由数据驱动生成的
通过修改数据来更新视图

模板和数据 最终怎么渲染成DOM？

$mount() 实现的

和平台有关 三种模式下都有
runtime-with-compiler
runtime
weex

runtime-with-compiler



数据更新如何驱动视图更新？
