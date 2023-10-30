## 关于hash

hash函数

## 关于git

git对象存储，是一个对象有向无环图
git的存储信息都经过压缩，并且每一个对象元都使用SHA-1hash值标示；
注意这个hash是用来标示的，并不是存储对象内容的hash

基本概念

+ blobs 文件  每个文件就是一个blob 保存了一个hash，内容改变 hash改变
+ tree 文件夹 对应托管的文件夹对象 内容可以是blob/tree  也是有一个唯一hash，tree下任意内容改变，整个tree的hash改变
+ commit  tree的快照+额外的一些信息，包括作者、注释、parent commit、时间等

refs

+ HEAD 当前分支的最近一次commit

四个区域

+ 工作区
+ 暂存区
+ 本地仓库
+ 远端仓库

本地仓库 --checkout--> 工作区
工作区 --add--> 暂存区
暂存区 --commit--> 本地仓库
本地仓库 --push--> 远端仓库

2种合并方式

+ merge
  + 产生一个新的commit，包含从master中合并过来的所有信息，以及为了解决冲突而新增的信息
  + merge合并之后，新的commit会有多个父节点
  + 分支图有分叉
+ rebase
  + 在分岔点开始，暂存当前分支之后的提交
  + 将master分支后续commit合并到当前分支
  + 合并之后，在此基础上，应用当前分支的改动 （是应用新的commitid，老的commit将会被垃圾回收）
  + rebase成功之后，只有一条主线，没有分叉
