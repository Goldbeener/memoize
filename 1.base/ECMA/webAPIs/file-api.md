# Blob

二进制大对象
文件的不可变原始数据对象

可以作为文本、二进制数据被读取，或者转换为ReadableStream

```js
class Blob {
  constructor(
    (ArrayBuffer|ArrayBufferView|Blob|DomString)[], 
    { 
      type: MIME, // 数组内容类型
      ending: 'transparent'|'native' // 换行符\n处理方式，保持原样或替换成系统对应
    }
  ) {
    this.size = 0
    this.type = ''
  }
  arrayBuffer() {
    return Promise(ArrayBuffer)
  }
  slice() {
    return Blob()
  }
  stream() {
    return ReadableStream()
  }
  text() {
    return Promise(string)
  }
}
```

`Blob`对象是一个打好的包裹，包含了原始的二进制数据，
但是对这个数据的来源、用途、名字都一无所知

`File`对象是一个特殊的`Blob`
像是贴了标签的包裹，
有名字、修改时间等

## File

web应用访问文件及其内容的api

主要通过以下两种方式获取File对象

+ 文件`<input type="file" name=""/>`元素选择文件返回的`FileList`对象中
+ 拖放 `drag` and `drop` 操作返回的`DataTransfer`对象中

web应用可以访问其中的单个`File`对象，获取file的`元数据`信息，
比如文件名称、大小、类型和最后修改时间

```ts
type FileList = File[]

type File = {
  name: string,
  size: number,
  type: string,
  lastModified: number,
  lastModifiedDate: Date
}

```

`FileReader` 访问File对象的内容
FileReaderSync(仅web worker可用)

File的操作路径：

+ input/drag
  + FileList
    + File
      + meta
        + name
        + size
        + type
        + lastModified
      + content
        + FileReader
          + FileReaderSync


## File 与 Blob的决策
```bash
是不是用户选的真实文件？
 ├─ 是 → File
 │    └─ 要分片 / 加工？→ Blob
 └─ 否
      ├─ 要算 / 解码 / 协议？→ ArrayBuffer
      └─ 要存 / 下载 / 展示？→ Blob
```

**ArrayBuffer** 是内存中的字节，偏计算、内存
**Blob** 是web的二进制通用容器，是I/O世界中的数据对象，偏I/O，文件、网络
**File** 是Blob的一个安全、语意化子集； 是有来源语意的Blob；明确这是用户主动提供的文件，防止网页随意访问本地文件系统

```bash
┌─────────────────────────────┐
│        应用语义层            │
│  File / Response / Request  │
└─────────────▲───────────────┘
              │
┌─────────────┴───────────────┐
│        I/O 抽象层            │
│        Blob / Stream         │
└─────────────▲───────────────┘
              │
┌─────────────┴───────────────┐
│        内存表示层            │
│  ArrayBuffer / TypedArray    │
└─────────────▲───────────────┘
              │
┌─────────────┴───────────────┐
│      浏览器底层实现          │
│   OS / FS / Network / GPU    │
└─────────────────────────────┘
```

ArrayBuffer 提供了字节级的内存
可以通过TypedArray进行字节级、位级、结构化修改。
偏重于内存层的的计算、更新

Blob用于表示来源明确、语意完整、不可变的二进制数据对象，
是一块有明确含义的二进制数据块，更适合传递、展示或持久化

当需要计算、修改时，Blob转化成ArrayBuffer
当需要传递、展示是，从ArrayBuffer封装为Blob



### 从blob中提取数据

+ FileReader
+ Response

```js
const reader = new FileReader()
reader.addEventListener('loadend', () => {
  // reader.result
})
reader.readAsArrayBuffer(blob)
```

```js
const text = await (new Response(blob)).text();
const text = await blob.text();
```

## FileReader

```js
class FileReader {
  constructor() {
    this.error = Error
    this.readState = 0|1|2
    this.result = fileContent
  }
  abort() {}
  readAsArrayBuffer(target: File|Blob) {}
  readAsBinaryString(target: File|Blob) {}
  readAsDataURL(target: File|Blob) {} // 将文件的数据表示为base64编码的字符串
  readAsText(target: File|Blob) {} // 得到表示文件内容的文本字符串，加载在内存中，不适合大文件
}

// TextDecoder

```

## URL

### URL.createObjectURL(object: File|Blob|MediaSource)

创建一个url string, 包含了对象的url，可以用来指定源object的内容
简单来说，就是给指定对象创建一个可以引用的url，
这个url的生命周期和当前的document绑定

同一个资源，多次创建会产生重复的新的url。

### URL.revokeObjectURL()

释放创建的url引用

## ArrayBuffer

通用的、固定长度的、原始二进制数据缓冲区

ArrayBuffer 是一块连续、定长、不可变大小的原始字节内存。

### 场景
1. 协议解析
2. 加解密、压缩
3. 音视频解码
4. WebAssembly 内存交互
5. 数据结构序列化

这些场景需要
+ 字节级随机访问
+ 可修改
+ 可计算
+ 可零拷贝`Transferable`

创建：

1. 构造函数创建以字节为单位，给定长度的ArrayBuffer
2. 从现有数据获取数组缓冲区
   1. Base64
   2. 本地文件

不能直接操作ArrayBuffer中的内容，要通过`类型化数组对象`或`DataView`对象来操作

```js
class ArrayBuffer {

  static get () { return new ArrayBuffer }
  static isView (arg) { return true }

  constructor() {
    this.byteLength = 0
  }

  slice() {

  }

}

```

### 类型化数组对象 TypedArray

类数组对象，提供了读写内存buffer中的原始二进制数据的能力

> Array对象，可以存储所有js类型数据，会根据内容自动的扩容或减容
> 这是JS引擎做的优化

TypedArray可以使JS代码操作原始二进制数据

TypedArray中的每一项，都是一个原始二进制数据，可以是支持的任一种类型

+ Int8Array
+ Uint8Array
+ Uint8ClampedArray
+ Int16Array
+ Uint16Array
+ Int32Array
+ Uint32Array
+ Float32Array
+ Float64Array
+ BigInt64Array
+ BigUint64Array

### DataView

DataView视图是一个可以从二进制ArrayBuffer对象中读写多种数值类型的底层接口
不用考虑不同平台的字节序问题

```js
class DataView {
  readOnly buffer = 0;  
  readOnly byteLength = 0;  
  readOnly byteOffset = 0;

  getInt8() {}  
  setInt8() {}
  ...

}
```

### 字节序
