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
        // 返回一个json格式数据, 而不是一个路径
        responder: {id: 2222},
        // 同样可以配这个和contentType
        jsonpCallback: 'jsCallback'
    },
    {
        pattern: /test3\.qunar\.com/,
        responder: {id: '1212dl;akds;l'}
    }
];