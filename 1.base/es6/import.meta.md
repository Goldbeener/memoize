# import.meta

esm文件内置api
是一个对象，注意，`import.meta`整体是一个对象，由null扩展而来，属性可写、可配置、可枚举
由js运行环境(浏览器、node)注入
通常会实现`url`属性和`resolve`方法

## url

`import.meta.url`

方便本模块文件，获取自身的url信息
包含queryString和hash信息
在动态加载资源、按需加载模块、构建工具等场景有用

在浏览器内，返回的是模块的URL路径
在node环境，返回了模块的绝对路径，以`file://`开头

## resolve

`import.meta.resolve`

以当前模块的URL为基础，将一个模块的标识符转换成URL
import.meta.resolve('./test.js')

## scriptElement

`import.meta.scriptElement`

仅在浏览器环境适用
用于在使用`<script type="module" >`引入esm的时候，方便esm获取引用者，
也就是加载模块的那个`<script>`标签，相当于`document.currentScript`
