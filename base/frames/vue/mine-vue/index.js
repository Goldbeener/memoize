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

    vm.$options = mergeOptions(vm.constructor, options, vm);

    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}
