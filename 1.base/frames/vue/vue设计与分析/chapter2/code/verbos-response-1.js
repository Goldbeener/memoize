/**
 * 仅仅解决了 effectFn 的问题
 * 能够灵活的是注册 effectFn
 * 可以是匿名函数、任意命名函数 等
*/

const bucket = new Set();
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

const target = new Proxy(data, {
    get(target, key) {
        /**
         * 添加的是 activeEffect 
         * 存在的缺陷是 没有区分key与effect的对应关系
         * 可能存在 设置不存在的key  
         * */
        if (activeEffect) {
            bucket.add(activeEffect);
        }
        return target[key];
    },
    set(target, key, value) {
        target[key] = value;
        /**
         * 同样的问题
         * 存在的缺陷是 没有区分key与effect的对应关系
         * 新增属性会导致 effect触发  
         * */
        bucket.forEach(fn => fn())
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


