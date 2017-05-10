---
layout: post
title: docker定制node.js镜像
summary: 
tags: [docker, nodejs]
---



## install

#### 安装docker

使用命令行

{% highlight bash %}
sudo apt-get update
sudo curl -sSL https://get.docker.com/ | sh
{% endhighlight %}

#### 检查是否安装成功

使用命令行:

{% highlight bash %}
docker run hello-world
{% endhighlight %}


输出:

{% highlight bash %}
Hello from Docker.
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
1. The Docker client contacted the Docker daemon.
2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
$ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker Hub account:
https://hub.docker.com

For more examples and ideas, visit:
https://docs.docker.com/engine/userguide/
{% endhighlight %}

安装成功

## Dockerfile

#### 选择 Ubuntu 官方的 14.04 版本为我们依赖的系统镜像

{% highlight bash %}
FROM ubuntu:trusty
{% endhighlight %}

#### 设置镜像的作者

{% highlight bash %}
MAINTAINER linyiting <linyturing@gmail.com>
{% endhighlight %}

#### 修改软件源

由于网络的原因，使用ubuntu默认的软件源的下载速度很慢。我们修改ubuntu的`/etc/apt/sources.list`文件，使用阿里云的镜像。
新建文件 sources.list：

{% highlight bash %}
deb http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ trusty-backports main restricted universe multiverse
{% endhighlight %}

Dockfile中添加：

{% highlight bash %}
ADD sources.list /etc/apt/sources.list
{% endhighlight %}

#### 安装Node.js环境

{% highlight bash %}
RUN apt-get update && apt-get install -y curl && \
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
apt-get install -y nodejs
{% endhighlight %}

上面的命令将在你的镜像上安装node.js

#### 准备项目文件

{% highlight bash %}
RUN mkdir -p /usr/code
COPY index.js /usr/code/
COPY package.json /usr/code/

RUN cd /usr/code && npm install
{% endhighlight %}

其中index.js的内容为：

{% highlight javascript %}
var express = require('express');

// Constants
var PORT = 8080;

// App
var app = express();
app.get('/', function (req, res) {
res.send('Hello World\n');
});

app.listen(PORT)
console.log('Running on http://localhost:' + PORT);
{% endhighlight %}

package.json文件的内容为：

{% highlight json %}
{
    "name": "docker-centos-hello",
    "private": true,
    "version": "0.0.1",
    "description": "Node.js Hello World app",
    "author": "linyiting",
    "dependencies": {
        "express": "^4.13.4"
    }
}
{% endhighlight %}

#### 定义运行应用的命令

由于我们web应用使用了8080端口，我们需要把这个端口公开：

{% highlight bash %}
EXPOSE  8080
{% endhighlight %}

使用`CMD`定义启动应用的命令行

{% highlight bash %}
CMD ["node", "/usr/code/index.js"]
{% endhighlight %}

#### 完整的Dockerfile:

{% highlight bash %}
# Ubuntu 14.04，Trusty Tahr
FROM ubuntu:trusty

# From linyiting
MAINTAINER linyiting <linyturing@gmail.com>

ADD sources.list /etc/apt/sources.list

# Install Node.js 安装Node.js 4.x运行环境
RUN apt-get update && apt-get install -y curl && \
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
apt-get install -y nodejs

# 将项目文件复制到镜像中
RUN mkdir -p /usr/code
COPY index.js /usr/code/
COPY package.json /usr/code/

# npm install
RUN cd /usr/code && npm install

# 公开镜像的8080端口
EXPOSE 8080

# 定义应用的启动命令行
CMD ["node", "/usr/code/index.js"]
{% endhighlight %}

## 构建镜像

#### 构建镜像的命令
{% highlight bash %}
sudo docker build -t <your username>/ubuntu-nodejs-hello .

# example
sudo docker build -t linyiting/ubuntu-nodejs-hello .

{% endhighlight %}
构建的过程中，如果你docker上已经安装了ubuntu:trusty的镜像，docker会在该镜像的基础上构建新镜像；否则，docker会安装ubuntu:trusty镜像，然后在构建ubuntu-nodejs-hello

#### 运行镜像

用`-d`使镜像在运行在后台模式下，-p参数会将容器的私有端口转发到主机的上共有端口：

{% highlight bash %}
sudo docker run -p 49160:8080 -d linyiting/ubuntu-nodejs-hello
{% endhighlight %}

使用curl查看应用是否运行：

{% highlight bash %}
curl -i localhost:49160
{% endhighlight %}

输出：
{% highlight bash %}
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 12
ETag: W/"c-5Z/5eUEET4XfUpfhwwLSYA"
Date: Mon, 09 May 2016 09:13:01 GMT
Connection: keep-alive

Hello World
{% endhighlight %}

可以看到，我们的应用已经成功运行。


### 参考资料

+ [docker: installation on ubuntu](https://docs.docker.com/v1.8/installation/ubuntulinux/) 
+ [docker安装node](http://www.widuu.com/docker/node.html)
+ [如何制作一个定制的 Python 基础 Docker 镜像](http://docs.daocloud.io/python-docker/python-docker-002)
+ [Docker 笔记 打造node.js开发环境 安装nvm](https://www.ijser.cn/install-nvm-on-docker/)
+ [nodejs镜像示例](http://open.taobao.com/doc2/detail.htm?spm=a219a.7629140.0.0.y8BYmT&treeId=12&articleId=104187&docType=1)


