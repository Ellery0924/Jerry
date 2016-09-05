module.exports = [
    {
        current: 'local',
        pattern: /test\.qunar\.com\/([^?]*)(\?.*)?/,
        responders: {
            "beta": 'http://$1.qunar.com',
            "dev": 'http://$1.qunarman.com',
            "local": './mock/$1.json'
        },
        jsonpCallback: 'jsCallback',
        contentType: 'text/html'
    },
    {
        pattern: /test2\.qunar\.com\/(.*)/,
        responder: {id: 2222},
        jsonpCallback: 'jsCallback'
    },
    {
        pattern: /test3\.qunar\.com/,
        responder: {id: '1212dl;akds;l'}
    }
];