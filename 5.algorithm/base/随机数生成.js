const getRandom = (function () {
  let seed = Date.now();
  function rnd() {
    seed = (seed * 9301 + 49297) % 233280; //为何使用这三个数?
    return seed / 233280.0;
  }
  return function rand(number) {
    return Math.ceil(rnd() * number);
  };
})();
myNum = getRandom(5);

// 获取随机数
function generateRandomInterger(num) {
  return Math.floor(Math.random() * num) + 1;
}
// 获取区间内随机数
function generateRangeRandomInterger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// 获取区间内指定位数浮点数
function generateRangeRandomFloat(min, max, places) {
  const value = Math.random() * (max - min + 1) + min;
  return Number.parseFloat(value).toFixed(places);
}
