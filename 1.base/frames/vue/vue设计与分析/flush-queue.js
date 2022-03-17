/**
 * vue 数据变更 异步更新dom
 * 
 * 监听到数据变更，将开启一个队列，将数据变化触发的侦听器执行逻辑缓存在队列中
 * 如果同一个侦听器被多次触发，只会被推入到队列中一次
 * 在下一个tick，vue刷新队列并执行所有缓存的（已去重）侦听器
*/

/*********** 简版nextTick **************/

const queue = new Set(); // 缓存队列
let pending = false; // 标识，是否触发了
const p = Promise.resolve();

function flushCallbacks() {

  // 这保证只调用一次循环清理，本次tick后续的只需要往里添加就行
  // 因为推入到队列是在主线程执行的，能够保证在清理任务队列的时候，本次tick所有的都已经在队列中
  if (!pending) return;

  pending = true;

  // 微任务队列 在本次tick末尾 一次性执行所有缓存的任务
  p.then(() => {
    const queueToRun = new Set(queue);
    queueToRun.forEach(fn => fn())
    queue.clear(); // 清空队列
  }).finally(() => {
    pending = false;
  })

}

// 在需要的地方调用nextTick 是在主线程的
function nextTick(fn) {
  queue.add(fn);
  flushCallbacks();
}


/*********** 简版nextTick **************/


/*********** vue nextTick **************/
(() => {
  const callbacks = [];
  let pending = false;


  function flushCallbacks() {
    pending = false;
    const cbs = callbacks.slice();
    callbacks.length = 0

    for (let i = 0; i < cbs.length; i++) {
      cbs[i]()
    }
  }

  function timeFunction(fn) {
    Promise.resolve(flushCallbacks)
  }

  function nextTick(cb, ctx) {
    let _resolve;

    callbacks.push(() => {
      if (cb) {
        try {
          cb.call(ctx)
        } catch (err) {
          errorHandler()
        }
      } else if (_resolve) {
        // 为什么要加个这？ 保证在没传参数的时候，微任务队列也有内容，也会有一个异步的过程
        _resolve(ctx)
      }
    })

    if (!pending) {
      pending = true;
      // 触发清空任务队列的操作 等待执行
      timeFunction()
    }

    // 如果没有传递 cb； nextTick的返回值是一个Promise 
    if (!cb) {
      return new Promise(resolve => {
        _resolve = resolve
      })
    }

  }
})()

/*********** vue nextTick **************/