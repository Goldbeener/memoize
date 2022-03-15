/**
 * 要解决 effect 无限递归循环问题
 * 
 * 正常的effect函数内，只涉及到对数据的读取；
 * 对数据的修改是在其他地方触发的
 * 
 * 如果effect函数内既有数据的读取，又有数据的修改
 * 那么读取的时候，触发track，收集effect；
 * 修改的时候，触发trigger操作，需要取出effect执行
 * 但是此时effect还在执行中，就会产生递归引用问题
 * 
 * 思路就是
 * trigger的时候，判断是否是当前正在执行函数，
 * 如果是的话，就不触发执行
*/

const bucket = new WeakMap();
const data = {
  ok: true,
  text: 'hello world',
};
let activeEffect;
const effectStack = [];

// 副作用函数注册函数
function useEffect(fn) {

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
  effectFn.deps = [];
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
    if (fn !== activeEffect) {
      effectToRun.add(fn);
    }
  })
  effectToRun && effectToRun.forEach(fn => fn())
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
  target.ok += 1;
})

console.log('>>>', target.ok)




