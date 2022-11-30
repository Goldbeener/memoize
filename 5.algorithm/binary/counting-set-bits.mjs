/**
 * 计算一个整数的二进制表示中有多少位是1
 */

function popcnt(x) {
  let diff = x;
  while (x) {
    x >>>= 1;
    diff -= x;
  }
  return diff;
}
console.log("popcnt", popcnt(2));

function popcnt_mormal(x) {
  let sum = 0;
  let remaining = x;
  while (remaining) {
    remaining >>= 1;
    sum += remaining;
  }
  return x - sum;
}
console.log("popcnt_mormal", popcnt(2));

/**
 * 引用文章
 * http://www.robalni.org/posts/20220428-counting-set-bits-in-an-interesting-way.txt
 * */
