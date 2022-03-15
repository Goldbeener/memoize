/**
 * 要解决 effectFn 中分支切换之后 对应的更新行为
 * 可能某些 对象的属性与effectFn的对应关系会发生变化
 * 
 * 思路就是
 * 每次执行副作用函数时，先把之前的对应关系清除掉；在本次执行之后，重新建立对应关系
 * 就需要根据副作用函数 反推 依赖数据
 * 需要在get的时候额外维护
*/

const bucket = new WeakMap();
const data = {
    ok: true,
    text: 'hello world',
};
let activeEffect;

// 副作用函数注册函数
function useEffect(fn) {

    const effectFn = () => {
        // 调用effect注册副作用函数时 将用户自定义的副作用函数赋fn值给activeEffect
        cleanUp(effectFn);
        activeEffect = effectFn;
        // 执行之前 清除一下 原来维护的数据与副作用函数的对应关系 然后在本次执行的时候 按照实际情况重新注册关系 
        fn();
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
useEffect(() => {
    console.log(target.ok ? target.text : 'not');
})

setTimeout(() => {
    target.text = 'hello v3'
}, 2000);

setTimeout(() => {
    target.ok = false
    // 本次执行之后 ，分支切换 下次text的变更不应该再触发 effect
}, 4000);

setTimeout(() => {
    target.text = 'should not log' // 但是事实上还触发了 因为建立了对应关系之后 没有再维护更新了
}, 6000);


