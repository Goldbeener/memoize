const bucket = new Set();

const data = {
    text: 'hello world',
}

const target = new Proxy(data, {
    get(target, key) {
        bucket.add(effect)
        return target[key]
    },
    set(target, key, data) {
        target[key] = data
        bucket.forEach(fn => fn())
        return true
    }
})


function effect() {
    console.log('>>>', target.text);
}

effect()

setTimeout(() => {
    target.text = 'hello world 2222';
}, 1000)


/**
 * 缺陷：
 * 1. 不够灵活 data与effect的关系时硬编码的
*/