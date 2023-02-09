## ssh.config 文件

mac位置： `~/.ssh/config`

内容：

```bash
Host host_alias
  HostName 要登陆的主机的名
  User userName 
  IdentityFile 登录时希望是使用的密钥文件
```

登陆方式：

```bash
ssh host_alias  ==  ssh -i <IdentityFile> userName@hostName
```

## 文件同步

### rsync

rsync 需要传输的双方都安装，本地、远程都安装

```bash
rsync -av source userName@remoteHost:/destination

# -a 表示递归同步，以及元信息同步（修改时间、权限等）
# -v 表示将结果输出到终端，可以看到哪些内容会被同步
```

## 修改文件owner

```bash
sudo chown -R newOwner /path/to/folder

```

## 查看日志

```bash
tail -f ./xxx.log | grep 'xxx'
```

## CLI命令

`ctrl + u` 删除已输入的命令到开始
`ctrl + y` 可以恢复被ctrl+y删除的内容
`ctrl + w` 删除已输入命令的最后一个单词

## curl ping telnet

### curl

利用url规则在命令行下工作的文件传输工具，支持文件的上传和下载，
一般用于下载，
可以很好的模拟http行为

```bash
curl <url> | bash 
# 加载url位置的脚本 并在bash中执行

-d 用于发送post请求的数据体
-G 构造查询字符串
-G -d 配合使用用于使用get请求，携带指定的查询字符串做参数
-v 详细输出请求、相应信息
-s 精简过程，忽略错误和进度信息
-l 跟随重定向，直到返回结果
-i 展示响应头+结果
-I 仅展示响应头 不展示响应体
```

### ping

ping 主机名/ip

用来检查网络是否通畅或者网络连接速度，确认主机是否运作正常
处于应用层，相当于一个应用程序，
使用网络层的ICMP协议，处于第三层

> 需要服务器支持才行

> 梯子工具一般是socks5代理，是在第四层，传输层协议；因此无法影响到底层的请求
> 所以即使架了梯子，ping也是无法通的
> 可以使用curl来验证

### telnet

用来探测指定ip是否开放指定端口
