import Watcher from "./6.watcher/index";
import patch from "./7.patch/index";
function Vue(options) {
  if (!this instanceof Vue) {
    console.error("Vue 必须以构造函数形式调用");
  }
  this._init(options);
}

let uid = 0;
Vue.prototype._init = function (options) {
  const vm = this;
  vm._uid = uid++;
  vm._isVue = true;

  // 根组件初始化 合并options
  vm.$options = mergeOptions(vm.constructor, options, vm);

  callhook(vm, "beforeCreate");
  initState(vm);
  callhook(vm, "created");

  // new Vue时如果传递了el，那么自动挂载
  if (vm.$options.el) {
    vm.$mount(vm.$options.el);
  }

  function mergeOptions(a, b, c) {
    return b;
  }
};

Vue.prototype.$mount = function (el) {
  const vm = this;
  const options = vm.$options;
  // 获取到el 最终希望结果是一个node节点
  el = el && (el.nodeType ? el : document.querySelector(el));

  /**
   * 非render 情况下 需要确定renderFn
   * 将template、el转化成renderFn
   * */
  if (!options.render) {
    let template = options.template;
    if (template) {
      /**
       * template
       *  string
       *      selector
       *      html内容
       *  node
       */
      if (typeof template === "string") {
        template = idToTemplate(template);
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        console.warn("template不合法");
      }
    } else if (el) {
      template = getOuterHTML(el); // 获取元素
    }

    // template 最终是html内容 转换成renderFn 挂在options上
    const [render, staticRender] = compileTemplateToRenderFunctions(template);
    // render 函数的返回值是vnode

    options.render = render;
    options.staticRender = staticRender;
  }

  mountComponent(el);
};

// _render 函数主要的作用就是调用options选项内声明的render函数，生成vnode
Vue.prototype._render = function () {
  let vnode = null;
  const vm = this;

  const { render, _parentVnode } = vm.$options;
  vm.$createElement = (tag, data, children, normalizationType) =>
    createElement(vm, tag, data, children, normalizationType, true);

  /**
   * 调用render函数，并将vm.$createElement函数作为参数注入
   * render(h) {
   *      return h();
   * }
   * */
  vnode = render.call(vm.renderProxy, vm.$createElement);

  return vnode;
};

// 更新组件dom
Vue.prototype._update = function (vnode, isServerRender) {
  const prevVnode = vm._vnode; // 老版vnode
  vm._vnode = vnode; // 新的vnode

  if (!prevVnode) {
    vm.$el = vm.__patch__(vm.$el, vnode, isServerRender.false);
  } else {
    vm.$el = vm.__patch__(prevVnode, vnode);
  }
};

Vue.prototype.__patch__ = isBrowser ? patch : () => void 0;

function mountComponent(vm, el) {
  vm.$el = el;

  callHook(vm, "beforeMount");

  const updateComponent = () => {
    vm._update(vm._render());
  };

  new Watcher(
    vm,
    updateComponent,
    noop,
    {
      before() {
        callHook(vm, "beforeUpdate");
      },
    },
    true
  );

  callHook(vm, "mounted");
  return vm;
}

new Vue({ a: 1 });
