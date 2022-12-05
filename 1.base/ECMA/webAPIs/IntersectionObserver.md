# Intersection Observer API

异步检测目标元素与祖先元素或者viewport相交情况变化的方法

检测一个元素是否可见，或者两个元素是否相交
> 两个元素相交比例在N%左右时，触发回调，执行某些逻辑
> 不能提供重叠的像素数或者具体哪个像素重叠

**应用场景**

+ 图片懒加载
+ 内容无限滚动
+ 检测广告的曝光情况
+ 在用户看见某个区域时执行任务或者播放动画

创建一个`IntersectionObserver`对象，传入相应的参数和回调函数，该回调函数会在`目标元素`与`根元素`的交集大小超过`阈值`(threshold)规定的大小时被执行

```js
let options = {
  root: document.querySelector('#scrllArea'), // 根元素，必须是目标的父级元素，未指定或者为null，默认为浏览器视窗
  rootMargin: '0px', // 根元素的外边距
  threshold: 1.0 // 0~1的number，或者number数组，代表回调函数的执行次数，分别在对应时机执行
};
let observer = new IntersectionObserver(callback, options);
// 目标元素 要被观测的元素 目标元素与根元素重叠对应比例之后，触发回调函数
let target = document.querySelector('#listItem');
observer.observe(target);

// 观测行为在其他线程，不会阻塞主线程
// 回调函数会在主线程执行 建议搭配requestIdleCallback
let callback = (entries, observer) => {
  entries.forEach(entry => {
    entry = {
      boundingClientRect: '',
      intersectionRatio: '',
      intersectionRect: '',
      isIntersecting: false,
      rootBounds: '',
      target: '',
      time: ''
    }
  })
}
```

+ root指定了根元素，也就是相交的参照物，与`getBoundingClientRect()`获取的区域矩形一致
+ rootMargin，拓展了root的矩形区域
+ threshold 一个或一组阈值，当相交比例达到指定的阈值的时候，会执行回调函数

> 识别相交比例是在增加还是减少，达到识别滚动方向
