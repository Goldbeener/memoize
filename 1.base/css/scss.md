# CSS
缺陷： 
1. 语法不够强大，比如：不支持嵌套
2. 没有变量和合理的复用机制

原生css
+ 变量 也叫自定义属性 
  + 定义 --custom-name: value
  + 使用 var(--custom-name<, fallback>)
  + 大小写敏感
  + 作用域 在声明的选择器之下有效
+ 计算 calc
+ 导入 @import

## url(str) 函数    
参数是一份css样式表的地址，可以是
+ 相对地址
+ 绝对地址

## :root 伪类 
在HTML中，`:root` 等同于 html元素 
一般在声明全局css变量时，可以挂在:root下, 这样可以全局有效了。

# Sass/SCSS
Sass 一种css预处理器，       
本质上是一种新的语言，    
为css增加了一些编程特性，并将css作为目标生成文件

Sass 在3.0版本之前，是以`.sass`作为后缀名的；     
在3.0版本之后，是以`.scss`作为后缀名的；

在3.0之前，sass是有自己的特定语法的，缩进实现的嵌套；换行代替分号等；与原生css有很大的不同；      
在3.0之后，推出了`Sassy CSS` 即`SCSS`; 更贴近原生css语法

+ 变量   单个属性值复用  $var
+ 混合   一段样式集合复用  @mixin 定义  @inclue 引入
+ 嵌套   类dom解构，与dom对应 方便限定样式生效范围，默认外层是内层的父选择器
+ 运算   四则运算  calc
+ 控制指令  @if @for @each
+ 函数   内置函数用于颜色转换、字符串处理、算术运算
+ 导入   @import "path"

# Less 
Less 是一门向后兼容的css扩展语言    
原生的css可以在less中之接使用，但是还扩展了很多css暂不支持的新的特性

同时支持浏览器和服务端使用

+ 变量   单个属性值复用  @var
+ 混合   一段样式集合复用  普通的样式块
+ 嵌套   类dom解构，与dom对应 方便限定样式生效范围
+ 运算   四则运算  calc
+ 转义   使用任意字符串作为属性或变量值
+ 函数   内置函数用于颜色转换、字符串处理、算术运算
+ 导入   @import "path/to/less"
+ 命名空间和访问符
+ 映射
+ 作用域


# PostCSS
**并不是一个css预处理器**      
> 但是搭配一些列插件，PostCSS可以实现 css预处理器的功能 
是使用JS工具和插件，处理/转换css的工具        
PostCSS 接受一个`css文件`，将css文件解析成AST，然后通过特定的API来分析修改他的规则

PostCSS 是一个基础设施，它可以让一系列插件在其上运行。 每个插件可以有自己的任务。

以此可以实现很多功能：  
+ 检查css
+ 支持变量和mixins
+ 编译尚未被广泛支持的css语法
+ 内联图片
+ 自动增加浏览器内核前缀 `Autoprefixer`

有很多有用的插件

> PostCSS 是在其他css预处理器完成工作之后，在生成的css文件中作用的

# Css Modules

SCSS




css提取
css loader
style loader