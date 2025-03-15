function observe(value) {
  const subscribers = new Set();

  return {
    subscribe(fn) {
      subscribers.add(fn);
    },
    update(value) {
      subscribers.forEach((fn) => fn(value));
    },
  };
}

let count = observe(1);
let doubled;

count.subscribe((count) => {
  console.log(count);
});

// 手动的订阅
count.subscribe((count) => {
  doubled = count * 2;
  console.log('doubled is ', doubled);
});

count.update(2);

/**
 * 需要一堆数据和副作用函数的对应关系
 * 然后在数据更新的时候，执行副作用函数
 * 如何知道数据更新？
 * 发布订阅模式/观察者模式
 *
 * 手动的发布订阅 --》 自动的发布订阅
 * */
