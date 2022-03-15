// 依赖关系维护
const bucket = new Set();
// 数据
const data = {
    text: 'hello world',
}

const target = new Proxy(data, {
    get(target, key) {
        // 读取的时候 存储副作用函数
        bucket.add(effect)
        return target[key]
    },
    set(target, key, data) {
        target[key] = data
        // 设置后 数据更新 通知副作用函数更新执行
        bucket.forEach(fn => fn())
        return true
    }
})

// 使用数据的副作用函数
function effect() {
    console.log('>>>', target.text);
}

effect()

setTimeout(() => {
    target.text = 'hello world 2222';
}, 1000)


/**
 * 有一个地方存储 用来存储使用了数据的副作用函数
 * 在数据被读取的时候，存储
 * 在数据被设置更新的时候，取出副作用函数 执行
 * 缺陷：
 * 1. 不够灵活 data与effect的关系是硬编码的 副作用函数名字是固定的effect
 * 2. 对象数据与副作用函数的映射关系不准确，没有详细到对象属性与副作用函数的对应关系，
 *      会存在，改变不相干的属性，导致所有副作用函数被执行
*/