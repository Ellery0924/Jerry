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

## 设置fekit/ykit工作路径(去哪儿特供，可选)
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

## 使用说明
### 切换到代理服务

最简单的方式是使用`SwitchyOmega`等chrome代理插件，或者使用Proxy右上角推荐的代理插件。以下是`SwitchyOmega`的配置，我们将所有外部请求打到`127.0.0.1:999`，也就是我们的本地代理上。

![屏幕快照 2016-09-08 上午11.43.18](https://github.com/Ellery0924/Jerry/blob/master/public/images/switchhost.png)

** 注意: 你需要把所有忽略的规则全部清空。另外, ShadowSocks和所有的代理都冲突, 在使用时也需要关闭。 **

### Host管理

** 我们建议你彻底放弃编辑Host文件修改Host的方式并清空系统host文件中的所有内容, 直接转移到这套方案。这套方案不仅没有DNS缓存, 项目和环境的切换也十分便捷。 **

访问http://127.0.0.1:1000/qproxy#/?_k=1kpa78
左侧导航是项目(方案)列表，右侧面板是该分组下 Host 规则。这里你需要手动选择当前激活的分组。

![Jerry-Host](https://github.com/Ellery0924/Jerry/blob/master/public/images/jerry-host.png)
点击`添加规则`可以批量导入Host规则, 格式和Host文件完全相同, 除了不支持注释以外:

![Host导入](http://cfyyq.img48.wal8.com/img48/561720_20161116122834/147927077876.png)

在Host导入以后, 配置会立即生效, 无需重启浏览器。点击`导出Host`可以将当前的Host配置转换成Host文件的格式。

另外, Jerry还提供了快速切换环境的功能, 每条Host的右侧有可选择的环境和机器IP, 你可以通过选择它们来快速切换环境。

![切换Env](https://github.com/Ellery0924/Jerry/blob/master/public/images/single-host.png)

我们内置了一些常用的环境如local, 如果选择online等于没有配置host, 选择custom可以手动输入IP。

如果你需要修改默认的环境/机器组配置, 可以在服务器组配置面板中手动编辑, 如图:

![Edit Server Group](https://github.com/Ellery0924/Jerry/blob/master/public/images/host-config.png)

修改完成后, 你需要重新启动代理才能生效。

### Mock服务（去哪儿特供功能）

所有ykit项目都可以开启mock服务, 首先你需要在项目的根路径下添加一个mock.js, 内容如下:

```
module.exports = [
    {
        // 当前环境
        current: 'local',
        // 匹配规则
        pattern: /test\.qunar\.com\/([^?]*)(\?.*)?/,
        // 所有的responder, 生效的是等于current的那个
        responders: {
            "beta": 'http://$1.qunar.com',
            "dev": 'http://$1.qunarman.com',
            "local": './mock/$1.json'
        },
        // 配置jsonp wrapper函数名
        jsonpCallback: 'jsCallback',
        // 响应头的content-type
        contentType: 'text/html'
    },
    {
        // 简易配置, 匹配规则
        pattern: /test2\.qunar\.com\/(.*)/,
        // 可以直接返回一个json，同样也支持上面那种正则匹配的方式
        responder: {id: 2222},
        // 同样可以配这个和contentType
        jsonpCallback: 'jsCallback'
    },
    {
        pattern: /test3\.qunar\.com/,
        responder: {id: '1212dl;akds;l'}
    },
    {
        pattern: /fakeurl/,
        // 也支持传入函数，它的参数是一个parse过的URL对象
        // 例如localhost/fakeurl?a=1&b=2 parse的结果是 {"protocol":"http:","slashes":true,"auth":null,"host":"localhost","port":null,"hostname":"localhost","hash":null,"search":"?a=1&b=2","query":"a=1&b=2","pathname":"/fakeurl","path":"/fakeurl?a=1&b=2","href":"http://localhost/fakeurl?a=1&b=2"}
        // 这在API依赖参数时会非常有用，例如某个分页列表的API需要传入当前页码的情况
        responder: function (parsedUrl) {
            // 它的返回值将作为请求的response.body
            return parsedUrl;
        }
    }
];
```

然后在代理面板中找到你的项目, 然后在右侧开启Mock服务开关即可生效。

![Mock](https://github.com/Ellery0924/Jerry/blob/master/public/images/mock.png)

### 自定义 Url Map

切换到Url Map选项卡，可以设置请求的远程/本地映射，支持正则匹配。

![屏幕快照 2016-09-08 上午11.53.39](https://github.com/Ellery0924/Jerry/blob/master/public/images/url-map.png)

### 查看请求日志/设置断点

切换到请求/响应日志选项卡，可以查看通过代理请求的接口详细信息，在进行移动端调试时十分便捷。

![屏幕快照 2016-09-08 上午11.55.40](https://github.com/Ellery0924/Jerry/blob/master/public/images/log.png)

点击日志详情右上角的设置断点可以中断请求, 设置断点之后的效果:

![Block](https://github.com/Ellery0924/Jerry/blob/master/public/images/block.png)

点击Continue/Abort就可以让响应继续返回或者abort掉, 这在模拟接口超时或失败时很有用, 另外你还可以在Response选项卡中编辑响应的内容, 如下:

![Block Edit Response](http://cfyyq.img48.wal8.com/img48/561720_20161116122834/147927172206.png)

修改内容之后, 让响应Continue即可生效。在不需要中断时, 可以在断点配置面板中将断点关闭或者删除。

### HTTPS

如果你在做HTTPS的开发但是仅仅需要使用host功能,HTTPS代理不必开启。这时候代理服务器会接收浏览器的隧道请求,host配置依然可以生效。

需要在HTTPS下使用URL MAP/抓包等功能的时候,需要开启HTTPS代理,但是需要安装根证书JerryProxyCA.cer, 下载地址:
https://github.com/Ellery0924/Jerry/blob/master/JerryProxyCA.cer

你需要手动信任这个证书, 整个流程和12306的证书安装流程一样。

** 需要注意的是这个根证书只支持三个通配域名: \*.qunar.com \*.qunarzz.com和qunarzz.com。如果有更多的域名需要支持, 请qtalk联系`jiao.shen` **

另外还需要在并在网络配置面板中设置`开启HTTPS代理`, 如下:

![开启https](http://cfyyq.img48.wal8.com/img48/561720_20161116122834/147927120123.png)

### 网速限流

JerryProxy还提供了常用的网速限流功能, 可以再网络配置中将它打开, 选择No Throttling之后会取消限速。

### 注意事项

- 需要抓取移动设备的请求时，请保证移动设备和电脑在同一个无线网络下，然后修改移动设备的代理配置，让IP指向自己的电脑，端口为`999`

如有其它问题请联系 `jiao.shen@qunar.com`

[1]: https://github.com/Ellery0924/QProxy