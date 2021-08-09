## 三层配置
nginx 文件一般是在 `/etc/nginx` 路径下

主配置文件是 `nginx.conf`

主要配置信息有三层：      
优先级由低到高： http < server < location     
优先级高的层级同名配置会覆盖低层级的配置
+ http用于配置NGINX全局配置
+ server会根据配置中的`server_name` 和 `listen`响应不同的域名和端口的请求
+ location用于匹配响应不同的请求路径

一般是会对每一个站点host，新建一个server配置文件，将这些配置文件集中在一个目录下，然后将所有的配置文件引入。

```bash
# nginx.conf 
http {

    # 在文件末尾
    include path/to/conf_dir/*.conf;
}

```


### http
在http模块中会引入server模块的配置，      
一个比较好的实践是，创建一个server配置文件的软链，在http中引入的是server配置的软链；而不是真正的配置文件

这样做的好处在于网站废弃或者暂时不用了，只需要删除软链即可，不需要修改配置文件。

```bash
mkdir /etc/nginx
cd /etc/nginx/

```


### server 配置
server_name 是用来匹配 请求的host字段
port 是匹配请求的端口
### location 配置
location规则是用来匹配请求的path，根据不同的location配置，决定一组path返回给浏览器时的header 和 资源
#### root & alias
```bash
location / {
    alias /path/to/file/  # 匹配的路径下的资源，是直接在alias指定的目录下查找的，与请求的uri不一致
    root /roo/path/ # 匹配的路径下的资源，需要在前面拼接上root前缀，才是资源完整的路径
} 


location /i/ {
    root /data/w3; # 资源寻找路径 /data/w3/i/top.gif;
}

location /i/ {
    alias /data/w3/images/; # 资源寻找路径 /data/w3/images/top.gif  中间路径/i就没有了
}
上述 两个配置 ，针对资源请求 /i/top.gif，最终寻值的路径是不一样的
```
#### try_files
检查匹配项下资源的存在，并且把第一个存在的资源作为响应返回给请求方, 如果没有找到符合条件的资源，最后一项会作为重定向的值，进行一次内部跳转。

仅仅对当前location上下文生效

文件资源的寻值，需要结合`root`和`alias`指令，得到最终的资源路径

可以是文件，也可以是目录，目录必须以`/`结尾

```bash
location /images/ {
    try_files $uri /images/default.gif;
}

location /images/default.gif {
    expires 30s;
}
```
