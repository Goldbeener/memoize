# HTTPDNS

## 什么是DNS

网络通讯大部分是基于TCP/IP协议，需要基于IP寻址

因此需要将主机名转换成对应IP，DNS就是做这个转换工作的

## 传统dns查询

基于UDP协议，查询DNS

![dns服务器架构](dns-server.png)
![dns查询](dns-lookup.png)

### 存在问题

+ 域名缓存
+ 域名转发
+ 出口NAT
+ 域名更新
+ 解析延迟

## HTTP-DNS

客户端不再借助内置的DNS寻址机制，利用HTTP请求直接与DNS服务器交互

绕开了运营商的Local DNS，有效防止域名劫持、提高解析效率

并且DNS服务器获取的是真实的客户端地理位置、运营商信息，从而可以有效的改善精度准确性。

使用HTTP请求获取Domain-IP映射，获得正确IP之后，Client自己组装HTTP协议，避免ISP篡改数据

## DNS over HTTPS

httpdns 是使用明文传输的，DNS over HTTPS将DNS解析的过程加密传输，从而使点啊发那个无法知晓用户访问的站点

## IP直连

IP直连是可行的

需要解决的问题

1. host问题
2. https证书验证问题
3. SNI问题
4. 连接服用问题
