# Cookie

## 是什么

引用自维基百科：
> Cookie 复数形态Cookies，类型为`小型文本文件`， 指某些网站为了辨别用户身份而储存在用户本地终端上的数据。

关键信息：小型文本文件，储存在用户本地终端，目的是`辨别客户端用户身份`
> key-value 数据
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
> 没有设置的话，默认是当前文档访问的地址中的域名部分； 如果显式指定了域名值，子域也包含在内。
>
> domain是否可以是ip地址？
> 理论上是可以的，但是不能是通配符
> 实际实践中，因为安全问题，不将domain设置为ip
> 当使用ip访问，并且不显式设置domain的时候，浏览器才会默认讲domain设置为ip

**Path**: 配合Domain做进一步限制，只有在指定域名的指定路径下，才能被获取。
> 默认为当前文档路径

**Expires**: 值是一个date值，指定在该日期之前有效，之后过期；

**Max-Age**: 值是一个数字；单位是秒；cookie的生命周期，从设置之后这个值指定的秒数之内有效，超过失效。 优先级更高。

> 如果没有设置过期时间，cookie默认是session周期的，即当浏览器关闭（整个浏览器而不是浏览器标签）后，cookie失效。

> 根据过期时间可以将cookie 分为
> `持久cookie`
> `非持久cookie`  

> 根据存储位置  分为
> `硬盘cookie`   长期存在是持久cookie
> `内存cookie`  `浏览器关闭(非浏览器标签)`之后就消失了 不设置Expires或Max-Age指令

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
 站也是URL中的一个子集概念，由eTLD和它之前最近的一个domain片段组成

<https://www.example.com:443/foo>
 eTLD: .com
 site: example.com

 <https://my-project.github.io>
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

```js
document.cookie = "name=value; Domain=www.baidu.com; Path=/; Max-Age=0; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; SameSite=None|Lax|Strict;"
```

其中`<name>` `<value>` 都必须是字符类型，在存取的时候对非字符串类型需要注意进行编码处理。

> MDN建议使用 `encodeURIComponent` 对cookie的name 和 value值 进行编码；主要是避免出现分号、逗号、和空白字符等不合法的cookie字符。
>
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
   1. 大厂在各个网站投放广告，广告内容自动请求某个链接，携带cookie，就能分析出用户的浏览行为

## Cookie的缺陷

1. cookie会附加在每一个网络请求中，无形中增加了流量
2. 在http请求中cookie是明文传输的，可能会造成信息泄漏
3. cookie大小只有4kb；对于复杂的存储需求是不够的
4. 网络攻击

## Cookie 相关安全问题

### CSRF 跨站请求伪造

#### 定义

利用用户的已登录状态持有cookie、浏览器会在网络请求中加上该域名下的cookie这两个特性；

在第三方站点上，引导用户点击，或者借助form表单自动请求 目标站点，携带上已登录的cookie，完成攻击

俗称第三方cookie

#### 防治手段

1. same-site 限制第三方cookie
   1. none 不限制
   2. lax 仅get发送
   3. strict 全部不发送
2. 验证请求来源站点
   1. Referer 请求头 包含path
      1. 本地协议 file\data 不会上传
         1. noreferer
         2. referer policy 其他限制
            1. 服务器返回网页时在响应头设置
            2. meta设置
            3. a\img\iframe\link 属性referrerpolicy设置
      2. 页面来源是https、而本请求是http
   2. origin 仅包含domain 不包含路径信息 <可靠>
3. csrf token
   1. 服务器在正常网页响应中返回token
   2. 后续请求，人为带上
   3. csrf 是利用浏览器自动携带的，因此没有这个token
4. 双重cookie
   1. 在qs或者请求body中, 用编码的方式手动增加上cooki信息，服务器双重校验cookie
      1. 这样第三方站点伪造请求，只有浏览器自动增加在header中的cookie，没有qs或body中的cookie，会导致校验失败

# Session

Session 机制

1. Cookie
2. URL重写 会话标识附加在url的qs中
3. form表单隐藏字段
4. IP地址

问题

1. 服务器空间占用
2. 分布式信息同步 比较复杂， 不便于sso验证

# Token

## JWT JSON Web Token

服务器不保存session数据，所有数据都保存在客户端，每次请求都发回服务器

### 格式

`header.payload.signature`

+ header: json对象，jwt元数据，签名算法、类型  base64转义
+ payload： json对象 实际需要传递的数据 base64转义 默认不加密
+ signature：对前两个部分的签名，防止篡改

```js
// 签名生成公式
sign = HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret // 密钥，服务端持有 保密
)

// 最终jwt生成方式
jwt = base64UrlEncode(header) + "." + base64UrlEncode(payload) + "." + sign;
```

### 使用方式

客户端收到服务器返回的JWT，存储在本地，然后每次与服务器通信，都需要带上这个JWT

+ 存储在cookie，（跨域无法携带）
+ 存储在localStorage （需要手动管理）
+ 放在请求头Authentication
+ post请求的body内

### 特点

1. 默认不加密，开发者可以生成原始token之后再加密
2. 无法及时废除token，除非有别的逻辑
3. 最好使用https协议传输

## Cookie Store API

异步操作cookie api
