'use strict';

var _socket = require('socket.io-client/socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var socket = (0, _socket2.default)('http://127.0.0.1:3000'); /**
                                                              * Created by Ellery1 on 16/5/24.
                                                              */

socket.on('log', function (log) {

  console.log(log.method + ' ' + log.url, log);
});
//# sourceMappingURL=index.js.map
