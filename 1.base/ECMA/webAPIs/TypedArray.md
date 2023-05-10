# Javascript typed array

类型化数组对象

Array
JS原生数组对象，根据内容大小自动的扩容或减配，由JS引擎维护

TypedArray 是类数组对象，提供了读写内存缓冲区中的原始二进制数据的能力
比如websocket、audio、video等这些对象中的二进制数据

## 结构

类型化数组设计，由2部分实现

+ `buffers` 描述了一个数据分块，没有类型、无法处理内容。由ArrayBuffer实现
+ `views` 提供了一个上下文，数据类型、起始偏移量和元素数，将数据转换成实际有类型的数据

## ArrayBuffer

一种数据类型，通用的、固定长度的二进制数据缓冲区，无法直接操作
需要创建一个类型化数组视图或一个描述缓冲数据个是的DataView，使用它们来读写缓冲区内容

使得JS能够更高效的处理二进制数据

## 类型化数组视图

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

上述视图方法，数字代表数组中的每一项需要占用`n-bit`

因此在使用ArrayBuffer创建类型化数组视图时，需要使用正确的视图方法，保证视图方法能够容纳buffer内容

并且数组视图的每一项都是数字

> 操作的是二进制数据

## DataView

DataView视图是一个可以从二进制ArrayBuffer对象中读写多种数值类型的底层接口
