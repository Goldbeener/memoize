<!--
 * @Author: duxin
 * @Date: 2022-01-04 10:38:00
 * @Description: 
-->
## 是什么？

### 解释与编译

解释型语言与编译型语言，是根据某个编程语言的**执行方式**来区分的，
编译型语言是在执行之前，会被编译成机器语言，然后执行阶段直接执行机器语言
解释型语言是没有编译阶段，但是多了一个解释器，在执行过程中，对解释器输入语言源码，经过解释器解释执行；

> 解释器内部实现一般是一个编译器和一个虚拟机，**编译器把输入语言编译成中间语言，虚拟机直接执行中间语言**

### Terminal

终端
是一个程序，就是界面上打开的黑框框本身
shell运行于其中

### Shell

shell是一个**命令行解释器**，
机器外面的一层壳，用于人机交互，只要是人与电脑之间的交互接口都可以称为shell
表现就是，用户输入一条命令，shell就立即解释执行一条

> shell里解释执行的是linux命令，用于直接与机器交互

#### Interactive & Non-Interactive

Interactive： 用户输入命令，直接得到结果输出
Non-Interactive： 如果运行了一个包含了若干行命令的shell脚本，那么就是非交互式的

> 直接在命令行输入命令，是交互式的
> 使用sh脚本，批量执行命令，是非交互式的

#### Login & Non-Login

Login shell： 登陆系统之后获得的顶层shell。比如最常用的ssh登陆
Non-Login shell： 打开电脑terminal，直接唤起的的shell 是非登录的shell

#### 常见的shell

shell是命令行解释器，那么会有不同的实现，常见的有

+ bash
+ zsh

在使用时，可以在命令行查看当前使用的是哪个

```bash
echo $SHELL
```

`.sh`脚本第一行，一般会指定解释此脚本文件使用的shell解释器

```sh
#!/usr/bin/env bash

echo 'hello shell'

# 单行注释

:<<EOF
echo '这是多行注释'
echo '这是多行注释'
echo '这是多行注释'
EOF

```

## Refs

+ [shell全貌](https://www.cnblogs.com/jingmoxukong/p/7867397.html)
