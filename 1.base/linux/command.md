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
