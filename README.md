# JerryProxy
## 简介
JerryProxy是一个集成了HostManager和Charles功能的代理服务器。

它的主要功能:
- 无DNS缓存的Host分组管理,支持同一条host在不同环境中快速切换
- 代理服务器
- URL MAP (可以转发到本地或者远程URL)
- 请求/响应日志
- 断点
- 限速

以上所有功能都支持HTTP/HTTPS。

Jerry是使用NodeJS和React/Redux开发的WebApp,因此可以兼容Windows/Linux。

## 安装

npm安装:
```
npm install -g jerryproxy
```
windows用户请使用管理员模式运行npm命令行,Mac/Linux用户请使用sudo执行。

## 设置fekit工作路径(可选)
Jerry是Qunar的产物,因此提供了快速启动fekit的命令。

首先需要配置好fekit的工作路径,例如你的项目都放在/Documents/qunarzz目录下,执行以下命令:
```
sudo jerry -s ~/Documents/qunarzz
```
如果你没有一个集中放置项目的文件夹,也没有关系,可以像正常使用fekit的时候一样,先cd到项目的父级目录:
```
cd path/to/your/project's parent
```
然后启动jerry,会使用你目前的位置来启动fekit server

##启动
如果只启动代理服务器,使用以下命令,然后会启动浏览器并打开jerry的配置界面。
```
sudo jerry
```
如果要和fekit一起启动,加-f参数(使用前请记得设置工作路径或者cd到项目的上一级):
```
sudo jerry -f [fekit args]
```
在-f后面可以加fekit server的参数:
```
sudo jerry -f -c -r
```
(windows用户需要以管理员模式运行命令行)

## 配置代理端口
使用jerry需要配置网络的代理,请将HTTP/HTTPS统一设置为127.0.0.1:999。

墙裂推荐安装超姐(barret.ma)开发的chrome扩展(已经上传Chrome Store了哦),可以很快的在系统代理/jerry/无代理环境中切换,方便快捷。(在页面的右上角,需要翻墙)

## 需要注意的地方
如果你在做HTTPS的开发但是仅仅需要使用host功能,HTTPS代理不必开启。这时候代理服务器会接收浏览器的隧道请求,host依然可以生效。

需要在HTTPS下使用URL MAP/抓包等功能的时候,需要开启HTTPS代理,但是需要安装根证书(像charles一样,不过在线下载还没做呢- -),请qtalk联系jiao.shen。

在开启HTTPS代理的情况下,访问qunar之外的域名都会提示证书无效错误,所以如果不是在做HTTPS的开发工作,没必要开启HTTPS代理。

目前代理服务器的证书包括了*.qunar.com, *.qunarzz.com和qunarzz.com三个域名,如果有其他域名需要支持,也请联系jiao.shen。
