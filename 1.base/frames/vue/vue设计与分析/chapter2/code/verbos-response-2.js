/**
 * 要解决 对象key 与 effect的对应关系
 * target
 *    key
 *      effectFN ()
*/

const bucket = new WeakMap();
const data = {
    text: 'hello world',
};
let activeEffect;

// 副作用函数注册函数
function useEffect(fn) {
    // 调用effect注册副作用函数时 将用户自定义的副作用函数赋fn值给activeEffect
    activeEffect = fn;
    // 执行
    fn();
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

    let deps = depsMap.get(key); // 与对象属性key绑定的 做到了属性级别的隔离
    // 下一层是 key 与 effetFn的映射  没有的话 初始化
    if (!deps) {
        depsMap.set(key, (deps = new Set()));
    }
    deps.add(activeEffect);
}

// 设置的时候 通知依赖更新
function trigger(target, key) {
    // 根据key取出对应的 effectFns 是有对应关系的
    const depsMap = bucket.get(target);
    if (!depsMap) return;

    const effectFns = depsMap.get(key);
    effectFns && effectFns.forEach(fn => fn())
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

// 这是使用数据 类似 ref之类的?
// useEffect(() => {
//     console.log(target.text);
// })

// setTimeout(() => {
//     target.text = 'hello v3'
// }, 2000);

useEffect(() => {
    console.log('>>>> effect run');
    console.log(target.text);
})

setTimeout(() => {
    target.none_exist = 'hello v3'
}, 2000);


/**
 * weakMap 常用来存储那些只有当key所引用的对象存在时才有价值的信息
 * 但是weakmap本身并不会对key所引用的对象造成额外的引用计数，不会影响垃圾回收机制
*/