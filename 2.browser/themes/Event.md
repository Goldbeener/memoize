# Event

+ `原生事件` 由浏览器在合适时间点触发， DOMContentLoaded、load
+ `合成事件` 由脚本触发，开发者在需要的时机触发

## 合成事件

```js
// 老版本合成事件使用方法，已经不建议使用
const readyEvent = document.createEvent('Event'); // Event 只能是指定的一些事件类型
readyEvent.initEvent('customReady', true, true); // 自定义事件名，是否冒泡，是否可取消
document.addEventListener('customReady', function (){ }, false); // 注册事件监听
document.dispatchEvent(readyEvent); // 触发事件
```

```js
// 新版本合成事件
const readyEvent = new Event('customReady', { bubbles: true, cancelable: 'true'});

document.addEventListener('customReady', function (){ 
  console.log('customReady')
}, false);

document.dispatchEvent(readyEvent); // 触发事件
```
