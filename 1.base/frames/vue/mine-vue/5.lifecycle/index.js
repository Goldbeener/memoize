function mountComponent(vm, el){
  vm.$el = el; // 组件$el属性绑定的是对应的dom

  callhook(vm, 'beforeMount');

  const updateComponent = () => {
    vm._update(vm._render())
  }

  // updateComponent 立即执行
  new Watcher(vm, updateComponent, noop, {
    before() {
      callhook(vm, 'beforeUpdate')
    }
  })

  callHook(vm, 'mounted')

  return vm
}