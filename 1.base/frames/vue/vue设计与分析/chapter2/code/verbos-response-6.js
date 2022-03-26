/**
 * 支持调度执行
 * 
 * 当trigger触发副作用函数时，
 * 有能力决定副作用函数执行时机、次数、方式
 * 
 * 思路就是
 * 在注册副作用函数是支持传入一个调度器函数，
 * 在该函数会被注入effect函数，
 * 在该函数内部可以设置指定的执行逻辑
*/

const bucket = new WeakMap();
const data = {
  foo: 1
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
 */
function useEffect(fn, options) {

  const effectFn = () => {
    // 调用effect注册副作用函数时 将用户自定义的副作用函数赋fn值给activeEffect
    // 执行之前 清除一下 原来维护的数据与副作用函数的对应关系 然后在本次执行的时候 按照实际情况重新注册关系
    cleanUp(effectFn);
    activeEffect = effectFn;
    effectStack.push(effectFn)
    fn();
    // 执行完成之后，将当前副作用函数弹出栈 并把activeEffect还原
    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1]
  }
  effectFn.options = options; // 在此将副作用函数的执行的配置绑定 在trigger的时候使用
  effectFn.deps = []; // 维护effectFn与state的映射关系
  effectFn()
}

function cleanUp(effectFn) {
  /**
   * 一个effect 可能使用了多个数据；因此deps内就会有多个属性对应的set
   */
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i];
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0;
}

// 读取的时候 收集依赖
function track(target, key) {
  if (!activeEffect) return;
  /**
   * WeakMap
   * Map
   * Set 
  */
  let depsMap = bucket.get(target);

  // 说明bucket内还没有 target 对象相关的信息 需要重新初始化
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }

  let deps = depsMap.get(key);
  // 下一层是 key 与 effetFn的映射  没有的话 初始化
  if (!deps) {
    depsMap.set(key, (deps = new Set()));
  }
  deps.add(activeEffect);
  activeEffect.deps.push(deps);
}

// 设置的时候 通知依赖更新
function trigger(target, key) {
  // 根据key取出对应的 effectFns 是有对应关系的
  const depsMap = bucket.get(target);
  if (!depsMap) return;

  const effectFns = depsMap.get(key);
  // 这个地方做了一层转换 是为了避免在循环set的时候又添加新元素造成的无限循环 
  // 
  const effectToRun = new Set();
  effectFns.forEach(fn => {
    // 正在执行的是否是本身，是的话就不加
    if (fn !== activeEffect) {
      effectToRun.add(fn);
    }
  })
  effectToRun && effectToRun.forEach(fn => {
    if (fn.options && fn.options.scheduler) {
      // 判断副作用函数是否绑定了调度选项
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

useEffect(() => {
  console.log(target.foo)
}, {
  // 
  // scheduler(fn) {
  //   setTimeout(fn, 0);  // 实现调用时机控制
  // },
  scheduler(fn) {
    jobQueue.add(fn); // 首先set去重，多次添加只会有一个
    flushJob(); // 其次，执行的时候是在微任务队列执行，在一个tick内多次调用，都只会在最后一次执行，利用最后的状态
    // 以此达到多次触发，只执行一次
    // 类似vue修改响应式数据只会触发一次的机制，vue的调度器更加完善
    // TODO 复习vue的调度器
  }
})

target.foo++;
target.foo++;

// console.log('结束了')






