## render function
渲染函数是完整的响应性渲染系统的另一半

是渲染函数和data属性中的数据有依赖关系

## template 
模版渲染

基础渲染;
Template
--> (compiler into) render function;
--> (retruns) Virtual DOM
--> (generates) Real DOM;


## render function Vs Template
他们的最终目标都是为了，**声明式的描述DOM结构与状态的关系**。

template
+ 静态
+ 受限，有一些格式化的写法，语法糖
+ 容易做优化

render function （jsx）
+ 动态 不容易实现优化
+ 更加灵活，渲染函数内可以自由的编写代码
+ 不必实现的新的语法



### 动态渲染标签
```html
<script>

  Vue.component('example', {
    props: {
      tags: {
        type: Array,
        default: () => []
      }
    },
    render(h) {
      // 需要注意这里不能使用箭头函数 否则不能正常使用this
      return h('div', this.tags.map((tag, i) => h(tag, i)))
    }
  })

</script>
```

### 动态渲染组件
```html
<div id='app'>
  <example :ok="ok">
</div>
<script>
  const Foo = {
    functional: true,
    render: h => h('div', 'foo')
  }
  const Bar = {
    functional: true,
    render: h => h('div', 'bar')
  }

  /**
   * functional component
   * 没有内部状态
   * 仅仅依靠外部传递的数据，props、slots等，决定组件的vnode
   * 函数式组件没有vue实例，因此渲染函数内不能使用this
   * 如名字所描述，函数式组件本质上是一个纯函数，接受一些参数，返回vnode，没有内部变量，仅仅靠参数决定返回值
   * 
  */

  Vue.component('example', {
    props: {
      ok: {
        type: Boolean,
        default: true
      }
    },
    functional: true
    render(h, { props}) {
      return props.ok ? h(Foo) : h(Bar)
    }
  })

  const vm = new Vue({
    el: '#app',
    data() {
      return {
        ok: false
      }
    }
  })

</script>
```

### 函数式组件
```html
<script>
Vue.component('example', {
  props: ['xxx'], // 函数式组件的props可以省略，会自动的把组件上所有的内容透传到内部
  functional: true,
  render(h, context) {
    /**
     * 函数式组件没有状态（响应式数据）也没有vue实例，因此不能使用this
     * 但是多了一个参数，context: { props, slots, ... }
     * props.slots().default, props.slots().nameSlot
     * props.children 函数式组件的所子内容，包含默认slot和具名slot
     * 在只有默认slot的场景下，children === slots().default
     * */ 
    return h('div', context.props.tags.map((tag, i) => h(tag, i)))
  }
})
</script>
```

### 高阶组件
接收半成品的状态，根据这个状态，做一些逻辑处理，最终根据处理后的数据，返回组件

> 貌似看是在一个基础组件上，做一些逻辑的封装
> 是纯数据的处理

```html
<div id="app" >
  <SmartAvatar :user-name="userName"/>
</div>

<script>
  const cache = {};
  function getUrl(name, cb) {
    setTimeout(() => {
      cb('xxxx')
    }, 500)
  }
  const Avatar = {
    props: ['url'], 
    render(h) {
      return h(img, { attrs: { src: this.url} })
    }
  }

  /**
   * 高阶组件
   * 接收一个基础组件，返回一个新组件
   * 在组件内有新的逻辑
   * */ 
  const withUserName = function(innerComponnet) {
    
    return {
      props: ['userName'],
      data() {
        return {
          url: cache[this.userName] || 'default.url'
        }
      },
      created() {
        const userName = this.userName
        if(!cache[userName]) {
          getUrl(userName, (url) => {
            this.url = cache[userName] = url
          })
        }
      },
      render(h) {
        h(innerComponnet, { 
          props: { 
            url: this.url
          }
        })
      }
    }
  }

  const SmartAvatar = withUserName(Avatar)
</script>

```