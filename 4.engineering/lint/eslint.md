# ESLint

根据方案识别并报告ECMAScript/Javascript代码问题的工具

目的是使代码风格更加一致并避免错误

+ 使用Espree对JS进行解析
+ 在代码中使用AST评估方案
+ 完全是插件式的，每个规则都是一个插件，可以在运行时添加更多插件

## 核心概念

+ `规则`：设置的检查标准，规则会验证代码是否符合预期，不符合预期的话是报warning还是error
+ `配置文件`
+ `可共享配置` 通过npm包分享的ESLint配置
+ `插件` 包含ESLint规则、配置、解析器和环境变量的集合的npm模块
  + 可以实现自定义规则
  + 支持JS扩展，比如TS
  + 支持库 Vue、React
  + 框架 Angular
+ `解析器` 将代码转换为ESLint可以评估的抽象语法树
  + ESLint默认使用Espree解析器，与标准JS运行时和版本兼容
  + 自定义解析器可以让ESLint解析非标准的JS语法，比如使用@typescript-eslint/parser解析TS
+ `自定义处理器`
  + 可以从其他类型的文件中提取JS代码，然后让ESLint对JS带啊吗进行检查
  + 也可以在ESLint解析JS代码前，使用处理器先对其进行处理

## 使用

1. 在npm初始化后的项目下，安装依赖eslint
2. 新建eslint配置文件
3. 编辑器集成
   1. vscode安装eslint插件，集成eslint
      1. 插件会自动寻找当前打开的工作区目录下的eslint库
      2. 如果当前没有的话，找全局的
   2. 实现代码编写过程实时检测

新版的`eslint.config.js`配置文件
按照要检查的文件类型，来设置对应的配置对象，
然后导出一组配置对象

```js
// eslint.config.js
import markdown from "eslint-plugin-markdown";

export default [
  // 针对js文件的lint配置
  {
    files: ["src/**/*.js"],
    ignores: ["**/*.config.js", "!**/eslint.config.js"],
    rules: {
      semi: "error"
    }
  },
  // 针对md文件的lint配置
  {
    files: ["**/*.md"],
    plugins: {
      markdown
    },
    processor: "markdown/markdown",
    settings: {
      sharedData: "Hello"
    }
  }
];
```

### 配置文件

配置文件可配置项

+ 语言选项
+ 规则配置
+ 插件
+ 解析器
+ 。。。

```json
{
    "root": true,
    "env": {}
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": { "project": ["./tsconfig.json"] },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "@typescript-eslint/strict-boolean-expressions": [
            2,
            {
                "allowString" : false,
                "allowNumber" : false
            }
        ]
    },
    "ignorePatterns": ["src/**/*.test.ts", "src/frontend/generated/*"]
}
```

#### 级联和层次结构

配置文件支持级联，
被检查的文件会优先使用最近层级的配置文件，直至项目根目录下的配置文件
优先级越高的会覆盖优先级低的配置

对某个配置文件设置`root: true`, 会阻止向上层继续寻找配置文件

#### 扩展配置文件

一个配置文件可以继承另一个配置文件的所有`规则`、`插件`、`语言选项`
`extends: ''`

支持对选项扩展并修改

扩展支持的源配置

+ 使用可共享配置包 发布的npm包
+ 使用`eslint:recommended`  当前安装的eslint官方版本中推荐的核心规则
+ 使用插件
+ 使用现有配置文件，基于配置文件的绝对、相对路径，比如某个依赖包的配置文件
+ 使用`eslint:all`  当前安装的eslint官方版本支持的所有核心规则

## extends VS plugins

### plugins

ESLint原生是支持纯JS代码的
在使用Vue、React等框架开发时，这些框架的语法不能被ESLint识别，
就需要针对框架制定特殊的规则，这时候就需要用到plugin

eslint plugin是一个npm包，并且包名规范为： `eslint-plugin-<pluginName>`

使用

1. 安装 npm安装
2. 配置

```js
// .eslintrc.js
{
  plugins: ['<pluginName>'], // eslint-plugin-   前缀可以省略
  rules: {

  }
}
```

**注意**
添加插件并不意味着，插件内的所有rules都自动生效、应用
依然需要手动的在rules选项内，配置开启，才能生效。

但是插件使用者并不知道，一个插件内详细有多少规则，哪些规则是建议开启的，哪些是不建议开启的，
手动的去配置开启是不现实的，

### extends

每个项目有一套eslint配置规则，不同的项目有不同的配置规则
但是大多数情况下，多个项目可能有相同的一些规则

eslint支持将这些相同的规则聚合成一个npm包发布，以实现共享配置的目的
这些npm包，必须以 `eslint-config-<configName>`

使用

1. 安装
2. 配置

```js
// .eslintrc.js
{
  // 顺序有影响 相同的规则，后面的会覆盖前面的
  extends: [
    '<configName2>',
    '<configName2>'
  ] // eslint-plugin-   前缀可以省略
}
```

### Plugins with configs

eslint plugin包也可以内置一系列配置规则，
这些配置规则可以在使用者的extends中声明引用

比如`eslint-plugin-vue`是关于vue的自定义规则插件

内置了4组规则

+ vue/base
+ vue/vue3-essential
+ vue/vue3-strongly-recommended
+ vue/vue3-recommended

这些规则集，就是可共享对象，因此可以放置在extends

格式是： `plugin:<setName>`

```js
// .eslintrc.js
//
{
  // 顺序有影响 相同的规则，后面的会覆盖前面的
  extends: [
    // 'plugin:vue/vue3-essential',
    // 'plugin:vue/vue3-strongly-recommended' 
    'plugin:vue/vue3-recommended',
  ]
}
```
