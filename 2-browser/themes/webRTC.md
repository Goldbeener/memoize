# WebRTC
实时通信技术，
不借助中间媒介，实现点对点链接
传输音视频流或者其他任意数据


## 使用方式
1. 创建链接 `RTCPeerConnection`
2. 交换ice 通信双方交互相互的通信信息
3. 添加轨道流 `addTrack`  是将发送方要发送的流信息添加到链接的track上
4. 创建offer `createOffer`
5. 一端设置offer
   1. 本端设置本地offer `setLocalDescription`
   2. 另一端设置远程offer `setRemoteDescription`
6. 另一端创建answer  其实就是offer信息 只是作为应答返回给另一端
   1. 本端设置本地offer `setLocalDescription`
   2. 另一端设置远程offer `setRemoteDescription`
7. 接收端监听track流 `onTrack`

```js
// 一端
const pc1 = new RTCPeerConnection(options);
```

```js
// 另一端
const pc2 = new RTCPeerConnection(options);
```

### 信令服务器
通信的双方 交换双方的媒体信息 RTCSessionDescription

是通过 `offer` 和 `answer` 来 实现的。

需要

### 



