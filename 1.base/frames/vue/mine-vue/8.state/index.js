export default function initState(vm) {
  const opt = vm.$options;
  initProps(vm, opt.props);
  initMethods(vm);
  initData(vm);
  initComputed(vm);
  initWatchers(vm);
}

function initProps(vm, propsOptions) {
  const propsData = vm.$options.propsData || {};
  const props = vm._props || {};
  const keys = vm.$options._props.keys || [];

  for (const key in propsOptions) {
    keys.push(key);
    const value = validateProps(key, propsOptions, propsData, vm);
    defineReactive(props, key, value);
    proxy(vm, "_props", key);
  }
}

function defineReactive(obj, key, value, customSetter) {}
