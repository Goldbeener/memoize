# Composables

组合式函数、可组合的函数
可以单独使用，可以组合起来使用，

每个函数负责处理单一的目标，专注分离点
一系列函数组合起来，处理复杂的任务

可复用、可组合

+ 可组合式函数
+ `建立连结`
  + 输入、输出连结
  + 输出会自动跟随输入的改变而改变

要点

+ ref/unref 解包
  + reactive
  + ref解包
    + 自动解包
      + watch
      + 模版
      + ractive
  + ref嵌套，  重复使用已有的ref 讲一个ref传递给ref()，它会原样返回
  + unref
  + 使用ref()当你想要将其标准化为Ref
  + 使用unref()当你想要获取值
+ `接收Ref作为函数参数`，返回一个响应式的结果
  + 值和Ref混用
+ `返回由ref组成的对象`，同时获得ref和reactive的好处
  + 可以直接解构使用
  + 使用reactive自动解包
+ `将异步操作转换成同步`
  + 利用响应式结果
+ `副作用自动清除`
+ `类型安全的Provider/Inject`
  + InjectionKey<T>
  + 使用symbol创建相同的key
+ `状态共享`
  + 独立的响应式数据
  + 使用Provider/Inject共享应用层面状态
