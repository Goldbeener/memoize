# File API

web应用访问文件及其内容的api

主要通过以下两种方式

+ 文件`<input type="file" name=""/>`元素
+ 拖放 drag and drop

这两种方式，得到的产物是`FileList`对象，web应用可以访问其中的单个`File`对象，获取file的`元数据`信息，比如文件名称、大小、类型和最后修改时间

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

## Blob

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

File对象是一个特殊的Blob

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
  readAsDataURL(target: File|Blob) {}
  readAsText(target: File|Blob) {}
}

```

## URL

### URL.createObjectURL(object: File|Blob|MediaSource)

创建一个string, 包含了对象的url，可以用来指定源object的内容
简单来说，就是给指定对象创建一个可以引用的url，这个url的生命周期和当前的document绑定

同一个资源，多次创建会产生重复的新的url。

### URL.revokeObjectURL()

释放创建的url引用

## ArrayBuffer

通用的、固定长度的、原始二进制数据缓冲区

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
