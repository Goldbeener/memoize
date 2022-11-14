# userAgent

用来标示用户代理软件的应用类型、操作系统、软件开发商以及版本号等信息的特征字符串

由于浏览器竞争的历史原因，该字符串没有严格规范，只有约定俗成的一些惯例。

## 组成部分

默认字段 + 自定义字段

<span style="color: red">各特征字符串以空格分割</span>

**默认字段**：

+ `Mozilla/<version> (system-information: platform; os等)`
+ `渲染引擎/版本 (引擎补充信息)`
+ `浏览器名称/版本`
+ `兼容浏览器名称/版本`

> 以上字段一般是保留使用浏览器默认设置

**自定义字段**

+ `自定义字段1/备注`
+ `自定义字段2/备注`

> 自定义字段以空格隔开

常用自定义字段 (参考微信/支付宝)

+ `appName/version<(hash)>`  <span style="color: red">ua关键key 作为app识别用</span>
  + `MicroMessenger/7.0.18.1740(0x2700123B)`
  + `AlipayClient/10.2.80.6200`
+ `Process/toolsmp`  未知
+ `WeChat/arm64`  cpu架构
+ `NetType/4G`  网络
+ `Language/zh_CN`  语言
+ `Region/CN` 地区
+ `ABI/arm64` 未知

所有字段以空格分割

```js
// chrome
`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Chrome/106.0.0.0 
Safari/537.36`

// wx devtool
`Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) 
AppleWebKit/604.1.38 (KHTML, like Gecko) 
Version/11.0 Mobile/15A372 
Safari/604.1 
wechatdevtools/1.06.2209190 
MicroMessenger/8.0.5 
Language/zh_CN 
webview/16678943049101070 
webdebugger 
port/48640 
token/286a0c243d0323cd5784157a471ca5cd`

// 微信
// iphone
`Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) 
AppleWebKit/605.1.15 (KHTML, like Gecko) 
Mobile/15E148 
MicroMessenger/7.0.17(0x17001126) 
NetType/WIFI 
Language/zh_CN`

// honor
`Mozilla/5.0 (Linux; Android 10; CDY-AN90 Build/HUAWEICDY-AN90; wv) AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 
Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200801 Mobile Safari/537.36
MMWEBID/4006 
MicroMessenger/7.0.18.1740(0x2700123B) 
Process/toolsmp 
WeChat/arm64 
NetType/4G 
Language/zh_CN 
ABI/arm64
`

// OPPO
`Mozilla/5.0 (Linux; Android 9; PBEM00 Build/PKQ1.190519.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 
Chrome/78.0.3904.62 
XWEB/2691 
MMWEBSDK/200901 
Mobile 
Safari/537.36 
MMWEBID/4773 
MicroMessenger/7.0.19.1760(0x27001335) 
Process/toolsmp 
WeChat/arm64 
NetType/4G 
Language/zh_CN 
ABI/arm64`

// 小米
`
Mozilla/5.0 (Linux; Android 8.1.0; MI 5X Build/OPM1.171019.019; wv) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 Chrome/78.0.3904.62 XWEB/2691 MMWEBSDK/200801 Mobile Safari/537.36 MMWEBID/9633 
MicroMessenger/7.0.18.1740(0x2700123B) 
Process/toolsmp
WeChat/arm64 
NetType/4G 
Language/zh_CN 
ABI/arm64
`

// app-ios
`
Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) 
AppleWebKit/605.1.15 (KHTML, like Gecko) 
Mobile/18H17 
ChannelId(3) 
NebulaSDK/1.8.100112 
Nebula
PSDType(0) 
mPaaSClient/356
`

// app-aos
`
Mozilla/5.0 (Linux; U; Android 10; zh-CN; SEA-AL10 Build/HUAWEISEA-AL10) 
AppleWebKit/537.36 (KHTML, like Gecko) 
Version/4.0 
Chrome/69.0.3497.100 
UWS/3.22.2.46 
Mobile 
Safari/537.36 
UCBS/3.22.2.46_220614210535 
ChannelId(1) 
NebulaSDK/1.8.100112 
Nebula 
mPaaSClient
`

// 支付宝
`Mozilla/5.0(iPhone; CPU iPhone OS 15 5 like Mac OS X)
AppleWebKit/605.1.15(KHTML, like Gecko) 
Mobile/19F77
ChannelId(9)
Ariver/1.1.0
AliApp(AP/10.2.80.6200)  阿里系app标示
Nebula 
WK 
RVKType(1) 
AlipayDefined(nt:WIFI,ws:414|8322.0)
AlipayClient/10.2.80.6200 
Language/zh-Hans 
Region/CN 
NebulaX/1.0.0`

```
