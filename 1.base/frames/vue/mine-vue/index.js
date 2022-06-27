function Vue(options) {
    if (process.env.NODE_ENV !== 'production' && !(this instanceof Vue)) {
        console.error('Vue 必须以构造函数形式调用')
    }
    this._init(options)
}

let uid = 0;
Vue.prototype._init = function (options) {
    const vm = this;
    vm._uid = uid++;
    vm._isVue = true;

    // 根组件初始化 合并options
    vm.$options = mergeOptions(vm.constructor, options, vm);

    // new Vue时如果传递了el，那么自动挂载
    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}

Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options
    // 获取到el 最终希望结果是一个node节点
    el = el && (el.nodeType ? el : document.querySelector(el))

    /**
     * 非render 情况下 需要确定renderFn 
     * 将template、el转化成renderFn
     * */ 
    if(!options.render) {
        let template = options.template
        if (template) {
            /**
             * template
             *  string
             *      selector
             *      html内容
             *  node
            */
            if (typeof template === 'string') {
                template = idToTemplate(template)
            } else if(template.nodeType) {  
                template = template.innerHTML
            } else {
                console.warn('template不合法')
            }
        } else if(el) {
            template = getOuterHTML(el) // 获取元素
        }
    }
    // template 最终是html内容 转换成renderFn 挂在options上
    const [render, staticRender] = compileTemplateToRenderFunctions(template)

    options.render = render
    options.staticRender = staticRender

    mountComponent(el);
}
