# HTTPS

HTTP + SSL/TLS

HTTP报文经过SSL/TLS层加密之后，再传递给TCP层处理

## 背景

HTTP明文传输数据，在链路中的任一环节都有可能被窃取、篡改、伪造

## 加密

### 对称加密

`数据的加解密都是使用相同的密钥`

1. 浏览器发送支持的加密套件+client-random
2. 服务器选择其中的一个加密套件，然后返回一个server-random
3. 浏览器和服务器分别返回确认消息

双方通过client-random + server-random 再使用相同的加密套件生成秘钥 master secret；
之后，双方的通信使用这个秘钥加密报文

#### 对称加密算法

+ RC4
+ DES
+ 3DES
+ **AES**        密钥长度可是128、192、256
+ **ChaCha20**   密钥长度固定256

#### 对称加密分组模式

对称算法，还有一个分组模式的概念
可以让算法用固定长度的密钥加密任意长度的明文   **干什么用的？**

常见分组模式

1. AEAD
2. GCM
3. CCM
4. Poly1305

**缺陷**
在协商的过程中，都还是明文传输的，因此两端的随机数，以及协商使用的加密套件是公开的
黑客可以拿到这些信息，自己生成秘钥，用来解密，因此通信过程也是可以被破解的

**密钥交换的问题不能解决**

### 非对称加密

非对称加密算法有2个秘钥，公钥和私钥
使用公钥加密的信息，只能用私钥来解密；
反之，使用私钥加密的信息，只能使用公钥来解密

通常情况下，服务器持有一对公私钥，并将公钥公开

1. 浏览器发送支持的加密套件
2. 服务器选择其中的一个加密套件，然后把服务器的公钥+选择的加密套件返回给浏览器
3. 浏览器和服务器确认

这时候，浏览器获取到服务器的公钥， 在后续通信中，可以使用这个公钥来加密数据，

这能够保证，浏览器发送给服务器的信息是安全的，但是服务器返回给浏览器的信息还是不安全的

并且，非对称加密的效率是比较低的

#### 非对称加密算法

1. DH
2. DSA
3. **RSA**  长度1024，2048
4. ECC     160 224
   1. ECDHE 子算法 用于密钥交换
   2. ECDSA 子算法 用于数字签名

### 对称加密+非对称加密

使用非对称加密完成对称加密需要的秘钥的传递，
然后后续的通信，使用对称加密来进行

这样既保证了双方通信的安全性，也有很很高的加密效率

1. 浏览器发送支持的对称加密套件、非对称加密套件、client随机数A
2. 服务器保存A，并且返回选择的对称加密套件、非对称加密套件、server随机数B、服务器的公钥
3. 浏览器保存B、保存服务器公钥；继续生成随机数C（有说使用A+B计算得到C），使用**服务器公钥加密随机数C**，返回给服务器
4. 服务器接收到加密后的C，使用自己的私钥解密，得到随机数C
5. 至此，双方都获取到了A、B、C三个数，然后使用同一套方法生成秘钥
   1. 黑客不能获取到C，因为C是使用服务器公钥加密的，只能用私钥来解密，而服务器私钥是保存在服务器端不会被获取到的

> 为什么需要三个随机数？
> 使用三个随机数是保证随机度足够高，密钥不能被枚举破解
> 阻止重放攻击

### 添加数字证书

上述的方式，正常情况下可以实现安全传输

但是，有一个问题是，黑客直接劫持dns，将目标服务器的ip地址替换成黑客的地址，黑客就可以冒充目标服务器进行通信
客户端无法识别

带来的一个问题是，服务器向浏览器证明： **我就是你想要访问的正确的目标地址**

需要引入一个第三方的权威机构，给服务器颁发一个证书。
权威机构是`CA`： `Certificate Authority`
证书是数字证书`DC`： `Digital Certificate`

当前的实践是，服务器向权威机构申请，颁发证书

1. 证书可以证明服务器的身份
2. 证书内还包含服务器的公钥

因此在上述的协商第2步
2. 服务器保存A， 选择的对称加密套件、非对称加密套件、server随机数B、**服务器的证书**

   1. 因为证书链的问题，实践中服务器是返回除了根证书之外的证书链
   2. 根证书内置在浏览器中或者操作系统中
   3. 浏览器接收到之后，先`验证证书`，再继续后续的流程    [证书验证步骤](#浏览器验证证书信息)
   4. 证书验证通过之后，确认了服务器的身份，并且获取到了服务器的公钥
   5. 其实还多了一个流程，就是验证颁发证书的CA是否权威可靠，否则证书也是不可信的
   6. 继续后续的流程

#### 证书获取流程以及包含的信息

1. 服务器主体公司，准备一套公钥+私钥； 私钥自己留存
2. 向CA机构提交，公钥+公司信息(站点地址等)等信息，等待认证
3. CA核实公司的信息
4. 核实通过之后，向公司签发认证后的数字证书DC，证书内包含了以下信息，有的是明文的，有的是经过CA机构私钥加密的
   1. 公司的公钥
   2. 组织信息
   3. CA信息
   4. 有效时间
   5. 证书序列号
   6. CA生成的签名（它是用CA的私钥加密的）以及签名所使用的hash函数

#### 浏览器验证证书信息

1. 得到证书的`相关明文信息`(也是约定的几个字段信息)，然后使用生成CA签名的Hash函数，自己做一次计算，得到一个摘要A
2. 然后再利用CA的公钥，解密签名数据，得到摘要信息B
3. 对比A和B，如果一致，确认证书是没有被伪造的，（**hash摘要的作用是防篡改**） 确认证书没有被篡改之后再开始验证证书信息
4. 验证证书内的相关信息，证书的域名信息、是否过期等；（这一步**暂时确认了目标服务器是正确**的，并且证书也在有效期内）
   1. 暂时是因为，不能确定CA的权威性，如果是随随便便的CA颁发的证书的话，那么证书还是不可信的
5. 这时候确认了证书的有效性，以及CA的一些信息，但是还不确定这个CA是否足够权威和可信
6. 查找给这个CA颁发证书的CA，以及上层的CA，知道最终找到顶级的CA （验证**CA链**的可信性，直至顶层）
   1. 顶级的CA证书信息一般会内置在浏览器内

> 证书： CA会给服务器颁发证书，顶层CA也会给下属的CA颁发证书
> 顶层CA、二层CA、... N层CA，正常公司是向某个底层CA申请证书  上一层为下一层背书
> 然后验证的时候，除了验证服务器DC的有效性，还会验证颁发这个DC的CA的可靠性
> 验证方式是，一层一层向上，`直到找到浏览器内置的公认的可靠的CA`。

## 安全性

1. 机密性  加密算法保证
2. 完整性  hash摘要算法保证
3. 身份认证  证书、数字签名
4. 不可否认

### 术语

**加密套件**： TLS在建立连接时，需要选择一组恰当的加密算法来实现安全通信，这些算法的组合称为`加密套件`，也叫密码套件

加密套件格式命名规范，格式固定

```js
{
    suite: 'ECDHE-RSA-AES256-GCM-SHA384'
}
```

以上为例：
ECDHE： 握手时使用ECDHE作为秘钥交换算法
RSA： 用RSA签名和身份认证
AES256： 握手后的通信使用AES对称算法，秘钥长度256
GCM： 分组模式
SHA384： 摘要算法SHA384用于消息认证和产生随机数

**密钥：** 一长串数字，度量单位是位bit， 而不是字节，需要除以8之后是字节

### SSL/TLS

1. 记录协议
2. 握手协议
3. 警告协议
4. 变更密码规范协议
5. 扩展协议

#### 摘要算法

**摘要算法**：实现数据完整性的手段
可以将摘要算法理解为特殊的压缩算法，它能够将**任意长度的数据**压缩成**固定长度**的、**独一无二**的摘要字符串，相当于是数据的**指纹**
也可以将摘要算法理解成特殊的单项加密算法，只有算法，没有密钥，加密后的数据无法解密，不能从摘要逆推出原文

摘要算法必须要对输入有**单向性**和**雪崩效应**
输入的微小变动会导致输出的剧烈变化

常见的摘要算法

1. MD5
2. SHA-1
3. **SHA-2**
   1. SHA224
   1. SHA256
   1. SHA384

一般为了保证数据的完整性，会将数据与数据的摘要一块发送
服务器收到数据之后，会使用相同的摘要算法自己计算出一份摘要，然后与发送发的摘要对比，
以此保证数据是完整的，没有被篡改的

但是如果是明文发送的话，黑客可以修改修改消息后把摘要也一并修改了
因此，完整性是建立在机密性的基础上的

一般实践中会用**会话密钥**加密信息和摘要，这样无法解密就不能篡改了。

术语： 哈希消息认证 HMAC

#### 数字签名

确认通信双方的身份

签名和验签

> 正常通信中，是使用公钥加密，私钥解密
> 在签名和验签中，是反过来，使用私钥加密，公钥解密

服务器使用私钥加密摘要信息

1. 客户端通过证书持有服务器公钥，如果能解开私钥加密后的摘要信息，就可以认为服务器是目标服务器，因为之后目标才会有自己的私钥
2. 并且摘要信息一般比较短，加密效率也会高
