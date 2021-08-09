# Cookie
## 是什么
引用自维基百科：
> Cookie 复数形态Cookies，类型为`小型文本文件`， 指某些网站为了辨别用户身份而储存在用户本地终端上的数据。

关键信息：小型文本文件，储存在用户本地终端，目的是`辨别客户端用户身份`
> 在Mac系统上存储位置是 `/Users/<useName>/Library/Application\ Support/Google/Chrome/Default/Cookies`    
> Cookies 是一个SQLite数据库文件，本机Chrome浏览器记录的所有域名下的Cookie都存储在此文件中。

### 与HTTP的协作
HTTP是一个无状态的协议，服务器无法识别出多次客户端请求之间的关系，因此仅仅依靠HTTP不能实现客户端和服务器之间的会话状态保持。       
Cookie的出现刚好可以配合HTTP实现客户端和服务器之间的状态保持问题。

注意此处并不是协议的状态。

## Cookie 限制
Chrome浏览器下，每个域名下最多可设置`180`个cookie，并且所有cookie的总体积不能超过`4KB` 4096 bytes

## Cookie的语法
``` js
// cookie 是一段字符串
"<name>=<value>; Domain=domainName; Path=/path; Expires=<date>; Max-Age=<digit>; <Secure>; <HttpOnly>; SameSite=<Strict|Lax|None>"
```
分号分割的属性集合
### 属性
**name/value**: cookie的名字/值组合；值不是必须的；是cookie的核心信息；

**Domain**: cookie生效的域名；只有在指定的域名及其子域名下，cookie才会被浏览器自动添加在请求头中，以及被脚本获取到。 
> 没有设置的话，默认是当前文档访问的地址中的域名部分； 如果显示指定了域名值，子域也包含在内。

**Path**: 配合Domain做进一步限制，只有在指定域名的指定路径下，才能被获取。
> 默认为当前文档路径

**Expires**: 值是一个date值，指定在该日期之前有效，之后过期；

**Max-Age**: 值是一个数字；单位是秒；cookie的生命周期，从设置之后这个值指定的秒数之内有效，超过失效。 优先级更高。 

> 如果没有设置过期时间，cookie默认是session周期的，即当浏览器关闭（整个浏览器而不是浏览器标签）后，cookie失效。

**Secure**: cookie只有在HTTPS请求中才会被发送；http请求不会被携带；

**HttpOnly**: 阻止客户端通过document.cookie获取到cookie，只有Set-Cookie能够设置；document.cookie不能使用该属性

**SameSite**: 控制cookie在跨站请求时是否会被发送

### SameSite
#### TLD
	Top-Level Domains (TLDs)  顶级域名
	.com
	.cn
	.org

    统一注册在Mozilla维护的公共后缀列表中（Public Suffix List）
#### eTLD
	eTLD: effective TLD
	有些特殊的域名，与常规的TLD不一样
	.github.io
	只用.io 无法有效的定义一个顶级域名，因此有了有效顶级域名的概念
#### site
	site = eTLD + 1
	站也是URL中的一个子集概念，由eTLD和它之前最近的一个domain片组成

    https://www.example.com:443/foo      
	eTLD: .com       
	site: example.com

	https://my-project.github.io      
	eTLD: github.io      
	site: my-project.github.io     
#### same-site
	判断两个不同的地址是否是同站点，就看eTLD + 1 site的值是否一样
    same-site   VS   cross-site 
#### `scheme-less same-site`
	常规的同站判断，不会关注scheme协议，
	但是这样的会有一些隐患，http和https就失去了意义
	因此新增了一个概念  schemeful same-site

#### `schemeful same-site`
	是在现有的同站点基础上，新增了一条限制，要求两个同站点必须是使用相同协议
## Cookie的设置
### 客户端设置
```
document.cookie = "name=value; Domain=www.baidu.com; Path=/; Max-Age=0; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; SameSite=None|Lax|Strict;"
```
其中<name> <value> 都必须是字符类型，在存取的时候对非字符串类型需要注意进行编码处理。

> MDN建议使用 `encodeURIComponent` 对cookie的name 和 value值 进行编码；主要是避免出现分号、逗号、和空白字符等不合法的cookie字符。
### 服务端设置 
`Set-Cookie` 响应头设置   
可以有多个该响应头，每个响应头设置一个cookie
```bash
Set-Cookie: id=us22a; Domain=example.com; Path=/; Max-Age=0;
```

## Cookie的获取
1. document.cookie   
document.cookie 获取到`非HTTPOnly`的cookie
2. 网络请求自动携带    
携带域名下所有的cookie

## Cookie的作用
1. 会话状态管理，用户登陆状态、购物车；
2. 个性化设置，语言、主题等用户自定义设置
3. 用户行为追踪分析

## Cookie的缺陷
1. cookie会附加在每一个网络请求中，无形中增加了流量
2. 在http请求中cookie是明文传输的，可能会造成信息泄漏
3. cookie大小只有4kb；对于复杂的存储需求是不够的
