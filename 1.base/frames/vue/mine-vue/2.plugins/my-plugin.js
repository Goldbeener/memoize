const MyPlugin = {
  install(Vue) {
    /**
     * evan 建议将全局的mixin包装在一个插件中使用 
     * 因为插件在重复调用的时候会覆盖前一个，不会造成重复调用
     * mixin不会，如果将同一份mixin多次引入，会被重复执行
     * 除此之外，引用方式更加统一 更加清晰 都是Vue.use(xxx)
     * */
    Vue.mixin({
      created() {
        /***
         * 每个组件都有一个$options 属性
         * 包含了所有组件选项
         * 内置的
         * 声明时传递的
         * 自定义的
         * extend的
         * mixin的
         * */
        if (this.$options.rules) {
          Object.keys(this.$options.rules).forEach(key => {
            const { validate, message } = this.$options.rules[key];
            this.$watch(key, (val) => {
              const res = validate(val);
              if (!res) {
                cosnope(message);
              }
            });
          });
        }
      }
    });
  }
};

Vue.use(MyPlugin);

new Vue({
  data() {
    return {
      foo: 0
    };
  },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than 1'
    }
  }
});