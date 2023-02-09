# deep-copy

深拷贝

## structuredClone()

```js
const origin = { name: 'foo' }

const clone = structuredClone(origin, { 
  transfer: [transableKey1, transableKey2] 
})

```

### transferable objects

可转让对象

可转让对象机制中，对象被分配的资源可以从一个线程中脱离，挂载到另一个线程中。挂载之后，前一个线程中不能访问原对象了，新线程可以。

在同一时间，可转让对象只能存在一个线程中

> 可转让对象，在转让过程中，更快，无复制操作；使得线程间数据交互更加高效

+ ArrayBuffer
+ MessagePort
+ ReadableStream
+ WritableStream
+ TransformStream
+ AudioData
+ ImageBitmap
+ VideoFrame
+ OffscreenCanvas

### sharedArrayBuffer

固定长度的二进制数据缓冲区，**不可以被转移**

#### 分配及共享内存

sharedArrayBuffer对象，可以借助postMessage和结构化克隆算法，从一个用户代理（线程）共享到另一个用户代理

目标用户代理接受从源代理传递过来的sharedArrayBuffer对象，使用结构化克隆算法，产生一个新的私有sharedArrayBuffer对象； 但是2个对象指向的数据块是相同的。

> 有点引用的味儿

因为2个线程同时引用、操作同一块数据，会有竞态问题，
因此需要使用原子操作，来更新、同步数据

#### 多线程编程

线程数据传递

1. copy传递，主线程将数据复制一份传递给其他线程，当数据量过大的时候，效率低
2. sharedArrayBuffer传递，类似于引用传递，两个线程都有一个指针，指向同一块内存空间；两个线程都可以操作，会有竞态问题
3. transferable object 可转移对象；从一个线程传递到另一个线程；
   1. 快速
   2. 传递之后，原先程失去对数据的引用，不能操作；
   3. 同一时刻，数据只能被一个线程持有和操作；避免了竞态问题

+ [同步锁lock](https://github.com/lars-t-hansen/js-lock-and-condition)
+ [异步锁](https://github.com/lars-t-hansen/js-lock-and-condition/blob/master/async-lock.js)
