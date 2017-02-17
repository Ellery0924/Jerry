# JerryProxy
## 简介
JerryProxy是一个集成了HostManager和Charles功能的代理服务器。

更详细的图文使用说明请参考[这里] (http://ued.qunar.com/ykit/docs-%E4%BB%A3%E7%90%86%E5%B7%A5%E5%85%B7.html)。

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

## 设置fekit/ykit工作路径(可选)
Jerry是Qunar的产物,因此提供了快速启动fekit/ykit server的命令。

首先需要配置好fekit/ykit server的工作路径,例如你的项目都放在/Documents/qunarzz目录下,执行以下命令:
```
sudo jerry -s ~/Documents/qunarzz
```
配置了路径以后,可以通过一条命令启动jerry+fekit/ykit server,方便很多。

如果你没有一个集中放置项目的文件夹,也没有关系,可以像正常使用fekit/ykit的时候一样,先cd到项目的父级目录:
```
cd path/to/your/project's parent
```
然后启动jerry,会使用你目前的位置来启动fekit/ykit server(参照下面的说明)

##启动
如果只启动代理服务器,使用以下命令,然后会启动浏览器并打开jerry的配置界面。
```
sudo jerry
```
如果要和fekit一起启动,加-f参数(使用前请记得设置工作路径或者cd到项目的上一级目录):
```
sudo jerry -f [fekit args]
```
在-f后面可以加fekit server的参数:
```
sudo jerry -f -c -r
```
如果要和ykit一起启动,使用以下命令(使用前请记得设置工作路径或者cd到项目的上一级目录):
```
sudo jerry -y
```
(windows用户需要以管理员模式运行命令行)

jerry配置页面的地址是 http://127.0.0.1:1000/qproxy#/?_k=1kpa78

注意, 由于最新的MacOS使用open命令无视系统配置的默认浏览器而直接用safari打开, jerry在命令行启动时已经不会自动打开浏览器了。
最好自己收藏一下这个网址。

## 配置系统/浏览器代理
使用jerry需要配置网络的代理,请将HTTP/HTTPS统一设置为127.0.0.1:999。

做移动端真机调试的时候也需要设置手机代理,host和端口同上。

墙裂推荐安装超姐(barret.ma)开发的chrome扩展(已经上传Chrome Store了哦),可以很快的在系统代理/jerry/无代理环境中切换,方便快捷。(在页面的右上角有Chrome Store的链接,但是需要翻墙才能访问)

## HTTPS
如果你在做HTTPS的开发但是仅仅需要使用host功能,HTTPS代理不必开启。这时候代理服务器会接收浏览器的隧道请求,host配置依然可以生效。

需要在HTTPS下使用URL MAP/抓包等功能的时候,需要开启HTTPS代理,但是需要安装根证书JerryProxyCA.cer, 你可以在这个工程的根目录里找到它。
把它下载下来, 然后双击, 然后手动信任这个证书(步骤和手动信任12306的CA一样的)。

在开启HTTPS代理的情况下,访问qunar之外的域名都会提示证书无效错误,所以如果不需要使用HTTPS的URL MAP/抓包功能,没必要开启HTTPS代理。

目前代理服务器的证书包括了*.qunar.com, *.qunarzz.com和qunarzz.com三个域名,如果有其他域名需要支持,也请联系jiao.shen。

## 解决端口冲突
JerryProxy总共占用了四个端口,分别为:
- 代理服务器:999
- 网页服务器:1000
- HTTPS中间人服务器:1001
- 日志服务器:3000

使用以下命令可以重新设置这四个端口:
```
sudo jerry -p [代理服务器] [网页服务器] [中间人服务器] [日志服务器]
```
以上四项全为必填,如果某个端口号没有变化请填写当前端口号。

注意:修改代理服务器端口后,你应该重新配置网络代理中的端口号。