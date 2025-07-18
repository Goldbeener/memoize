/**
 * 基于链表的队列实现
 *
 * 用于替代频繁操作push、unshift的array
 * array的unshift O(N)复杂度
 *
 * Queue#dequeue方法 始终是O(1) 复杂度
 */

class Node {
  value;
  next;

  constructor(value) {
    this.value = value;
  }
}

class Queue {
  #size;
  #head;
  #tail;

  constructor() {
    this.clear();
  }

  get size() {
    return this.#size;
  }

  // 从后入队列
  enqueue(value) {
    const node = new Node(value);
    if (this.#head) {
      this.#tail.next = node;
      this.#tail = node;
    } else {
      this.#head = node;
      this.#tail = node;
    }
    this.#size++;
  }

  // 从前出队列
  dequeue() {
    const current = this.#head;
    if (!current) {
      return;
    }
    this.#head = current.next;
    this.#size--;
    return current.value;
  }

  peek() {
    if (!this.#head) {
      return;
    }

    return this.#head.value;
  }

  clear() {
    this.#size = 0;
    this.#head = null;
    this.#tail = null;
  }

  /**
   * 实例的可迭代方法
   *
   * 迭代清空队列
   * 同时消费/处理每个值
   *
   * 应用场景：
   * 1. 逐步处理积压的任务、事件、请求
   * 2. 批量写入日志、执行操作等
   * */
  *drain() {
    while (this.#head) {
      yield this.dequeue();
    }
  }

  // 实例整体可迭代性 但不消耗队列值
  *[Symbol.iterator]() {
    let current = this.#head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

const queue = new Queue();

queue.enqueue('1');
queue.enqueue('aaa');
queue.enqueue('🥁');

for (const q of queue) {
  console.log('???', q);
}

queue.dequeue();

console.log('peek', queue.peek());

for (const i of queue.drain()) {
  console.log('drain', i);
}
