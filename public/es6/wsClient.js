/**
 * Created by Ellery1 on 16/6/19.
 */
import io from 'socket.io-client';

export default function (logServerPort) {
    return new io('http://127.0.0.1:' + logServerPort);
}