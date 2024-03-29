# TCP/IP

## TCP

Transmission Control Protocol 传输控制协议
`使用IP协议``可靠`的发送数据包的方式

> 数据传输还是依靠IP协议
> TCP只是保证传输可靠、完整
> TCP算是IP协议的拓展，统称为TCP/IP协议

### TCP慢启动

客户端与服务器第一次连接的时候，服务器无法知道连接的带宽是多少
所以会先发送少量且安全的数据 - `10个TCP数据包`
等待接收到客户端的接收确认之后，再发送更多的数据包（翻倍）；按照这个逻辑递增，直到发生丢包，服务器没有接收到ACK确认，表明达到带宽上限

因此，客户端与服务器之间的数据传输，并不是一开始就是以最大的带宽来传递的。而是慢慢从小到大递增的一个过程，叫做TCP的慢启动

#### 网页首屏14KB

10个TCP数据包
每个数据包最大1500字节（以太网标准）
头部40字节： 16IP + 24TCP
剩下1460字节传输数据， 1460*10 = 14600 字节，约等于`14KB`

这样只需要一次往返就能传输所有的数据，会降低页面的加载时间

## IP

IP协议，将一个数据包从互联网上的一个位置发送到另一个位置的系统
IP没有检查数据包是否成功到达目的地的方法
