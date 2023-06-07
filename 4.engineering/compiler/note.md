# compiler

compiler一般主要做三件事情

1. `Parsing` 将源代码转换成抽象语法树
2. `Transformation` 操作抽象语法树，做任何需要的改动
3. `Code Generation` 将抽象语法树转换成新的代码

比如将TS转换成js代码；或者将高级JS代码转换成兼容性更好的JS代码
或者将JS代码转换成机器语言

## Parsing 解析

Parsing主要分成2个阶段

1. `Lexical Analysis` 词法分析 将源代码转换成一个个tokens
   1. tokens是一个数组，数组每一项都是一个object
   2. object描述的是代码的组成单元
   3. 可以是数字、标签、符号、操作符或者其他任何东西
2. `Syntactic Analysis` 语法分析
   1. 重组tokens，根据语法规则，将各个token之间的关系串联起来
   2. 结果就是ast 抽象语法树
