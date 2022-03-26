/**
 * computed
 * 
 * 实现思路：
 * 1. 懒执行
 * 2. 获取到副作用函数的结果值
 * 3. 将副作用函数作为getter
*/

const bucket = new WeakMap();
const data = {
  foo: 1,
  bar: 2,
};

let activeEffect;
const effectStack = [];

/*** 忽略中间过渡状态的任务队列管理  ***/

const jobQueue = new Set();
const p = Promise.resolve();
let isFlushing = false;

function flushJob() {
  if (isFlushing) return

  isFlushing = true;

  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
    isFlushing = false;
  })
}

/*** 忽略中间过渡状态的任务队列管理  ***/

// 副作用函数注册函数
/**
 * @param {Function} fn
 * @param {Object} options
 *    scheduler function
 *    lazy boolean
 */
function useEffect(fn, options) {

  const effectFn = () => {
    cleanUp(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn);
    const res = fn();
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
    return res; // 副作用函数的返回值
  }

  effectFn.options = options;
  effectFn.deps = [];

  if (options && !options.lazy) {
    effectFn()
  }
  return effectFn; // 懒执行 不直接执行
}

function cleanUp(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0;
}

// 读取的时候 收集依赖
function track(target, key) {
  if (!activeEffect) return;

  let depsMap = bucket.get(target);

  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key);
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

// 设置的时候 通知依赖更新
function trigger(target, key) {
  const depsMap = bucket.get(target);
  if (!depsMap) return;

  const effectFns = depsMap.get(key);
  const effectToRun = new Set();
  effectFns.forEach(fn => {
    if (fn !== activeEffect) {
      effectToRun.add(fn);
    }
  })
  effectToRun && effectToRun.forEach(fn => {
    if (fn.options && fn.options.scheduler) {
      fn.options.scheduler(fn);
    } else {
      fn()
    }
  })
}

const target = new Proxy(data, {
  get(target, key) {
    track(target, key)
    return target[key];
  },
  set(target, key, value) {
    target[key] = value;
    trigger(target, key)
    return true;
  }
});

/**
 * 利用响应式数据原理
 * 懒计算
 * 获取值
 * 
 * 存在问题
 * 多次获取还是会多次计算
 * */

function computed(getter) {
  let value;
  let dirty = true; // 标识是否需要重新计算值

  const effectFn = useEffect(getter, {
    lazy: true,
    scheduler(fn) {
      // 是数据每次更新时候 通知副作用函数执行，在这个时机相关的computed函数需要重新执行
      if (!dirty) {
        dirty = true
        trigger(target, 'value');
      }
      jobQueue.add(fn)
      flushJob();
    }
  });

  return {
    get value() {
      if (dirty) {
        value = effectFn();
        dirty = false;
      }
      track(target, 'value')
      return value;
    }
  }
}

const sumRefs = computed(() => {
  return target.foo + target.bar
})

useEffect(() => {
  // 使用到计算属性，希望在计算属性更新时 执行这个副作用函数
  console.log(sumRefs.value) // 3
})

target.foo = 2;

// 期望输出3、4










