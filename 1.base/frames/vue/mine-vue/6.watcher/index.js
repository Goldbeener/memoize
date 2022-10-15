/**
 * 一个watcher
 * 解析一个表达式或者函数
 * 收集依赖，当表达式的值变化的时候触发回调函数
 */

let uid = 0;

export default class Watcher {
  constructor(vm, expOrFn, cb, options, isRenderWatcher) {
    this.vm = vm;

    if (isRenderWatcher) {
      vm._watcher = this;
    }
    vm._watcher.push(this);

    this.deep = !!options.deep || false; // 是否深度监听 每一层级都添加依赖
    this.lazy = !!options.lazy || false; // 是否懒执行 第一次
    this.sync = !!options.sync || false; // 是否同步？ 干啥的
    this.user = !!options.user || false; // 是否自定义

    this.defore = options.before;

    this.cb = cb; // 回调函数

    this.id = ++uid;
    this.active = true;
    this.dirty = this.lazy;

    this.deps = [];
    this.depIds = new Set();
    this.newDeps = [];
    this.newDepIds = new Set();

    // 获取值的函数
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = parsePath(expOrFn);
    }

    // 值 根据是否懒计算，确定结果
    this.value = this.lazy ? undefined : this.get();
  }

  // 取值 同时收集依赖
  get() {
    pushTarget(this);
    let value;
    const vm = this.vm;

    // 从vm上获取指定的属性数据
    value = this.getter.call(vm, vm);

    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
    return value;
  }

  // 添加依赖
  addDep(dep) {
    const id = dep.id;
    if (!this.newDepIds.has(id)) {
      this.newDepIds.push(id);
      this.newDeps.push(dep);
      if (!this.depIds.has(id)) {
        dep.addSub(this);
      }
    }
  }

  // 清除依赖
  cleanupDeps() {
    let i = this.deps.length;
    while (i--) {
      const dep = this.deps[i];
      if (!this.newDepIds.has(dep.id)) {
        dep.removeSub(this);
      }
    }

    let tmp = this.depIds;
    this.depIds = this.newDepIds;
    this.newDepIds = tmp;
    this.newDepIds.clear(); // 清空set

    tmp = this.deps;
    this.deps = this.newDeps;
    this.newDeps = tmp;
    this.newDeps.length = 0; // 清空数组
  }

  // 依赖变化时会被调用
  update() {
    if (this.lazy) {
      this.dirty = true;
    } else if (this.sync) {
      this.run();
    } else {
      queueWatcher(this);
    }
  }

  //
  run() {
    if (this.active) {
      const value = this.get();
      /**
       * 简单值 判断相等
       * 引用值 指针相同 可能值已经变化了
       * */
      if (value !== this.value || isObject(value) || this.deep) {
        const oldValue = this.value;
        this.value = value;
        if (this.user) {
          // 另一种形式的cb调用
          invokeWithErrorHandler(this.cb, this.vm, [value, oldValue], this.vm);
        } else {
          this.cb.call(this.vm, value, oldValue);
        }
      }
    }
  }

  //
  evalute() {
    this.value = this.get();
    this.dirty = false;
  }

  depend() {
    let i = this.deps.length;
    while (i--) {
      this.deps[i].depend();
    }
  }

  teardown() {
    if (this.active) {
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this);
      }
      let i = this.deps.length;
      while (i--) {
        this.deps[i].removeSub(this);
      }
      this.active = false;
    }
  }
}

let uid = 0;
class Dep {
  constructor() {
    this.uid = uid++;
    this.subs = [];
  }

  // sub 是Watcher实例
  addSub(sub) {
    this.subs.push(sub);
  }

  removeSub(sub) {
    remove(this.subs, sub);
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }

  notify() {
    const subs = this.subs.slice();
    for (let i = 0; i < subs.length; i++) {
      subs[i].update();
    }
  }
}

Dep.target = null;
const targetStack = [];
function pushTarget(target) {
  targetStack.push(target);
  Dep.target = target;
}
function popTarget() {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

// a.b.c 获取指定对象指定层级的属性
function parsePath(path) {
  let segments;
  if (typeof path === "string") {
    segments = path.split(".");
  } else if (Array.isArray(path)) {
    segments = path;
  }

  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  };
}
/**
 * TODO 拓展支持 数组形式传递参数 [a, 0, b, c]
 * a[0] === a['0']
 * 因此需要筛选出来正确的属性
 *
 * */

const obj = { a: { b: { c: 2 } } };
const a = parsePath("a.b.c")(obj);

// remove an item from an array
function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  }
}
