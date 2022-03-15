/**
 * 要解决 effect 嵌套问题
 * 外层的副作用函数执行 必然会导致内层的执行
 * 但是内层的执行 不应该引起外层的执行
 * 还有就是副作用函数的绑定关系
 * 当前是一个变量，内层执行会改变activeEffect的指向，并且没办法恢复，导致外层也绑定了内层的副作用函数
 * 
 * 思路就是
 * 维护一个副作用函数栈
 * 副作用函数调用时，将副作用函数压入栈中
 * 执行完成之后，推出，并将activeEffect指向栈顶
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
  const effectToRun = new Set(effectFns);
  effectFns && effectToRun.forEach(fn => fn())
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
 * target
 *      ok ---> effect
 *      text ---> effect
*/
let temp1, temp2;
useEffect(function fn1() {
  console.log('1 执行');
  useEffect(function fn2() {
    console.log('2 执行');
    temp1 = target.text
  })
  temp1 = target.ok
})

// 1、2 都会执行 1与 ok绑定，但是1的执行必然会执行2
setTimeout(() => {
  target.ok = false
}, 2000)

// 期望只执行2
setTimeout(() => {
  target.text = 'aa'
}, 4000)

/**
 * 但结果是 全部执行的都是2 
 * 因为 activeEffect 是一个全局变量 在2执行的时候，重置为了2；并且在2执行完成退出栈之后
 * 并没有恢复成1
 * 就造成嵌套的时候，始终是收集的是最内层的
 * `需要维护一个副作用函数栈 让activeEffect始终指向栈顶`
 * */




