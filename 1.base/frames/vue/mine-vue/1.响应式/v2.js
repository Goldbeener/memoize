// trans obj to reactive
function observe(obj) {
  Object.keys(obj).forEach(key => {
    let newValue = obj[key];
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // 在获取时添加依赖
        dep.depend();
        return newValue;
      },
      set(value) {
        // 在设置时通知依赖更新
        newValue = value;
        dep.notify();
      }
    });
  });
}

// 全局
let activeEffect = null;

// 依赖类 可以添加依赖 通知依赖
class Dep {
  constructor() {
    this.dependList = new Set();
  }
  depend() {
    if (activeEffect) {
      this.dependList.add(activeEffect);
    }
  }
  notify() {
    this.dependList.forEach(dep => dep());
  }
}

function autoRun(cb) {
  /**
   * 包装函数
   * 使得无论传进来是什么形式的函数，匿名函数、命名函数
   * 都能以统一的形式暴露在外部
   * */
  function innerFn() {
    activeEffect = innerFn;
    cb();
    activeEffect = null;
  }
  innerFn(); // 需要执行一下 创建依赖关系
}

let obj = { a: 1 };
// 变成响应式
observe(obj);
// 使用
autoRun(() => {
  console.log(obj.a);
});
// 改变属性值
obj.a++;
// 应该是自动执行



/***
 * TODO
 * 1. 条件分支问题 
 * 2. 提升问题
 * 3. 新增属性问题
 * 4. 嵌套问题
 */