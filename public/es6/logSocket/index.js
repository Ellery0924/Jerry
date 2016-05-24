/**
 * Created by Ellery1 on 16/5/24.
 */
import io from 'socket.io-client/socket.io';

var socket = io('http://127.0.0.1:3000');

socket.on('log', function (log) {

    console.log(log.method + ' ' + log.url, log);
});