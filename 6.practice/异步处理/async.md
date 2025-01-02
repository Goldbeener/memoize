# 异步操作处理范式

## 轮询
```js
class PollingManager {
  constructor(options = {}) {
    this.controller = new AbortController();
    this.interval = options.interval || 5000;
  }

  async start() {
    while (!this.controller.signal.aborted) {
      try {
        const response = await fetch('/api/data', {
          signal: this.controller.signal
        });
        const data = await response.json();
        updateUI(data);
        
        // 等待下一次轮询
        await new Promise(resolve => setTimeout(resolve, this.interval));
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Polling stopped');
          return;
        }
        console.error('Polling error:', error);
      }
    }
  }

  stop() {
    this.controller.abort();
  }
}

// 使用 
const poller = new PollingManager({ interval: 5000 });
// 开启轮询
poller.start();

// 停止轮询
poller.stop();
```

## 重试
```js
async function fetchWithRetry(url, options = {}) {
  const { maxRetries = 3, backoff = 1000 } = options;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // 成功之后终止重试
      return await fetch(url);
    } catch (error) {
      // 达到最大次数终止
      if (attempt === maxRetries - 1) throw error;
      // 退避延迟，指数增长 延迟重试  resolve本次循环，进入下一次重试
      await new Promise(r => setTimeout(r, backoff * Math.pow(2, attempt)));
    }
  }
}
```
